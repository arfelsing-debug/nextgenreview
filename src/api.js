let csrfToken=null;export function invitationToken(){return new URLSearchParams(location.search).get("invite")}
async function request(path,options={}){const headers={"Content-Type":"application/json",...(options.headers||{})};if(csrfToken&&options.method&&options.method!=="GET")headers["x-csrf-token"]=csrfToken;const r=await fetch(path,{credentials:"include",...options,headers});const data=await r.json().catch(()=>({}));if(!r.ok)throw new Error(data.error||"request_failed");return data}
export async function redeem(token){const d=await request("/api/invitations/redeem",{method:"POST",body:JSON.stringify({token})});csrfToken=d.csrfToken;return d}
export async function loadSession(){return request("/api/session")}
export async function saveAnswers(answers){return request("/api/responses",{method:"PUT",body:JSON.stringify({answers})})}
export async function complete(){return request("/api/complete",{method:"POST",body:"{}"})}
