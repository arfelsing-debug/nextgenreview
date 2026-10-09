import test from 'node:test';
import assert from 'node:assert/strict';
import {specimenReport} from '../reports/specimen.js';
import {extractNarrativeBrief,composeFictionalNarrative,applyEditorialDraft} from '../reports/editorial-narrative.js';
const review='nextgen';
test('editorial evidence brief covers actual fictional scores and excludes identity',async()=>{
 for(const language of ['en','cs','de'])for(const caseName of ['mixed','established','exposed','unknown','not-applicable']){
  const report=await specimenReport(language,caseName);
  const brief=extractNarrativeBrief(report,{review});
  assert.equal(brief.language,language);assert.equal(brief.dimensions.length,6);
  assert.equal(brief.pairs.length,24);assert.equal(brief.allowed_evidence_ids.length,30);
  assert.equal(brief.priorities.length,3);
  assert.equal(brief.counts.scored+brief.counts.unknown+brief.counts.not_applicable,48);
  assert.ok(!JSON.stringify(brief).includes('@'));
  if(caseName==='unknown')assert.equal(brief.counts.scored,0);
  if(caseName==='not-applicable')assert.equal(brief.counts.not_applicable,48);
 }
});
test('a live respondent cannot trigger external narrative drafting',async()=>{
 const report=await specimenReport('en','mixed');
 delete report.specimen;
 let contacted=false;
 await assert.rejects(()=>composeFictionalNarrative(report,{review,apiKey:'fixture',model:'mock',
  enabled:true,fetcher:async()=>{contacted=true}}),/fictional_only_narrative_gate/);
 assert.equal(contacted,false);
});
test('an unconfigured synthetic preview fails before calling any external provider',async()=>{
 const report=await specimenReport('en','mixed');
 let contacted=false;
 await assert.rejects(()=>composeFictionalNarrative(report,{review,enabled:false,
  apiKey:'fixture',model:'mock',fetcher:async()=>{contacted=true}}),/fictional_only_narrative_gate/);
 assert.equal(contacted,false);
});
test('drafting sees uniform, mixed and unscored profiles with question references',async()=>{
 const strong=extractNarrativeBrief(await specimenReport('en','established'),{review});
 const exposed=extractNarrativeBrief(await specimenReport('en','exposed'),{review});
 const unknown=extractNarrativeBrief(await specimenReport('en','unknown'),{review});
 const mixed=extractNarrativeBrief(await specimenReport('en','mixed'),{review});
 assert.equal(strong.profile.shape,'uniformly_established');
 assert.equal(exposed.profile.shape,'uniformly_exposed');
 assert.equal(unknown.profile.shape,'no_scored_answers');
 assert.equal(mixed.profile.shape,'mixed_ratings');
 assert.deepEqual(strong.pairs[0].question_refs,['NRR-Q01','NRR-Q02']);
});
test('direct editorial overlay cannot modify an unmarked report',async()=>{
 const report=await specimenReport('en','mixed');
 const brief=extractNarrativeBrief(report,{review});
 delete report.specimen;
 assert.throws(()=>applyEditorialDraft(report,{},brief),/fictional_only_editorial_overlay/);
});
