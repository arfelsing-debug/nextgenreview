import pg from "pg";const{Pool}=pg;const pool=new Pool({connectionString:process.env.DATABASE_URL,ssl:process.env.NODE_ENV==="production"?{rejectUnauthorized:false}:undefined});
export const pgstore={
 async createInvitation(v){await pool.query(`INSERT INTO nrr_invitations(id,token_hash,language,expires_at,login_limit,login_count,status,label,created_at) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9)`,[v.id,v.tokenHash,v.language,v.expiresAt,v.loginLimit,v.loginCount,v.status,v.label,v.createdAt]);return v},
 async invitationByHash(h){const{rows}=await pool.query("SELECT * FROM nrr_invitations WHERE token_hash=$1",[h]);const x=rows[0];return x?{id:x.id,tokenHash:x.token_hash,language:x.language,expiresAt:x.expires_at,loginLimit:x.login_limit,loginCount:x.login_count,status:x.status,label:x.label,createdAt:x.created_at}:null},
 async updateInvitation(v){await pool.query("UPDATE nrr_invitations SET login_count=$2,status=$3 WHERE id=$1",[v.id,v.loginCount,v.status]);return v},
 async revokeInvitation(id){const{rowCount}=await pool.query("UPDATE nrr_invitations SET status='revoked' WHERE id=$1",[id]);return rowCount>0},
 async listInvitations(){const{rows}=await pool.query("SELECT id,language,expires_at,login_limit,login_count,status,label,created_at FROM nrr_invitations ORDER BY created_at DESC LIMIT 500");return rows},
 async createSession(v){await pool.query("INSERT INTO nrr_sessions(id,invitation_id,language,expires_at,completed,csrf_hash) VALUES($1,$2,$3,$4,false,$5)",[v.id,v.invitationId,v.language,v.expiresAt,v.csrfHash]);return v},
 async session(id){const{rows}=await pool.query("SELECT * FROM nrr_sessions WHERE id=$1",[id]);const x=rows[0];return x?{id:x.id,invitationId:x.invitation_id,language:x.language,expiresAt:x.expires_at,completed:x.completed,csrfHash:x.csrf_hash}:null},
 async saveResponses(id,payload){await pool.query(`INSERT INTO nrr_responses(session_id,answers) VALUES($1,$2::jsonb) ON CONFLICT(session_id) DO UPDATE SET answers=EXCLUDED.answers,updated_at=now()`,[id,JSON.stringify(payload.answers)]);},
 async responses(id){const{rows}=await pool.query("SELECT answers,updated_at FROM nrr_responses WHERE session_id=$1",[id]);return rows[0]||null},
 async completeSession(id){await pool.query("UPDATE nrr_sessions SET completed=true WHERE id=$1",[id])}
};
