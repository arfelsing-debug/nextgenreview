// Development-only in-memory adapter. Replace with Postgres before production.
const invitations=new Map(),sessions=new Map(),responses=new Map();
export const store={
 createInvitation(v){invitations.set(v.id,v);return v},
 invitationByHash(h){return [...invitations.values()].find(x=>x.tokenHash===h)||null},
 updateInvitation(v){invitations.set(v.id,v);return v},
 createSession(v){sessions.set(v.id,v);return v},
 session(id){return sessions.get(id)||null},
 saveResponses(sessionId,payload){responses.set(sessionId,{...payload,updatedAt:new Date().toISOString()})},
 responses(sessionId){return responses.get(sessionId)||null}
};
