/** Run manually with fictional data only. Not wired to client sessions. */
import {mkdir,writeFile} from 'node:fs/promises';
import {resolve} from 'node:path';
import {specimenReport} from '../reports/specimen.js';
import {renderPDF} from '../reports/pdf.js';
import {composeFictionalNarrative,extractNarrativeBrief,NARRATIVE_PAGE_NUMBERS} from '../reports/editorial-narrative.js';
const [lang='en',testCase='mixed',target='qa-output/editorial']=process.argv.slice(2);
if(!['en','cs','de'].includes(lang))throw Error('unsupported_language');
const original=await specimenReport(lang,testCase),brief=extractNarrativeBrief(original,{review:'nextgen'});
const report=await composeFictionalNarrative(original,{review:'nextgen',
 apiKey:process.env.OPENAI_API_KEY,model:process.env.ADAMAS_NARRATIVE_MODEL,
 enabled:process.env.ADAMAS_EDITORIAL_PREVIEW==='fictional_only'});
const pdf=await renderPDF(report);
const root=resolve(target);await mkdir(root,{recursive:true});
const stem='nextgen-editorial-'+lang+'-'+testCase;
await writeFile(root+'/'+stem+'.pdf',pdf.bytes);
const compare=NARRATIVE_PAGE_NUMBERS.map(i=>({
 number:i,title:report.pages[i].title,
 earlier:original.pages[i].items.filter(x=>x.type==='paragraph').map(x=>x.text),
 revised:report.pages[i].items.filter(x=>x.type==='paragraph').map(x=>x.text)
}));
await writeFile(root+'/'+stem+'.json',JSON.stringify({fictional:true,brief,
 interpretation:report.interpretation,editorial:report.editorial,
 revisedPages:compare,layoutBounds:pdf.bounds},null,2));
console.log(JSON.stringify({review:'nextgen',fictional:true,language:lang,
 pages:report.pages.length,pdf:root+'/'+stem+'.pdf'}));