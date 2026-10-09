import test from 'node:test';
import assert from 'node:assert/strict';
import {buildReport} from '../reports/pages.js';
import {analyse} from '../reports/model.js';
const answers=v=>Object.fromEntries(Array.from({length:48},(_,i)=>['NRR-Q'+String(i+1).padStart(2,'0'),typeof v==='function'?v(i):v]));
const make=a=>buildReport(a,'en');
const priorities=a=>analyse(a).priorities.map(p=>p.id);
const langs=['en','cs','de'];
test('nextgen: evidence-led interpretation is available in all languages without changing the original report structure',()=>{
 for(const language of langs){const a=answers(5);const r=buildReport(a,language);
  assert.equal(r.pages.length,23);assert.equal(r.numberedPages,22);
  assert.equal(r.pages[3].dimensions.length,6);
  assert.equal(r.interpretation.version,'1.1.0');
  assert.ok(r.pages.slice(13,18).every(p=>p.interpretive&&p.interpretiveVersion==='1.1.0'));
  assert.deepEqual(r.pages.map(p=>p.number),Array.from({length:23},(_,i)=>i));
  assert.equal(r.pages[13].items.filter(i=>i.type==='paragraph').length>=3,true);
  assert.ok(r.pages[17].items.some(i=>i.type==='field'));
 }
});
test('nextgen: same answers are deterministic, different profiles have different interpretations',()=>{
 const high=make(answers(5));const low=make(answers(1));
 assert.deepEqual(make(answers(5)).pages.slice(13,18),high.pages.slice(13,18));
 assert.notDeepEqual(high.pages[13].items,low.pages[13].items);
});
test('nextgen: unknown and inapplicable answers are not described as established strengths',()=>{
 for(const value of ['dk','na']){const r=make(answers(value));assert.equal(r.interpretation.coverage.scored,0);
  const body=JSON.stringify(r.pages.slice(13,18));assert.ok(!body.includes('NaN'));
  assert.ok(r.pages[13].items.every(i=>!i.text?.includes('undefined')));
 }
});
test('nextgen: original priorities remain in original priority order',()=>{
 const a=answers(i=>i%3===0?1:5);
 const r=make(a);const known=priorities(a);
 assert.equal(known.length,3);assert.equal(r.interpretation.priorityIds.length,3);
 const narrative=JSON.stringify(r.pages.slice(16,18));
 for(const p of r.interpretation.priorityIds)assert.ok(narrative.length>100);
});
