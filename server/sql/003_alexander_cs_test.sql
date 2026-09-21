INSERT INTO nrr_invitations(id,token_hash,language,expires_at,login_limit,login_count,status,label,created_at)
VALUES('test-alexander-cs-20260921','a79e7f2b2466d78a363e2517b0dc41a6f1108429b8f8d1c1e24c62f49d943be7','cs','2026-09-28T20:30:00Z',NULL,0,'active','Alexander Czech staging test',now())
ON CONFLICT (id) DO NOTHING;