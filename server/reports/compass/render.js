import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
sharp.concurrency(1);sharp.cache(false);
import fontkit from '@pdf-lib/fontkit';
import {COMPASS_VERSION,WIDTH,HEIGHT,CENTRE,PLOT_RADIUS,ZONE_RADII,COLOURS,normaliseDimensions,endpoints,contourPath,point} from './model.js';
export {COMPASS_VERSION};
const font=fontkit.create(readFileSync(new URL('./assets/EBGaramond.ttf',import.meta.url)));
const bezel=readFileSync(new URL('./assets/approved-bezel.png',import.meta.url));
const bezelHref='data:image/png;base64,'+bezel.toString('base64');
export const BEZEL_SHA256=createHash('sha256').update(bezel).digest('hex');
const BLUE='#00509f',CREAM='#fffdf4';
const hash=b=>createHash('sha256').update(b).digest('hex');
function textPath(value,x,y,size=32) {
 const run=font.layout(String(value)),scale=size/font.unitsPerEm;
 const width=run.positions.reduce((s,p)=>s+p.xAdvance,0)*scale;
 let dx=0,dy=0;
 return run.glyphs.map((g,i)=>{const p=run.positions[i];const result=`<path d="${g.path.toSVG()}" transform="translate(${(x-width/2+(dx+p.xOffset)*scale).toFixed(4)},${(y-(dy+p.yOffset)*scale).toFixed(4)}) scale(${scale},${-scale})"/>`;dx+=p.xAdvance;dy+=p.yAdvance;return result}).join('');
}
function wrapLabel(label,maxWidth=310,size=32) {
 const width=s=>font.layout(s).positions.reduce((sum,p)=>sum+p.xAdvance,0)*size/font.unitsPerEm;
 const out=[''];
 for(const w of label.split(/\s+/)){const i=out.length-1,next=out[i]?out[i]+' '+w:w;if(out[i]&&width(next)>maxWidth)out.push(w);else out[i]=next;}
 if(out.length>3||out.some(s=>width(s)>maxWidth))throw Error('compass_label_overflow');return out;
}
const labelPositions=[[703,60],[1175,245],[1175,686],[703,877],[235,670],[235,245]];
function labelMarkup(d) {
 const [x,y]=labelPositions[d.index];const lines=wrapLabel(d.label,d.index===0||d.index===3?570:d.index===1?250:320);
 const size=32,leading=34;
 const top=d.index===0||d.index===3?y:y-(lines.length-1)*leading/2;
 const bottom=top+(lines.length-1)*leading;
 const labels=lines.map((s,j)=>textPath(s,x,top+j*leading,size)).join('');
 const lightY=bottom+31,score=d.level===null?'?':d.level+'/3';
 const lights=[1,2,3].map((n,j)=>`<circle cx="${x-56+j*33}" cy="${lightY}" r="10.5" fill="${d.level===n?COLOURS[n]:'#d5d4cb'}"/>`).join('');
 return `<g fill="${BLUE}">${labels}${lights}${textPath(score,x+54,lightY+8,28)}</g>`;
}
export function compassSVG(dimensions) {
 const dims=normaliseDimensions(dimensions),tips=endpoints(dimensions),path=contourPath(dimensions);
 const {x:cx,y:cy}=CENTRE,R=PLOT_RADIUS;
 const defs=`<defs>
 <radialGradient id="result" gradientUnits="userSpaceOnUse" cx="${cx}" cy="${cy}" r="${R}">
 <stop offset="0" stop-color="#ca3027"/><stop offset=".30" stop-color="#d43427"/><stop offset=".333333" stop-color="#ed6b35"/>
 <stop offset=".48" stop-color="#e7ac29"/><stop offset=".70" stop-color="#8abb36"/><stop offset=".80" stop-color="#43a13a"/><stop offset="1" stop-color="#007f3e"/>
 </radialGradient>
 <radialGradient id="background" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffd270"/><stop offset="1" stop-color="#ffe6a0"/></radialGradient>
 <radialGradient id="redfield"><stop offset="0" stop-color="#e67560"/><stop offset="1" stop-color="#f2aa80"/></radialGradient>
 <radialGradient id="gold" cx="32%" cy="25%" r="75%"><stop offset="0" stop-color="#fff5bb"/><stop offset=".25" stop-color="#edcb68"/><stop offset=".60" stop-color="#b88b25"/><stop offset="1" stop-color="#624315"/></radialGradient>
 <radialGradient id="orb1" cx="30%" cy="25%" r="80%"><stop offset="0" stop-color="#fff5dc"/><stop offset=".25" stop-color="#ff5762"/><stop offset=".60" stop-color="#d71127"/><stop offset="1" stop-color="#730c14"/></radialGradient>
 <radialGradient id="orb2" cx="30%" cy="25%" r="80%"><stop offset="0" stop-color="#fff9c3"/><stop offset=".25" stop-color="#ffdb55"/><stop offset=".60" stop-color="#e99b00"/><stop offset="1" stop-color="#80570c"/></radialGradient>
 <radialGradient id="orb3" cx="30%" cy="25%" r="80%"><stop offset="0" stop-color="#dcffe9"/><stop offset=".25" stop-color="#2edc89"/><stop offset=".60" stop-color="#009048"/><stop offset="1" stop-color="#004626"/></radialGradient>
 </defs>`;
 const axes=Array.from({length:6},(_,i)=>{const p=point(R,i*60);return `<line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="#b39447" stroke-width="1.1"/>`}).join('');
 const guides=[1,2,3].map(l=>`<circle cx="${cx}" cy="${cy}" r="${R*ZONE_RADII[l]}" fill="none" stroke="${l===3?'#8cad6e':'#ebcf89'}" stroke-width="1.2"/>`).join('');
 const orbs=tips.map(p=>p.level===null?`<circle cx="${p.x}" cy="${p.y}" r="10" fill="#d5d4cb" stroke="#8b8b82" stroke-width="1.5"/>`:`<circle cx="${p.x}" cy="${p.y}" r="13" fill="url(#orb${p.level})" stroke="${['','#8b181e','#95620b','#005432'][p.level]}" stroke-width="1.5"/>`).join('');
 const unknown=tips.filter(p=>p.level===null).map(p=>{const outer=point(R,p.index*60);return `<line x1="${p.x}" y1="${p.y}" x2="${outer.x}" y2="${outer.y}" stroke="#8a8a81" stroke-dasharray="4 6"/>`}).join('');
 return `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${WIDTH} ${HEIGHT}" width="${WIDTH}" height="${HEIGHT}">${defs}
 <rect width="${WIDTH}" height="${HEIGHT}" fill="${CREAM}"/><rect x="17" y="17" width="${WIDTH-34}" height="${HEIGHT-34}" fill="none" stroke="#be943b" stroke-width="1.5"/>
 <image x="${cx-384}" y="${cy-384}" width="768" height="768" xlink:href="${bezelHref}"/>
 <circle cx="${cx}" cy="${cy}" r="${R}" fill="#bfdfa7"/>
 <circle cx="${cx}" cy="${cy}" r="${R*.8}" fill="url(#background)"/>
 <circle cx="${cx}" cy="${cy}" r="${R/3}" fill="url(#redfield)"/>
 <path d="${path}" fill="url(#result)" stroke="#154529" stroke-width="2" stroke-linejoin="round"/>
 ${guides}${axes}${unknown}${orbs}
 <circle cx="${cx}" cy="${cy}" r="21" fill="url(#gold)" stroke="#785510" stroke-width="1.4"/>
 <circle cx="${cx}" cy="${cy}" r="16" fill="none" stroke="#f7df89" stroke-width="1.2"/>
 <circle cx="${cx}" cy="${cy}" r="11" fill="url(#gold)" stroke="#795315" stroke-width="1"/>
 ${dims.map(labelMarkup).join('')}</svg>`;
}
const cache=new Map();
export async function renderCompass(dimensions) {
 const d=normaliseDimensions(dimensions),key=hash(JSON.stringify([COMPASS_VERSION,BEZEL_SHA256,d]));
 if(cache.has(key))return cache.get(key);
 const svg=compassSVG(dimensions),promise=sharp(Buffer.from(svg)).resize(WIDTH*2,HEIGHT*2).png({compressionLevel:9}).toBuffer().then(png=>({png,sha256:hash(png),version:COMPASS_VERSION,width:WIDTH*2,height:HEIGHT*2,dimensions:d}));
 cache.set(key,promise);
 try {const out=await promise;if(cache.size>8)cache.delete(cache.keys().next().value);return out;}catch(e){cache.delete(key);throw e;}
}
export async function withCompass(report) {
 const page=report.pages?.find(p=>p.number===3);
 if(!page)throw Error('compass_report_pages_missing');
 const out=await renderCompass(page.dimensions);
 return {...report,compass:{version:out.version,sha256:out.sha256,width:out.width,height:out.height,image:'data:image/png;base64,'+out.png.toString('base64')}};
}
