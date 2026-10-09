/**
 * Adamas Editorial Composer, experimental 0.1
 *
 * A genuine language-model composition layer, not sentence substitution.
 * Only operates on explicitly marked, fictional specimen reports.
 * Real respondent content is never sent by this module. Production remains
 * deterministic until approved AI-specific consent, processing terms,
 * operational review and release gates exist.
 */
export const EDITORIAL_COMPOSER_VERSION='0.1.0-fictional-only';
export const NARRATIVE_PAGE_NUMBERS=[13,14,15,16];

const domains={
 family:'Family continuity: stewardship, family relationships, governance, succession, access and consent.',
 nextgen:'Next-generation preparation: learning ownership, judgement, financial understanding, responsibility and supported experience.',
 shareholder:'Shareholder readiness: rights, understanding, voting authority, governance, relationships and continuity.',
 adviser:'Adviser coordination: mandate clarity, conflicts, oversight, division of responsibility, cooperation and continuity.',
 investment:'Investment-manager oversight: mandate, investment discipline, risk, reporting, governance and continuity.'
};
const wordCount=t=>String(t||'').trim().split(/\s+/).filter(Boolean).length;
const status=s=>({green:'established',amber:'developing',red:'exposed',grey:'unscored',established:'established',developing:'developing',exposed:'exposed',unclear:'unscored'})[String(s||'').toLowerCase()]||'unscored';
const normal=t=>String(t||'').trim().replace(/\s+/g,' ').slice(0,180);
const containsPII=t=>/@|https?:\/\/|\b(?:\+\d{6,}|(?:\d[ -]?){10,16})\b/.test(t);
const pageNames=['portrait_foundations','portrait_implications','strengths_evidence','exposures_consequences'];
const sectionSchema={type:'object',additionalProperties:false,required:['paragraphs','evidence_ids'],properties:{
 paragraphs:{type:'array',items:{type:'string'}},
 evidence_ids:{type:'array',items:{type:'string'}}
}};
export const outputSchema={type:'object',additionalProperties:false,required:pageNames,properties:Object.fromEntries(pageNames.map(k=>[k,sectionSchema]))};
export function extractNarrativeBrief(report,{review}={}){
 if(!report||!Array.isArray(report.pages)||report.pages.length<25||!domains[review]||!['en','cs','de'].includes(report.language))throw Error('invalid_brief');
 const dims=(report.pages[3]?.dimensions||[]).map((d,i)=>({
  evidence_id:'D'+String(i+1).padStart(2,'0'),
  name:normal(d.name),status:status(d.status),coverage:Number.isInteger(d.coverage)?d.coverage:null
 }));
 if(dims.length!==6)throw Error('invalid_six_dimensions');
 const pairs=[];
 for(let i=0;i<6;i++){
  const scores=report.pages[i+6]?.scores||[];
  if(scores.length!==4)throw Error('invalid_pair_structure');
  scores.forEach((r,j)=>{
   const n=i*8+j*2+1;
   const refs=review==='family'?[n,n+1].map(v=>['PUR','FAM','GOV','NGR','STR','RES'][i]+'-'+String(v-i*8).padStart(2,'0')):
    [n,n+1].map(v=>({investment:'IMR-Q',adviser:'ACR-Q',shareholder:'SRR-Q',nextgen:'NRR-Q'})[review]+String(v).padStart(2,'0'));
   pairs.push({evidence_id:'E'+String(i*4+j+1).padStart(2,'0'),dimension_id:dims[i].evidence_id,
    name:normal(r.label),status:status(r.status),question_refs:refs});
  });
 }
 const priorityPage=report.pages[5],names=(priorityPage?.items||[]).filter(x=>x.type==='heading').map(x=>normal(x.text).replace(/^\d+\.\s*/,'')).filter(Boolean).slice(0,3);
 const interpret=report.interpretation||{};
 const coverage=interpret.coverage;
 const scored=typeof coverage==='number'?coverage:coverage?.scored;
 const unknown=Number.isInteger(interpret.unknown)?interpret.unknown:coverage?.unknown;
 const na=Number.isInteger(interpret.notApplicable)?interpret.notApplicable:coverage?.na;
 const counts={scored:Number.isInteger(scored)?scored:null,unknown:Number.isInteger(unknown)?unknown:null,not_applicable:Number.isInteger(na)?na:null};
 if((counts.scored??0)+(counts.unknown??0)+(counts.not_applicable??0)!==48)throw Error('invalid_coverage');
 const validIds=[...dims,...pairs].map(x=>x.evidence_id);
 const known=dims.filter(d=>d.status!=='unscored');
 const distinct=new Set(known.map(d=>d.status));
 const profile={
  shape:counts.scored===0?'no_scored_answers':known.length<3?'limited_visibility':
   known.length===6&&known.every(d=>d.status==='established')?'uniformly_established':
   known.length===6&&known.every(d=>d.status==='exposed')?'uniformly_exposed':
   distinct.size===1?'similar_ratings':'mixed_ratings',
  dimension_status_counts:Object.fromEntries(['established','developing','exposed','unscored'].map(k=>[k,dims.filter(d=>d.status===k).length])),
  pair_status_counts:Object.fromEntries(['established','developing','exposed','unscored'].map(k=>[k,pairs.filter(p=>p.status===k).length]))
 };
 return {review,language:report.language,scope:domains[review],counts,profile,dimensions:dims,pairs,priorities:names,allowed_evidence_ids:validIds,
  limitations:'One respondent, self-report only; not independent confirmation of facts, other stakeholders or future outcomes.'};
}
export function buildEditorialInstructions(language){
 const localeName={en:'English',cs:'Czech',de:'German'}[language];if(!localeName)throw Error('unsupported_language');
 return [
  'You are an experienced independent strategic counsel writing a bespoke confidential assessment in polished '+localeName+'.',
  'The supplied data are the complete evidence. Do not invent events, documents, family dynamics, professional failures, demographic facts or objective verification.',
  'Write interpretive prose, not generic instructions, checklists, motivational aphorisms, stock boilerplate, or filled-in templates.',
  'Make a narrative argument: which details in THESE answers change your understanding, what connects them, where apparent confidence may depend on untested arrangements, what remains uncertain.',
  'No identical paragraph structures across sections. Do not repeat verification, handover, resilience or 30/90-day instructions in several places.',
  'Respect four distinct editorial roles:',
  'portrait_foundations: overall pattern, the balance of meaningful scored strengths and areas needing attention, no generic roadmap.',
  'portrait_implications: why that pattern matters and what it might imply for this respondent, with appropriately conditional reasoning.',
  'strengths_evidence: what specific strong answers imply, which practice would corroborate them and whether the capabilities are transferable.',
  'exposures_consequences: specific vulnerabilities or lack of visibility, possible dependencies and practical consequences, then one restrained next-step conclusion.',
  'Use 2 or 3 flowing paragraphs per section, generally 60 to 100 words per paragraph. Produce four different, compact report pages; avoid padding.',
  'Use language-specific natural grammar and idiom, no untranslated English placeholders, no em dashes, no sentence-opening Because, no trite aphorisms.',
  'Avoid constructions of the form "X is the point", "not X but Y", or the word distinction unless logically necessary.',
  'Maintain sustained, developed paragraphs with varied syntax. Avoid isolated punchline sentences, repeated transition formulas and repeated adjectives.'
  + ' Avoid especially, quiet or quietly unless literally about volume, and avoid retrospective stock openings.',
  'Ground material observations in the named dimensions and subdimensions, using only their supplied statuses.',
  'For EACH section return evidence_ids listing 2 to 6 supporting IDs from allowed_evidence_ids; never invent IDs.',
  'If scored coverage is low, do not assert strengths or weaknesses. Explain the limits of visibility concisely.',
  'Use the supplied profile.shape explicitly to distinguish uniform, mixed and low-visibility response patterns; never create contrasts when scores are tied.',
  'Uniformly established results offer no evidence of weak dimensions; uniformly exposed results offer no evidenced strengths; unscored results support neither positive nor negative findings.',
  'Question references describe which statements were rated. They are not documents, interviews or independently verified events.',
  'Never treat ties or a uniformly high profile as an uneven or unbalanced pattern. Scenarios are possibilities, not measured predictions.',
  'Do not recommend investment transactions, legal steps or changes to governance based solely on scores.',
  'Return only the specified JSON object.'
 ].join('\n');
}
const normalizeParagraph=t=>String(t||'').trim().replace(/\s+/g,' ').toLowerCase().replace(/[.,;:!?]/g,'');
function overlapScore(a,b){
 const words=t=>normalizeParagraph(t).split(' ').filter(x=>x.length>3);
 const first=new Set(words(a)),second=new Set(words(b));
 let same=0;for(const w of first)if(second.has(w))same++;
 return same/Math.max(1,Math.min(first.size,second.size));
}
export function validateEditorialDraft(draft,brief){
 if(!draft||typeof draft!=='object'||!brief)throw Error('invalid_editorial_draft');
 const allowed=new Set(brief.allowed_evidence_ids);
 const seen=[];
 for(const key of pageNames){
  const part=draft[key];
  if(!part||!Array.isArray(part.paragraphs)||part.paragraphs.length<2||part.paragraphs.length>4)throw Error('invalid_editorial_paragraphs:'+key);
  if(!Array.isArray(part.evidence_ids)||part.evidence_ids.length<2||part.evidence_ids.length>6)throw Error('invalid_editorial_evidence:'+key);
  for(const id of part.evidence_ids)if(!allowed.has(id))throw Error('unsupported_editorial_evidence:'+id);
  const words=part.paragraphs.reduce((sum,p)=>{
   if(typeof p!=='string'||p.length<200||p.length>1150||p.includes('{')||p.includes('}')||p.includes('**')||/<[^>]+>/.test(p)||containsPII(p))throw Error('invalid_editorial_text:'+key);
   if(/\b(?:is the point|becomes the point|in conclusion|the key takeaway|the purpose of this review)\b/i.test(p))throw Error('editorial_stock_phrase');
   for(const previous of seen)if(overlapScore(previous,p)>.84)throw Error('editorial_repeat');
   seen.push(p);return sum+wordCount(p);
  },0);
  if(words<85||words>345)throw Error('invalid_editorial_page_length:'+key+':'+words);
 }
 return true;
}
function outputText(response){
 const parts=(response.output||[]).flatMap(x=>x.content||[]).filter(x=>x.type==='output_text'&&typeof x.text==='string').map(x=>x.text);
 return parts.join('')||response.output_text||'';
}
/**
 * Compare actual output across unlike respondent profiles.
 * Four-word shingles detect recurring stock prose independently of
 * changing dimension labels. Reviewers must still judge nuance manually.
 */
