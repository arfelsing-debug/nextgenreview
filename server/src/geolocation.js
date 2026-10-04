import net from 'node:net';

function requestIp(req){
  const raw=String(req.ip||req.socket?.remoteAddress||'').trim();
  return raw.startsWith('::ffff:')?raw.slice(7):raw.split('%')[0];
}

function isPublicIp(ip){
  const version=net.isIP(ip);if(!version)return false;
  if(version===4){const [a,b]=ip.split('.').map(Number);return !(a===10||a===127||a===0||a===169&&b===254||a===172&&b>=16&&b<=31||a===192&&b===168||a>=224)}
  const value=ip.toLowerCase();return value!=='::1'&&value!=='::'&&!value.startsWith('fc')&&!value.startsWith('fd')&&!value.startsWith('fe8')&&!value.startsWith('fe9')&&!value.startsWith('fea')&&!value.startsWith('feb');
}

const empty=()=>({countryCode:null,countryName:null,region:null,regionCode:null,city:null,provider:null,capturedAt:null});
const clean=value=>typeof value==='string'?(value.trim().slice(0,120)||null):null;

export async function locateIp(req){
  const ip=requestIp(req);if(!isPublicIp(ip))return empty();
  const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),2500);
  try{
    const response=await fetch(`https://ipapi.co/${encodeURIComponent(ip)}/json/`,{signal:controller.signal,headers:{'User-Agent':'Adamas-Reviews/1.0'}});
    if(!response.ok)return empty();const data=await response.json();if(data.error)return empty();
    return {countryCode:clean(data.country_code),countryName:clean(data.country_name),region:clean(data.region),regionCode:clean(data.region_code),city:clean(data.city),provider:'ipapi.co',capturedAt:new Date().toISOString()};
  }catch{return empty()}finally{clearTimeout(timeout)}
}
