import {buildReport} from './pages.js';
import {withCompass} from './compass/render.js';
const ids=Array.from({length:48},(_,i)=>'NRR-Q'+String(i+1).padStart(2,'0'));
export const SPECIMEN_CASES=['mixed','established','exposed','unknown','not-applicable'];
export async function specimenReport(language='en',testCase='mixed'){
 if(!['en','cs','de'].includes(language)||!SPECIMEN_CASES.includes(testCase))throw Error('invalid_specimen');
 const levels=testCase==='mixed'?[1,3,5,2,4,3]:Array(6).fill(testCase==='established'?5:testCase==='exposed'?1:testCase==='unknown'?'dk':'na');
 const answers=Object.fromEntries(ids.map((id,i)=>[id,levels[Math.floor(i/8)]]));
 const report=await withCompass(buildReport(answers,language,{}));
 report.specimen=true;report.specimenCase=testCase;return report;
}
