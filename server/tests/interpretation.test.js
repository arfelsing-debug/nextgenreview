import test from 'node:test';
import assert from 'node:assert/strict';
import {analyse,localise} from '../reports/model.js';
import {interpretReadiness} from '../reports/interpretation.js';
import {buildReport} from '../reports/pages.js';
const answers=v=>Object.fromEntries(Array.from({length:48},(_,i)=>['NRR-Q'+String(i+1).padStart(2,'0'),typeof v==='function'?v(i+1):v]));
function interpreted(raw,lang){const model=localise(analyse(raw),lang);return interpretReadiness({review:'nextgen',language:lang,counts:{scored:Object.values(raw).filter(v=>Number.isInteger(v)).length,unknown:Object.values(raw).filter(v=>v==='dk').length,na:Object.values(raw).filter(v=>v==='na').length},dimensions:model.dims,pairs:model.subs,priorities:model.priorities})}
test('NextGen source scoring and priority IDs remain unchanged',()=>{
 for(const lang of ['en','cs','de'])for(const val of [1,3,5,'dk','na',i=>i%3===0?'dk':4]){
 const raw=answers(val),model=analyse(raw),report=buildReport(raw,lang),result=interpreted(raw,lang);
 assert.equal(report.pages.length,23);
 assert.deepEqual(report.pages.map(p=>p.number),Array.from({length:23},(_,i)=>i));
 assert.deepEqual(result.priorityIds,model.priorities.map(p=>p.id));
 assert.equal(report.pages[3].dimensions.length,6);
 assert.equal(result.pages.length,5);
 assert.equal(result.pages[0].interpretive,true);
 assert.equal(report.interpretation.version,result.version);
 }
});
test('unknown and not-applicable remain non-numeric and cannot imply proven strength',()=>{
 for(const lang of ['en','cs','de'])for(const val of ['dk','na']){
 const r=interpreted(answers(val),lang);
 assert.equal(r.counts.scored,0);
 assert.ok(r.pages[0].items.every(x=>!x.text?.includes('NaN')));
 assert.ok(!r.pages[0].items.some(x=>x.text?.includes('undefined')));
 }
});
test('contrasting respondent profiles produce different evidence-linked interpretations',()=>{
 const a=interpreted(answers(i=>i<=24?5:1),'en');
 const b=interpreted(answers(i=>i<=24?1:5),'en');
 assert.notDeepEqual(a.pages[0].items,b.pages[0].items);
 assert.ok(a.pages[1].items.some(x=>x.type==='field'));
});
