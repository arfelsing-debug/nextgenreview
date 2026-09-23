ALTER TABLE nrr_invitations DROP CONSTRAINT IF EXISTS nrr_invitations_language_check;
ALTER TABLE nrr_invitations ADD CONSTRAINT nrr_invitations_language_check CHECK (language IN ('en','cs','de'));
ALTER TABLE nrr_sessions DROP CONSTRAINT IF EXISTS nrr_sessions_language_check;
ALTER TABLE nrr_sessions ADD CONSTRAINT nrr_sessions_language_check CHECK (language IN ('en','cs','de'));
