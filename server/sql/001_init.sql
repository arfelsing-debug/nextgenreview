CREATE TABLE IF NOT EXISTS nrr_invitations (
 id text PRIMARY KEY, token_hash text UNIQUE NOT NULL, language text NOT NULL CHECK(language IN ('en','cs')),
 expires_at timestamptz NOT NULL, login_limit integer, login_count integer NOT NULL DEFAULT 0,
 status text NOT NULL DEFAULT 'active' CHECK(status IN ('active','expired','revoked')),
 label text, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS nrr_sessions (
 id text PRIMARY KEY, invitation_id text NOT NULL REFERENCES nrr_invitations(id) ON DELETE CASCADE,
 language text NOT NULL CHECK(language IN ('en','cs')), expires_at timestamptz NOT NULL,
 completed boolean NOT NULL DEFAULT false, csrf_hash text NOT NULL, created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS nrr_responses (
 session_id text PRIMARY KEY REFERENCES nrr_sessions(id) ON DELETE CASCADE,
 answers jsonb NOT NULL DEFAULT '{}'::jsonb, updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS nrr_invitation_token_hash_idx ON nrr_invitations(token_hash);
CREATE INDEX IF NOT EXISTS nrr_session_invitation_idx ON nrr_sessions(invitation_id);
