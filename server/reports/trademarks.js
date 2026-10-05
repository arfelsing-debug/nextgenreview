// Keep named Review products marked consistently in HTML and PDF output.
export const reviewNames = /(?<![\p{L}\p{N}])((?:(?:Adamas )?(?:Family Continuity|NextGen Readiness|Shareholder Readiness|Adviser Coordination|Investment Manager|Legal Adviser|Trustee Relationship|Founder Dependency|Family Governance|Trustee Governance|Family Office Institutionali[sz]ation|Stewardship|Annual Continuity Monitoring|Continuity) Review)|Familienkontinuitätsanalyse|Annual Continuity Monitoring)(?![\p{L}\p{N}])(?:\s*™)*/giu;
export function markReviewNames(value) {
 return typeof value === 'string' ? value.replace(reviewNames, '$1™') : value;
}
export function markReportNames(value) {
 if (typeof value === 'string') return markReviewNames(value);
 if (Array.isArray(value)) return value.map(markReportNames);
 if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).map(([k,v])=>[k,markReportNames(v)]));
 return value;
}
export function reviewTextWidth(font, value, size, trademarkFont = font) {
 const parts=markReviewNames(value).split('™');
 return parts.reduce((width,part,i)=>width+font.widthOfTextAtSize(part,size)+(i?trademarkFont.widthOfTextAtSize('™',size*.33):0),0);
}
export function drawReviewText(page, value, options) {
 const {x,y,size,font,trademarkFont=font,...rest}=options;let left=x;
 markReviewNames(value).split('™').forEach((part,i)=>{
  if(i){page.drawText('™',{...rest,x:left,y:y+size*.55,size:size*.33,font:trademarkFont});left+=trademarkFont.widthOfTextAtSize('™',size*.33);}
  if(part){page.drawText(part,{...rest,x:left,y,size,font});left+=font.widthOfTextAtSize(part,size);}
 });
}