export function crossProfileSimilarity(reportA,reportB){
 if(!reportA?.editorial||!reportB?.editorial)throw Error('requires_two_editorial_reports');
 if(reportA.editorial.source!=='fictional-specimen-only'||reportB.editorial.source!=='fictional-specimen-only')throw Error('fictional_only_comparison');
 const shingles=t=>{
  const a=String(t||'').toLocaleLowerCase().replace(/[^\p{L}\p{N}]+/gu,' ').trim().split(/\s+/).filter(Boolean),n=new Set();
  for(let i=0;i<a.length-3;i++)n.add(a.slice(i,i+4).join(' '));return n;
 };
 const byPage=[];
 for(const i of NARRATIVE_PAGE_NUMBERS){
  const extract=r=>r.pages[i].items.filter(x=>x.type==='paragraph').map(x=>x.text).join(' ');
  const a=shingles(extract(reportA)),b=shingles(extract(reportB));let common=0;
  for(const phrase of a)if(b.has(phrase))common++;
  byPage.push({page:i,sharedFourWordSequences:common,overlap:common/Math.max(1,Math.min(a.size,b.size))});
 }
 return {pages:byPage,maxOverlap:Math.max(...byPage.map(p=>p.overlap)),
  warnsStockProse:byPage.some(p=>p.overlap>.50)};
}
export function applyEditorialDraft(report,draft,brief,{model='fictional-draft'}={}){
 if(report?.specimen!==true||report.language!==brief?.language||!domains[brief?.review])throw Error('fictional_only_editorial_overlay');
 validateEditorialDraft(draft,brief);
 // Only replace the four narrative pages, preserving the Compass, scores,
 // priorities, canonical chapter order, page numbering and original archive.
 const revised={...report,pages:report.pages.map((p,i)=>{
  if(!NARRATIVE_PAGE_NUMBERS.includes(i))return p;
  const key=pageNames[i-13],section=draft[key];
  const label={en:'Answer evidence',cs:'Podkladové odpovědi',de:'Belege aus den Antworten'}[report.language];
  return {...p,items:[...section.paragraphs.map(text=>({type:'paragraph',text})),
   {type:'field',label,text:section.evidence_ids.join(', ')}],
   authoredBy:'editorial-composer-v0.1'};
 })};
 revised.editorial={version:EDITORIAL_COMPOSER_VERSION,source:'fictional-specimen-only',
  model,briefCoverage:brief.counts,identity:'anonymous',verifiedInputIds:true};
 return revised;
}
/**
 * Synthetic-only external drafting. Never call from a live respondent route.
 * Pass synthetic specimen data and explicitly enabled options.
 * No respondent PII or full answers enter the prompt; store:false.
 */
