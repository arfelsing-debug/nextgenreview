# Security and Invitation Architecture

## Principle

The NextGen Readiness Review must remain entirely separate from the Family Continuity Review in code, data, invitations, reports and administration.

## Invitation model

Each invitation should use a cryptographically random opaque token and store only a hash server-side. Suggested fields:

- invitation_id
- token_hash
- language: en | cs
- expires_at
- login_limit
- login_count
- status: active | expired | revoked
- created_at
- optional internal label
- optional recipient email, stored only when operationally necessary

The public URL must never expose participant identity or scoring information.

## Session model

A valid invitation creates a short-lived server-side review session. Responses are associated with a random session ID, not placed in URLs. Session cookies should be Secure, HttpOnly and SameSite=Lax or stricter.

## Response persistence

Store language-neutral question IDs and values only:

NRR-Q01 ... NRR-Q48
values: 1–5, dk, na

Separate identity/contact information from response records. Avoid collecting identity unless required for report delivery or administration.

## Report access

Generated reports must not be publicly addressable by predictable filenames. Use authenticated/session-bound access or short-lived signed links. Report files should be treated as confidential.

## Administration

Administration should support:

- create invitation
- set language
- set expiry
- set login limit or unlimited
- revoke invitation
- view started/completed status
- view report-generation status

Do not expose questionnaire answers in routine invitation administration unless explicitly required.

## Logging and privacy

Never log raw invitation tokens, full response payloads or generated report contents. Security logs may retain invitation ID, timestamps, coarse status events and operational errors.

## Production gate

The current client-side prototype is not suitable for confidential production responses until server-side invitation validation, persistence, access control, CSRF protections, rate limiting and privacy review are implemented and tested.
