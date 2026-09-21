import{randomToken,sha256,safeEqualHex}from"./security.js";
export function issueCsrf(){const token=randomToken(24);return{token,hash:sha256(token)}}
export function verifyCsrf(session,token){return Boolean(session&&token&&safeEqualHex(session.csrfHash,sha256(String(token))))}
