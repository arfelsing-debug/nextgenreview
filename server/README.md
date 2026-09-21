# NextGen Review server

Security-first API skeleton for invitation redemption and response persistence.

This is **not production ready**. The current store is intentionally in-memory so confidential responses cannot accidentally be treated as durable production data.

Before production:
1. replace `store.js` with encrypted Postgres persistence;
2. add CSRF protection for state-changing browser requests;
3. put the application behind HTTPS;
4. add invitation revoke/list admin endpoints with authenticated administration;
5. implement server-side report generation and protected report storage;
6. add audit/security tests and retention/deletion controls;
7. complete privacy review.

Run locally with `npm install && npm start` after configuring the environment.
