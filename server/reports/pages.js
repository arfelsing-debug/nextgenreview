import fs from 'node:fs';
import './letter-summary.js';
import {analyse,localise,translator,contract,validateAnswers} from './model.js';
const release=JSON.parse(fs.readFileSync(new URL('./pages.json',import.meta.url),'utf8'));
if(release.version!==contract.content_version)throw Error('page_template_version_mismatch');
const templates=release.pages;
const decode=s=>s.replace(/&amp;/g,'&').replace(/&#x27;/g,"'").replace(/&quot;/g,'"');
export function buildReport(answers,language,{now=new Date()}={}){
 validateAnswers(answers,{complete:true});
 const model=analyse(answers),tr=translator(language);
 const date=new Intl.DateTimeFormat({en:'en-GB',cs:'cs-CZ',de:'de-DE'}[language],{day:'numeric',month:'long',year:'numeric',timeZone:'Europe/Prague'}).format(now);
 const words={en:{participant:'the participant',strength:'Your reported strengths include ',prior:'The principal priorities are ',suffix:'. Each finding includes a practical next step and evidence by which progress can be reviewed.'},cs:{participant:'účastníka',strength:'Uváděné silné stránky zahrnují: ',prior:'Hlavní priority: ',suffix:'. Každé zjištění uvádí praktický krok a doklad pro hodnocení pokroku.'},de:{participant:'die teilnehmende Person',strength:'Ihre berichteten Stärken umfassen: ',prior:'Hauptprioritäten: ',suffix:'. Jeder Befund enthält einen praktischen Schritt und einen Fortschrittsnachweis.'}}[language];
 const vars={model,participant:'the participant',date};
 const fill=s=>decode(s).replace(/\{\{([^}]+)\}\}/g,(_,p)=>p.toLowerCase().split('.').reduce((v,k)=>v?.[k],vars)??'');
 const translate=s=>{
  if(s.startsWith('Prepared for '))return ({en:'Prepared for '+words.participant+' | Generated ',cs:'Připraveno pro '+words.participant+' | Vytvořeno ',de:'Erstellt für '+words.participant+' | Erstellt am '}[language])+date;
  if(s.startsWith('Your reported strengths include '))return globalThis.AdamasLetterSummary.summary('nextgen',localise(model,language),language);
  if(s.startsWith('The principal priorities are '))return words.prior+model.priorities.map(v=>tr(v.label)).join(', ')+words.suffix;
  return tr(s);
 };
 const pages=templates.map(template=>{
  let items=template.items.filter(item=>{
   if(template.number===1&&item.text.startsWith('The principal priorities are '))return false;
   if(template.number===12&&item.label==='Further signals')return false;
   if(template.number===1&&item.text.startsWith('Your reported strengths include '))return true;
   const refs=JSON.stringify(item).matchAll(/\{\{model\.(strengths|signals)\.(\d+)\./g);
   for(const r of refs)if(!model[r[1]][Number(r[2])])return false;
   return true;
  }).map(item=>Object.fromEntries(Object.entries(item).map(([k,v])=>[k,k==='type'?v:translate(fill(v))])));
  if(template.number===4&&!model.strengths.length)items=[{type:'paragraph',text:tr('No subdimension is currently classified as established. Ask a sponsor to help identify a practical foundation you can build on without treating an uncertain score as a weakness of character.')}];
  if(template.number===5){
   let priority=0;items=items.map(i=>i.type==='field'&&i.label===tr('Why act')?{...i,text:tr(model.priorities[priority++].status==='unclear'?'Confirm relevance and visibility before assigning responsibility.':model.priorities[priority-1].status==='established'?'Use a more demanding exercise and independent feedback before widening responsibility.':'Responsibility in this area could arrive before preparation or the supporting arrangements are sufficiently tested.')}:i);
  }
  if(template.number===12){
   const signals=model.signals.slice(0,3);
   const tail=items.slice(items.findIndex(i=>i.type==='kicker'));
   items=signals.flatMap(s=>[{type:'heading',text:tr(s.title)},{type:'paragraph',text:tr(s.meaning)},{type:'field',label:tr('Practical implication'),text:tr(s.action)}]);
   if(!signals.length)items=[{type:'heading',text:tr('Confirm what the scores mean in practice')},{type:'paragraph',text:tr('No major cross-question tension is triggered by this response pattern. This does not establish that family arrangements are aligned.')},{type:'field',label:tr('Practical implication'),text:tr('Test the three priorities against examples, documents and a discussion with a sponsor.')}];
   if(model.signals.length>3)items.push({type:'field',label:tr('Further signals'),text:model.signals.slice(3).map(s=>tr(s.title)).join('; ')+'. '+tr('Review these alongside the relevant dimension actions.')});
   items.push(...tail);
  }
  if(template.number===14){for(let k=0;k<3;k++){const s=model.priorities[k];const item=items.find(i=>i.type==='field'&&i.label===tr(s.label));if(s.status==='unclear')item.text=tr('Confirm relevance and obtain an authorised explanation of missing information.');}}
  return {number:template.number,title:tr(template.title||'Confidential NextGen Readiness Report'),subtitle:template.subtitle?tr(template.subtitle):'',items};
 });
 const local=localise(model,language);
 // Only publish the translated fields required by the respondent view.
 const dimension=d=>({name:d.name,status:d.status,level:d.level,visibility:d.visibility,summary:d.summary});
 pages[3].dimensions=local.dims.map(dimension);pages[3].points=local.subs.map(s=>({label:s.label,level:s.level,status:s.status}));
 for(let i=6;i<=11;i++){pages[i].scores=local.subs.slice((i-6)*4,(i-5)*4).map(s=>({label:s.label,status:s.status,level:s.level}));pages[i].items[0]={type:'score',text:local.dims[i-6].visibility,status:local.dims[i-6].status,level:local.dims[i-6].level};}
 for(const [n,rows] of [[4,local.strengths],[5,local.priorities]])pages[n].scores=rows.map((s,i)=>({label:(i+1)+'. '+s.label,status:s.status,level:s.level}));
 return {contentVersion:contract.content_version,letterSummaryVersion:globalThis.AdamasLetterSummary.version,language,generatedAt:now.toISOString(),date,numberedPages:17,pages};
}
