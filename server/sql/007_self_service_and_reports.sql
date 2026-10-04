ALTER TABLE nrr_invitations ADD COLUMN IF NOT EXISTS email text;
ALTER TABLE nrr_invitations ADD COLUMN IF NOT EXISTS full_name text;
ALTER TABLE nrr_invitations ADD COLUMN IF NOT EXISTS access_ip_hash text;
ALTER TABLE nrr_sessions ADD COLUMN IF NOT EXISTS ip_hash text;

CREATE TABLE IF NOT EXISTS nrr_reports (
 id text PRIMARY KEY,
 session_id text UNIQUE NOT NULL REFERENCES nrr_sessions(id) ON DELETE RESTRICT,
 invitation_id text NOT NULL REFERENCES nrr_invitations(id) ON DELETE RESTRICT,
 full_name text NOT NULL,
 email text NOT NULL,
 language text NOT NULL CHECK(language IN ('en','cs','de')),
 report_json jsonb NOT NULL,
 pdf_bytes bytea NOT NULL,
 pdf_sha256 text NOT NULL,
 report_version text NOT NULL,
 generated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS nrr_reports_email_idx ON nrr_reports(lower(email));
CREATE INDEX IF NOT EXISTS nrr_reports_generated_idx ON nrr_reports(generated_at DESC);
