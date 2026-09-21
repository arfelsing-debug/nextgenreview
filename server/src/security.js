import crypto from "node:crypto";
export const sha256=v=>crypto.createHash("sha256").update(v).digest("hex");
export const randomToken=(bytes=32)=>crypto.randomBytes(bytes).toString("base64url");
export function safeEqualHex(a,b){try{return crypto.timingSafeEqual(Buffer.from(a,"hex"),Buffer.from(b,"hex"))}catch{return false}}
export function sessionCookieOptions(){return{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax",path:"/",maxAge:1000*60*60*2}}
