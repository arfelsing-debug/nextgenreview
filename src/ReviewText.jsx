import React from 'react';
import {markReviewNames} from '../server/reports/trademarks.js';
export function reviewText(value){
 if(Array.isArray(value))return value.map(reviewText);
 if(typeof value!=='string')return value;
 const parts=markReviewNames(value).split('™');
 if(parts.length===1)return value;
 return parts.map((part,i)=><React.Fragment key={i}>{i>0&&<sup className="review-tm">™</sup>}{part}</React.Fragment>);
}
const notices={"en":"NextGen Readiness Review™ is a trademark of Adamas Advisors · © 2026 Adamas Advisors","cs":"NextGen Readiness Review™ je ochranná známka společnosti Adamas Advisors · © 2026 Adamas Advisors","de":"NextGen Readiness Review™ ist eine Marke von Adamas Advisors · © 2026 Adamas Advisors"};
export function ReviewTrademarkNotice({language}){return <footer className="review-trademark-notice">{reviewText(notices[language]||notices.en)}</footer>;}
