import React,{useEffect,useState} from 'react';
const COPY={
 en:{heading:'Preparing your personal results',line:'Your responses are being evaluated and your confidential report is being prepared.',wait:'Elapsed',ready:'Finalising the report…'},
 cs:{heading:'Připravujeme vaše osobní výsledky',line:'Vyhodnocujeme vaše odpovědi a připravujeme důvěrnou zprávu.',wait:'Uplynulý čas',ready:'Dokončujeme zprávu…'},
 de:{heading:'Ihre persönlichen Ergebnisse werden vorbereitet',line:'Ihre Antworten werden ausgewertet und Ihr vertraulicher Bericht wird erstellt.',wait:'Vergangene Zeit',ready:'Bericht wird fertiggestellt…'}
};
export function ResultProcessing({language='en',startedAt}) {
 const [elapsed,setElapsed]=useState(0);
 useEffect(()=>{const tick=()=>setElapsed(Math.max(0,Date.now()-startedAt));tick();const timer=setInterval(tick,100);return()=>clearInterval(timer)},[startedAt]);
 const t=COPY[language]||COPY.en;
 const seconds=Math.floor(elapsed/1000),display=String(Math.floor(seconds/60)).padStart(2,'0')+':'+String(seconds%60).padStart(2,'0');
 const progress=Math.min(95,Math.floor(elapsed/100));
 return <main className="acr-stage" lang={language} role="status" aria-live="polite" style={{textAlign:'center',padding:'60px 28px'}}>
  <h1>{t.heading}</h1><p>{elapsed>=10000?t.ready:t.line}</p>
  <div role="progressbar" aria-label={t.heading} aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress} style={{height:10,maxWidth:480,margin:'24px auto',background:'#e3dfd1',borderRadius:20,overflow:'hidden'}}><div style={{width:progress+'%',height:'100%',background:'#769274',transition:'width .1s'}} /></div>
  <p style={{fontVariantNumeric:'tabular-nums'}}>{t.wait}: <strong>{display}</strong></p>
 </main>;
}
