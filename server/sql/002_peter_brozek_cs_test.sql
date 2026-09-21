INSERT INTO nrr_invitations(id,token_hash,language,expires_at,login_limit,login_count,status,label,created_at)
VALUES('test-peter-brozek-cs-20260921','6b0137aa9b13a262ba120b007d4edb31a09ea20a93f6c2f07b6e1837ca78fb13','cs','2026-09-28T18:58:00Z',NULL,0,'active','Peter Brozek Czech staging test',now())
ON CONFLICT (id) DO NOTHING;
