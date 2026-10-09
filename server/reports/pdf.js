import {withCompass} from './compass/render.js';
import {markReportNames,reviewTextWidth,drawReviewText} from './trademarks.js';
import fs from 'node:fs';
import {PDFDocument,rgb,StandardFonts} from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import {translator} from './model.js';
const assets=JSON.parse(fs.readFileSync(new URL('./assets.json',import.meta.url),'utf8'));
const bytes=k=>Buffer.from(assets[k],'base64');
export const coverImage=()=>bytes('bridge');
const colour=hex=>rgb(...hex.match(/\w\w/g).map(v=>parseInt(v,16)/255));
const green=colour('0F3B2E'),gold=colour('B89B5E'),cream=colour('F4F0E6'),ink=colour('262626'),line=colour('D8D0C1');
function wrap(text,font,size,width,trademarkFont){const lines=[];for(const part of text.split('\n')){let current='';for(const word of part.split(/\s+/)){const next=current?current+' '+word:word;if(current&&reviewTextWidth(font,next,size,trademarkFont)>width){lines.push(current);current=word;}else current=next;}lines.push(current);}return lines;}
export async function renderPDF(report){
 report=await withCompass(report);
 report=markReportNames(report);
 const doc=await PDFDocument.create();doc.registerFontkit(fontkit);const trademarkFont=await doc.embedFont(StandardFonts.Helvetica);
 const [body,bold,title,script,bridge,wordmark]=await Promise.all([doc.embedFont(bytes('body'),{subset:true}),doc.embedFont(bytes('bold'),{subset:true}),doc.embedFont(bytes('title'),{subset:true}),doc.embedFont(bytes('script'),{subset:true}),doc.embedJpg(bytes('bridge')),doc.embedPng(bytes('wordmark'))]);
 const tr=translator(report.language),mark={en:'NextGen Readiness Review™ is a trademark of Adamas Advisors. © 2026 Adamas Advisors.',cs:'NextGen Readiness Review™ je ochranná známka společnosti Adamas Advisors. © 2026 Adamas Advisors.',de:'NextGen Readiness Review™ ist eine Marke von Adamas Advisors. © 2026 Adamas Advisors.'}[report.language];doc.setTitle(tr('Confidential NextGen Readiness Report'));doc.setAuthor('Adamas Advisors');doc.setCreationDate(new Date(report.generatedAt));
 const text=(page,s,x,y,size,font=body,c=ink)=>drawReviewText(page,s,{x,y,size,font,trademarkFont,color:c});
 const score=(page,status,x,y)=>{const value={exposed:1,developing:2,established:3}[status];['B44F44','D9A43D','3E8056'].forEach((c,i)=>page.drawCircle({x:x+i*10,y:y+3,size:3,color:value===i+1?colour(c):colour('C7CAC3')}));text(page,value?value+'/3':tr('Unscored'),x+29,y,7,bold,green);};
 const bounds=[];
 for(const spec of report.pages){
  const page=doc.addPage([612,792]);page.drawRectangle({x:0,y:0,width:612,height:792,color:cream});page.drawImage(wordmark,{x:54,y:704,width:120,height:54});page.drawLine({start:{x:54,y:696},end:{x:558,y:696},thickness:.7,color:gold});page.drawRectangle({x:0,y:0,width:612,height:44,color:green});text(page,'ADAMAS',54,17,10,title,cream);text(page,tr('CONFIDENTIAL - ADAMAS NEXTGEN READINESS REVIEW'),238,20,5.9,bold,cream);text(page,mark,238,8,4.2,body,cream);
  if(!spec.number){text(page,spec.title,78,648,Math.min(18,480/reviewTextWidth(title,spec.title,18,trademarkFont)*18),title,green);text(page,tr('THE ADAMAS NEXTGEN READINESS REVIEW'),78,620,7.5,bold,gold);text(page,report.date,78,602,8,body,green);page.drawRectangle({x:51,y:125,width:510,height:447,borderColor:gold,borderWidth:1});page.drawImage(bridge,{x:54,y:128,width:504,height:441});continue;}
  text(page,String(spec.number),538,18,7,body,cream);text(page,String(spec.number).padStart(2,'0'),54,674,8,bold,gold);text(page,spec.title,78,672,Math.min(17,480/reviewTextWidth(title,spec.title,17,trademarkFont)*17),title,green);
  const subtitle=spec.subtitle?wrap(spec.subtitle,body,8.4,480,trademarkFont):[];subtitle.forEach((s,i)=>text(page,s,78,641-i*12,8.4));
  if(spec.number===3){
   const image=await doc.embedPng(Buffer.from(report.compass.image.split(',')[1],'base64'));
   page.drawImage(image,{x:54,y:322,width:504,height:504*report.compass.height/report.compass.width});
   spec.dimensions.forEach((d,i)=>{const x=78+(i%2)*245,y=284-Math.floor(i/2)*72;wrap(d.name,bold,7.7,169,trademarkFont).forEach((s,j)=>text(page,s,x,y-j*10,7.7,bold,green));score(page,d.status,x+176,y-7);wrap(d.summary,body,7.5,220,trademarkFont).forEach((s,j)=>text(page,s,x,y-25-j*10,7.5));});continue;
  }
  const layout=size=>{let y=spec.subtitle?609:620;const blocks=[];for(const item of spec.items){const heading=['heading','kicker'].includes(item.type);const font=heading?bold:body;const fs=heading?(item.type==='kicker'?7.5:9):size;const value=item.type==='field'?item.label+': '+item.text:item.text;let lines=wrap(value,font,fs,item.type==='score'?390:480,trademarkFont);
 if(item.type==='field'){const prefix=item.label+': ';const words=item.text.split(/\s+/);let first='';while(words.length&&reviewTextWidth(body,first?first+' '+words[0]:words[0],fs,trademarkFont)<=480-reviewTextWidth(bold,prefix,fs,trademarkFont)){first+=(first?' ':'')+words.shift();}lines=[prefix+first,...(words.length?wrap(words.join(' '),body,fs,480,trademarkFont):[])];}const leading=fs*1.43;blocks.push({item,lines,y,size:fs,font});y-=lines.length*leading+(heading?5:item.type==='field'?5:12);}return {blocks,y};};
  let size=8.5,layoutResult=layout(size);while(layoutResult.y<125&&size>8.1){size=Math.max(8.1,size-.1);layoutResult=layout(size);}
  if(layoutResult.y<120)throw Error('report_layout_overflow:'+report.language+':page'+spec.number+':'+layoutResult.y);
  for(const b of layoutResult.blocks){if(b.item.type==='score')score(page,b.item.status,83,b.y-b.size);
 b.lines.forEach((s,i)=>{const y=b.y-b.size-i*b.size*1.43;if(b.item.type==='field'&&i===0){const prefix=b.item.label+': ';text(page,prefix,78,y,b.size,bold);text(page,s.slice(prefix.length),78+reviewTextWidth(bold,prefix,b.size,trademarkFont),y,b.size,body);}else text(page,s,b.item.type==='score'?167:78,y,b.size,b.font,b.item.type==='kicker'?gold:b.font===bold?green:ink);});if(b.item.type==='heading'&&spec.scores){const match=spec.scores.find(s=>s.label===b.item.text);if(match)score(page,match.status,488,b.y-b.size);}}
  bounds.push({page:spec.number,bottom:layoutResult.y,fontSize:size});
  if(spec.number!==1){page.drawRectangle({x:78,y:68,width:480,height:44,borderColor:gold,borderWidth:.6});text(page,tr('Notes / agreed next step:'),89,99,7.5,body,green);page.drawLine({start:{x:89,y:84},end:{x:547,y:84},color:line,thickness:.35});}
 }
 if(doc.getPageCount()!==18)throw Error('report_page_count');return {bytes:await doc.save(),bounds};
}
