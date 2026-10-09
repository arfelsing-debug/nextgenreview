import test from 'node:test';
import assert from 'node:assert/strict';
import {renderCompass,withCompass,COMPASS_VERSION} from '../reports/compass/render.js';
for(const language of ['en','cs','de'])test('NextGen uses canonical Compass '+language,async()=>{
 const labels={en:['Identity & Purpose','Family Enterprise','Ownership & Wealth','Governance','Capability','Responsibility'],cs:['Identita a účel','Rodinný podnik','Vlastnictví a majetek','Správa','Schopnosti','Odpovědnost'],de:['Identität und Zweck','Familienunternehmen','Eigentum und Vermögen','Governance','Fähigkeiten','Verantwortung']}[language];const d=labels.map((name,i)=>({name,level:[1,2,3,null,2,1][i],status:['exposed','developing','established','unclear','developing','exposed'][i]}));const c=await renderCompass(d);assert.ok(c.png.length>10000);assert.equal(c.version,COMPASS_VERSION);assert.equal((await withCompass({pages:[{number:3,dimensions:d}]})).compass.sha256,c.sha256);
});
