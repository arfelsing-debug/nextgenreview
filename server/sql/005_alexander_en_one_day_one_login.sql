INSERT INTO nrr_invitations (id, token_hash, language, expires_at, login_limit, login_count, status, label)
VALUES ('InQx2RCI59KRmYCV','07d334e1fdbbb63711e838bc2e2e10e87b81d4b518534f08ca7088edf54f10a1','en','2026-09-25T12:06:25.585975+02:00',1,0,'active','arf@adamasadvisors.com — 1 day / 1 login')
ON CONFLICT (id) DO NOTHING;
