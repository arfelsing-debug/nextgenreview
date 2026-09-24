ALTER TABLE nrr_invitations ADD COLUMN IF NOT EXISTS created_by text;
ALTER TABLE nrr_invitations ADD COLUMN IF NOT EXISTS approved_by text;

-- Named administrators authenticate with their own key from NEXTGEN_ADMIN_KEYS.
-- Creation is intentionally self-approved, while preserving both audit fields.
