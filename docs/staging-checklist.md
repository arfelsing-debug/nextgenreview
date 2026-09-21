# Staging Gate

Before issuing any real invitation:

- DATABASE_URL points to a dedicated NextGen staging database.
- Run `npm run migrate` from /server.
- NEXTGEN_ADMIN_KEY is generated randomly and stored only in the deployment secret manager.
- HTTPS is enforced.
- Front end and API share the intended origin so secure session cookies work.
- No real family or client data is used during staging.
- Create one EN invitation and one CZ invitation with short expiry and finite login counts.
- Verify invalid, expired and exhausted tokens fail.
- Verify refresh restores saved responses.
- Verify all 48 response values persist correctly.
- Verify completion fails at 47 responses and succeeds at 48.
- Verify CSRF failure blocks writes.
- Verify revocation blocks subsequent redemption.
- Verify report output contains no token/session identifiers.
- Verify server logs contain no invitation token or response payload.
- Complete English and Czech visual QA against the Family Continuity Review.
