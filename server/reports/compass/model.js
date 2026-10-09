/** Adamas Review Compass: fixed category boundaries, never percentage-based radii. */
export const COMPASS_VERSION = 'adamas-compass-2026-10-08.2';
export const ZONE_RADII = Object.freeze({1: 1/3, 2: .8, 3: 1});
export const WIDTH = 1408, HEIGHT = 940;
export const CENTRE = Object.freeze({x:703,y:473});
export const PLOT_RADIUS = 263;
export const COLOURS = Object.freeze({1:'#ed1726',2:'#f1a309',3:'#009847',0:'#aaa99f'});
// Polar contour samples traced from the user-approved specimen, at 5-degree intervals.
// Reversing a pair reverses the samples. Missing pair classes interpolate the same style.
const profiles = Object.freeze({
 '11':[1/3,.29628,.26050,.23807,.22615,.21994,.21899,.21994,.22710,.23855,.26240,.29545,1/3],
 '13':[1/3,.33000,.32300,.31107,.30296,.29962,.29866,.30534,.32824,.37405,.47805,.83445,1],
 '33':[1,.92653,.76431,.69752,.66365,.64695,.64218,.64742,.66508,.69800,.76336,.92605,1],
 '23':[.8,.76288,.66508,.61927,.59351,.58111,.57729,.58302,.60162,.63884,.71374,.91031,1]
});
export function visualLevel(d) {
 if(!d || d.level === null || ['unclear','grey','unscored'].includes(d.status)) return null;
 if ([1,2,3].includes(d.level)) return d.level;
 const status={red:1,amber:2,green:3,exposed:1,developing:2,established:3}[d.status];
 if(status) return status;
 if(typeof d.percent !== 'number' || !Number.isFinite(d.percent)) return null;
 return d.percent < 50 ? 1 : d.percent < 75 ? 2 : 3;
}
export function normaliseDimensions(dimensions) {
 if(!Array.isArray(dimensions)||dimensions.length!==6) throw Error('compass_requires_six_dimensions');
 return dimensions.map((d,i)=>{
  const label=String(d.name??d.label??'').trim();
  if(!label || label.length>160) throw Error('invalid_compass_dimension_label');
  return {label,level:visualLevel(d),index:i};
 });
}
export function point(radius, degrees) {
 const a=(degrees-90)*Math.PI/180;
 return {x:CENTRE.x+Math.sin(degrees*Math.PI/180)*radius,y:CENTRE.y-Math.cos(degrees*Math.PI/180)*radius};
}
export function endpoints(dimensions) {
 return normaliseDimensions(dimensions).map((d,i)=>{
  const radius=d.level===null?null:PLOT_RADIUS*ZONE_RADII[d.level];
  return {...d,radius,...point(radius??PLOT_RADIUS*.12,i*60)};
 });
}
function pairProfile(a,b) {
 if(a===null||b===null) {
  const r1=a===null?.12:ZONE_RADII[a],r2=b===null?.12:ZONE_RADII[b],v=.065;
  return Array.from({length:13},(_,i)=>i<=6?v+(r1-v)*(.5+.5*Math.cos(Math.PI*i/6)):v+(r2-v)*(.5-.5*Math.cos(Math.PI*(i-6)/6)));
 }
 if(a>b)return pairProfile(b,a).slice().reverse();
 if(a===2&&b===2)return profiles['33'].map(x=>x*.8);
 if(a===1&&b===2)return profiles['11'].map((v,i)=>v*.3+profiles['13'][i]*.7);
 return profiles[`${a}${b}`];
}
// Shape-preserving cubic Hermite interpolation, with zero radial slope at each orb.
function sample(values,t) {
 const n=values.length-1,i=Math.min(n-1,Math.floor(t)),u=t-i;
 const slopes=values.slice(1).map((x,j)=>x-values[j]);
 const tangent=j=>j===0||j===n?0:(slopes[j-1]*slopes[j]<=0?0:2*slopes[j-1]*slopes[j]/(slopes[j-1]+slopes[j]));
 const a=values[i],b=values[i+1],m=tangent(i),k=tangent(i+1);
 return (2*u**3-3*u**2+1)*a+(u**3-2*u**2+u)*m+(-2*u**3+3*u**2)*b+(u**3-u**2)*k;
}
export function contourPoints(dimensions) {
 const dims=normaliseDimensions(dimensions),points=[];
 for(let i=0;i<6;i++) {
  const values=pairProfile(dims[i].level,dims[(i+1)%6].level);
  for(let k=0;k<120;k++)points.push(point(sample(values,k/10)*PLOT_RADIUS,i*60+k/2));
 }
 return points;
}
export function contourPath(dimensions) {
 return contourPoints(dimensions).map((p,i)=>`${i?'L':'M'}${p.x.toFixed(3)},${p.y.toFixed(3)}`).join(' ')+' Z';
}
