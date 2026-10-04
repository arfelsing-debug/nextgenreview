import {buildReport} from './pages.js';
import {renderPDF,coverImage} from './pdf.js';
import {contract} from './model.js';
export function installReportRoutes(app,{current,store}){
 const generate=async(req,res,next)=>{
  res.set('Cache-Control','private, no-store');res.set('Vary','Cookie');
  try{
   const session=await current(req);if(!session)return res.status(401).json({error:'unauthorized'});
   if(!session.completed)return res.status(409).json({error:'review_incomplete'});
   const language=req.query.language??session.language;
   if(typeof language!=='string'||!contract.supported_languages.includes(language))return res.status(400).json({error:'unsupported_language'});
   const archived=store.reportForSession?await store.reportForSession(session.id):null;
   if(archived&&archived.language===language){if(req.path.endsWith('.pdf')){res.set('Content-Disposition',`attachment; filename="NextGen_Readiness_Report_${language.toUpperCase()}.pdf"`);res.type('application/pdf').send(archived.pdf_bytes)}else res.json(archived.report_json);return}
   const saved=await store.responses(session.id);const report=buildReport(saved?.answers||{},language);
   if(req.path.endsWith('.pdf')){const pdf=await renderPDF(report);res.set('Content-Disposition',`attachment; filename="NextGen_Readiness_Report_${language.toUpperCase()}.pdf"`);res.type('application/pdf').send(Buffer.from(pdf.bytes));}
   else res.json(report);
  }catch(error){if(['incomplete','invalid_responses'].includes(error.message))return res.status(409).json({error:'review_incomplete'});console.error('Report generation failed',error.message);res.status(500).json({error:'report_unavailable'});}
 };
 app.get('/api/report',generate);app.get('/api/report.pdf',generate);
 app.get('/report-assets/cover.jpg',(req,res)=>res.set('Cache-Control','public, max-age=86400').type('image/jpeg').send(coverImage()));
}
