import test from 'node:test';
import assert from 'node:assert/strict';
import {editorialRead,EDITORIAL_VERSION} from '../reports/editorial-logic.js';
const review='nextgen';
function make(statuses,{scored=48,unknown=0,na=0}={}){
 const mean={established:4,developing:2.5,exposed:1,unscored:null};
 const levels={established:3,developing:2,exposed:1};
 const dims=statuses.map((status,i)=>({name:'Dimension '+(i+1),index:i,status,mean:mean[status],level:levels[status]??null,trace:'Q'+(i*8+1)+'–Q'+(i*8+8)}));
 const pairs=Array.from({length:24},(_,i)=>{const status=statuses[Math.floor(i/4)];return {name:'Capability '+(i+1),index:i,status,mean:mean[status],level:levels[status]??null,trace:'Q'+(2*i+1)+', Q'+(2*i+2)};});
 return {review,counts:{scored,unknown,na},dimensions:dims,pairs,priorities:pairs.slice(0,3)};
}
const strong=()=>make(Array(6).fill('established'));
const weak=()=>make(Array(6).fill('exposed'));
const unscored=()=>make(Array(6).fill('unscored'),{scored:0,unknown:48});
test('balanced and universally exposed profiles receive different warranted readings',()=>{
 for(const language of ['en','cs','de']){
  const a=editorialRead({...strong(),language}),b=editorialRead({...weak(),language});
  assert.equal(a.version,EDITORIAL_VERSION);
  assert.equal(a.pattern,'balanced');assert.equal(b.pattern,'low');
  assert.notEqual(a.portraitPattern,b.portraitPattern);
  assert.ok(a.strength.includes('Q'));assert.equal(a.hasDependency,false);
  assert.equal(b.hasDependency,false);assert.ok(!a.portraitPattern.toLowerCase().includes('the scored pattern is uneven'));
 }
});
test('missing information remains unscored and does not produce repetitive claims',()=>{
 for(const language of ['en','cs','de']){
  const r=editorialRead({...unscored(),language});
  assert.equal(r.pattern,'partial');assert.equal(r.visibility,true);
  assert.equal(r.hasDependency,false);assert.equal(r.consequence,null);
  assert.equal(r.uncertainty,null);assert.equal(r.strength.includes('Q'),false);
  const v=[r.portraitPattern,r.domain,r.portraitDeep,r.portraitPerspective,r.strength,r.exposure,r.evidence];
  assert.equal(new Set(v).size,v.length,'avoid identical paragraphs');
  if(language!=='en')assert.ok(!v.join(' ').includes('not scored')&&!v.join(' ').includes('unscored'));
 }
});
test('only methodologically predeclared pair relationships trigger dependency claims',()=>{
 const config=make(Array(6).fill('developing'));
 const allowed={family:[2,3],nextgen:[1,2],shareholder:[0,1],adviser:[0,1],investment:[0,1]}[review];
 for(let i=0;i<4;i++){
  const a=allowed[0]*4+i,b=allowed[1]*4+i;
  config.pairs[a].status='established';config.pairs[a].level=3;config.pairs[a].mean=4;
  config.pairs[b].status='exposed';config.pairs[b].level=1;config.pairs[b].mean=1;
 }
 assert.equal(editorialRead({...config,language:'en'}).hasDependency,true);
 assert.equal(editorialRead({...make(Array(6).fill('developing')),language:'en'}).hasDependency,false);
});
test('narratives are deterministic, differentiated and leave no template placeholders',()=>{
 for(const language of ['en','cs','de'])for(const source of [strong(),weak(),unscored(),make(['established','established','developing','exposed','exposed','developing'])]){
  const first=editorialRead({...source,language}),second=editorialRead({...source,language});
  assert.deepEqual(first,second);
  for(const part of ['portraitPattern','domain','portraitDeep','strength','exposure','evidence']){
   assert.ok(typeof first[part]==='string'&&first[part].length>45,part);
   assert.ok(!/\{[a-zA-Z]+\}/.test(first[part]),part);
  }
 }
});