export async function composeFictionalNarrative(report,{review,fetcher=fetch,apiKey,model,enabled=false,timeoutMs=45000}={}){
 if(!enabled||report?.specimen!==true)throw Error('fictional_only_narrative_gate');
 if(!apiKey||!model)throw Error('narrative_api_unconfigured');
 const brief=extractNarrativeBrief(report,{review});
 const payload={model,store:false,max_output_tokens:5500,
  input:[{role:'system',content:buildEditorialInstructions(report.language)},
   {role:'user',content:JSON.stringify(brief)}],
  text:{format:{type:'json_schema',name:'adamas_editorial_sections',strict:true,schema:outputSchema}}};
 const controller=new AbortController();
 const timer=setTimeout(()=>controller.abort(),timeoutMs);
 let result;
 try{
  result=await fetcher('https://api.openai.com/v1/responses',{method:'POST',signal:controller.signal,
   headers:{Authorization:'Bearer '+apiKey,'Content-Type':'application/json'},
   body:JSON.stringify(payload)});
  if(!result.ok)throw Error('editorial_provider_unavailable:'+result.status);
  const body=await result.json();const text=outputText(body);
  if(!text)throw Error('editorial_provider_empty');
  const draft=JSON.parse(text);
  return applyEditorialDraft(report,draft,brief,{model});
 }finally{clearTimeout(timer);}
}
