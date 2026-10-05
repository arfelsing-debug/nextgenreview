import test from 'node:test';
import assert from 'node:assert/strict';
import {markReviewNames,markReportNames,reviewTextWidth,drawReviewText} from '../reports/trademarks.js';
test('named products have one trademark; ordinary review instructions remain unchanged',()=>{
 for(const name of ['Family Continuity Review','NextGen Readiness Review','Shareholder Readiness Review','Adviser Coordination Review','Investment Manager Review','Legal Adviser Review','Trustee Relationship Review','Founder Dependency Review','Family Governance Review','Trustee Governance Review','Family Office Institutionalisation Review','Stewardship Review','Annual Continuity Monitoring','Familienkontinuitätsanalyse']){
  assert.equal(markReviewNames(name),name+'™');assert.equal(markReviewNames(name+'™™'),name+'™');assert.equal(markReviewNames(markReviewNames(name)),name+'™');
 }
 assert.equal(markReviewNames('Complete the Review. Review your answers.'),'Complete the Review. Review your answers.');
 const report={pages:[{number:0,title:'Family Continuity Review'}]};
 assert.deepEqual(markReportNames(report),{pages:[{number:0,title:'Family Continuity Review™'}]});assert.equal(report.pages[0].title,'Family Continuity Review');
});
test('PDF marks use exactly 33% of the font size and rise above the baseline',()=>{
 const calls=[],font={widthOfTextAtSize:(s,size)=>s.length*size};
 drawReviewText({drawText:(s,options)=>calls.push([s,options])},'Shareholder Readiness Review',{x:10,y:20,size:12,font});
 assert.equal(calls[1][0],'™');assert.equal(calls[1][1].size,12*.33);assert.ok(calls[1][1].y>20);
 assert.equal(reviewTextWidth(font,'Shareholder Readiness Review',12),'Shareholder Readiness Review'.length*12+12*.33);
});
