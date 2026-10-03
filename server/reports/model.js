import fs from 'node:fs';
import {fileURLToPath} from 'node:url';
const read=name=>JSON.parse(fs.readFileSync(fileURLToPath(new URL(name,import.meta.url)),'utf8'));
export const content=read('./content.json');
const locales=read('./translations.json');
export const contract=read('./release-contract.json');
const records=content.subdimensions;
const dimensions=['Identity & Purpose','Understanding the Family Enterprise','Ownership & Wealth','Governance & Decision-Making','Capability & Experience','Responsibility & Transition'];
const critical=new Set([19,24,25,26,28,39,41,43,45,46]);
const levels={established:3,developing:2,exposed:1,unclear:null};
const isNumber=v=>Number.isInteger(v)&&v>=1&&v<=5;
export function validateAnswers(answers,{complete=false}={}){
 if(!answers||typeof answers!=='object'||Array.isArray(answers))throw Error('invalid_responses');
 for(const [key,v] of Object.entries(answers))if(!/^NRR-Q(0[1-9]|[1-3][0-9]|4[0-8])$/.test(key)||!(isNumber(v)||v==='dk'||v==='na'))throw Error('invalid_responses');
 if(complete&&Object.keys(answers).length!==48)throw Error('incomplete');
}
function classify(values,minimum=2,maxUnknown=1){
 const nums=values.filter(isNumber),mean=nums.length?nums.reduce((a,b)=>a+b,0)/nums.length:null;
 const status=nums.length>=minimum&&values.filter(v=>v==='dk').length<maxUnknown?(mean>=4?'established':mean>=3?'developing':'exposed'):'unclear';
 const visibility=nums.length===values.length?'Sufficient self-reported responses':nums.length?'Partial reported visibility':'Insufficient reported visibility';
 return {mean,status,level:levels[status],visibility};
}
function detail(record,values,status){
 const focus=record.focus;
 let finding,action,progress;
 if(values.every(v=>v==='na')){
  finding='You marked both statements as not applicable. Confirm relevance to your chosen role before setting a development task.';
  action='Discuss relevance with a sponsor. Record why this area is outside your role, or agree which information is needed to reassess it.';
  progress='Relevance is agreed and documented; an unscored area is never treated as established.';
 }else if(status==='unclear'){
  finding='Your responses leave this area unscored. Check whether information, access, experience or relevance explains the uncertainty.';
  action='Ask for an authorised explanation or example concerning '+focus[values.includes('dk')?values.indexOf('dk'):0]+'. Then decide whether the practical exercise below applies.';
  progress='The missing information or relevance question is resolved, or its owner and next review are recorded.';
 }else{
  const weak=values.map((v,i)=>isNumber(v)&&v<4?i:null).filter(v=>v!==null);
  if(weak.length===1)finding='Your answers are stronger on '+focus[1-weak[0]]+' than on '+focus[weak[0]]+'. Develop the weaker element without overlooking the existing foundation.';
  else if(status==='established')finding='You report a strong foundation in '+focus[0]+' and '+focus[1]+'. Test it through a more demanding decision and independent feedback.';
  else if(status==='exposed')finding='Your answers suggest limited preparation in '+focus[0]+' and '+focus[1]+'. Clarify the gap before accepting responsibility in this area.';
  else finding='You report useful foundations in '+focus[0]+' and '+focus[1]+'. A practical exercise can establish where further preparation is needed.';
  action=status==='established'?record.stretch:record.action;
  if(weak.length===1)action=record.targeted[weak[0]];
  else if(weak.length===2&&values[0]!==values[1])action=record.targeted[values[0]<values[1]?0:1];
  progress=record.progress;
 }
 return {finding,action,progress,trace:record.questions.map(q=>q.replace('NRR-Q','Q')).join(', ')};
}
export function analyse(answers){
 validateAnswers(answers);
 const subs=records.map((record,index)=>{
  const values=record.questions.map(q=>answers[q]),score=classify(values);
  return {...record,...score,...detail(record,values,score.status),index,dimension:Math.floor(index/4),values};
 });
 const dims=dimensions.map((name,di)=>{
  const values=Array.from({length:8},(_,i)=>answers['NRR-Q'+String(di*8+i+1).padStart(2,'0')]);
  const score=classify(values,5,3),items=subs.slice(di*4,di*4+4);
  const strengths=items.filter(s=>s.status==='established').map(s=>s.label),gaps=items.filter(s=>['exposed','unclear'].includes(s.status)).map(s=>s.label),developing=items.filter(s=>s.status==='developing').map(s=>s.label);
  const summary=(strengths.length?'Reported strengths: '+strengths.join(', ')+'. ':'')+(gaps.length?'Clarify or develop '+gaps.join(', ')+'.':developing.length?'Test developing foundations in '+developing.join(', ')+'.':'Use practical decisions and feedback to test the reported preparation.');
  return {name,...score,summary};
 });
 const rank={exposed:0,unclear:1,developing:2,established:3},enabling={'crisis-readiness':0,'decision-map':1,'ownership-literacy':2,'preparation-path':3};
 const key=s=>[rank[s.status],s.mean||0,enabling[s.id]??(s.questions.some(q=>critical.has(Number(q.slice(-2))))?4:5),s.index];
 const compare=(a,b)=>{const ka=key(a),kb=key(b);for(let i=0;i<ka.length;i++)if(ka[i]!==kb[i])return ka[i]-kb[i];return 0;};
 const priorities=[...subs].sort(compare).slice(0,3);
 const q=n=>answers['NRR-Q'+String(n).padStart(2,'0')],numeric=(...ns)=>ns.every(n=>isNumber(q(n))),signals=[];
 const add=(title,meaning,action)=>signals.push({title,meaning,action});
 if(numeric(41,42)&&(Math.abs(q(41)-q(42))>=2||Math.min(q(41),q(42))<=2))add('Expectations need confirmation','Your answers suggest uncertainty or uneven understanding about mutual expectations. They do not establish that the generations disagree.','Prepare separate accounts of desired roles, timing and limits, then compare them with a sponsor.');
 if(numeric(31,32)&&q(31)-q(32)>=2)add('Understanding exceeds practical exposure','You report more understanding of governance than experience of formal decision forums.','Arrange observation or a chaired simulation before taking a formal responsibility.');
 if(numeric(37,35)&&q(37)-q(35)>=2)add('Development needs a practical test','Your reported skills development is ahead of experience with consequential decisions.','Agree a bounded project, authority limits and independent feedback before widening delegation.');
 if(numeric(17,22)&&q(17)>=4&&q(22)<=2)add('Asset knowledge exceeds rights literacy','You report stronger knowledge of assets than of the rights and restrictions attached to your interests.','Confirm relevant rights with counsel before accepting a role or making an ownership decision.');
 if([45,46].some(n=>q(n)==='dk'||(isNumber(q(n))&&q(n)<=2)))add('Crisis duties need clarification','A sudden absence could leave your immediate duties or contacts uncertain.','Verify contacts and actual powers first, then rehearse the response and assign unresolved gaps.');
 if(numeric(27,26)&&q(27)>=4&&q(26)<=2)add('Voice needs a decision route','You report more confidence expressing a view than knowledge of where formal authority sits.','Confirm the forum, decision holder and escalation route before assuming a formal role.');
 if(numeric(43,44)&&Math.max(q(43),q(44))<=2&&subs.slice(16,20).some(s=>s.status==='established'))add('Capability exceeds opportunities to practise','You report capability alongside a limited route into responsibility. The family arrangements need examination as well as your preparation.','Ask the authority holder to agree access, a sponsor and a supervised responsibility; record any barrier.');
 const order={'personal-direction':0,values:1,'independent-experience':2};
 const strengths=subs.filter(s=>s.status==='established').sort((a,b)=>(order[a.id]??3)-(order[b.id]??3)||(b.mean||0)-(a.mean||0)||a.index-b.index).slice(0,3);
 return {subs,dims,priorities,signals,strengths};
}
export function translator(language){
 if(!contract.supported_languages.includes(language))throw Error('unsupported_language');
 if(content.version!==contract.content_version||locales.version!==content.version)throw Error('translation_version_mismatch');
 const dictionary=language==='en'?{}:locales.languages[language];
 if(language!=='en'&&!dictionary)throw Error('unsupported_language');
 const folded=new Map(Object.entries(dictionary).map(([k,v])=>[k.toLowerCase(),v]));
 const decode=s=>s.replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>').replace(/&#x27;/g,"'").replace(/&quot;/g,'"');
 const tr=source=>{
  const s=decode(String(source));if(language==='en')return s;
  if(dictionary[s]!==undefined)return dictionary[s];
  if(folded.has(s.toLowerCase()))return s===s.toUpperCase()?folded.get(s.toLowerCase()).toUpperCase():folded.get(s.toLowerCase());
  if(/^[\d /]+$/.test(s)||['ADAMAS','Alexander','Alexander von der Vellen'].includes(s))return s;
  const numbered=s.match(/^(\d+\. )(.+)$/);if(numbered)return numbered[1]+tr(numbered[2]);
  const finding=s.match(/^Finding (\(Q\d+, Q\d+\))$/);if(finding)return tr('Finding')+' '+finding[1];
  const prefix='This specimen uses fictional responses. ';if(s.startsWith(prefix))return dictionary[prefix]+tr(s.slice(prefix.length));
  throw Error('missing_translation:'+language+':'+s);
 };
 // Prevent a new language from silently using an incomplete advice release.
 if(language!=='en')for(const row of records)for(const s of [row.label,...row.focus,row.action,row.progress,row.stretch,row.support,row.blocked,...row.targeted])tr(s);
 return tr;
}
export function localise(model,language){
 const tr=translator(language),record=s=>({...s,label:tr(s.label),finding:tr(s.finding),action:tr(s.action),progress:tr(s.progress),support:tr(s.support),blocked:tr(s.blocked),stretch:tr(s.stretch),visibility:tr(s.visibility)});
 return {...model,subs:model.subs.map(record),priorities:model.priorities.map(record),strengths:model.strengths.map(record),dims:model.dims.map(d=>({...d,name:tr(d.name),summary:tr(d.summary),visibility:tr(d.visibility)})),signals:model.signals.map(s=>({title:tr(s.title),meaning:tr(s.meaning),action:tr(s.action)}))};
}
