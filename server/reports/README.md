# Respondent reports

Content release **2.0.0** powers the authenticated online report and PDF. A report contains a cover and exactly 17 numbered pages. It is generated from the current session's saved, completed 48 answers. No report file or respondent answers are exposed through a public URL or stored as an intermediate PDF.

- `GET /api/report?language=en|cs|de` returns the translated page content.
- `GET /api/report.pdf?language=en|cs|de` returns the same content as a confidential download.
- Language defaults to the authenticated session's language. Incomplete reviews return 409, absent/expired sessions return 401 and unsupported languages return 400. Responses have `private, no-store` caching.

`model.js` is the shared analytical implementation for every language. Its scores, interpretations, targeted actions, signals and priority order are checked against fixtures from the approved Python report source. `content.json` contains 24 complete subdimensions and 48 question-specific actions. `pages.json` defines the fixed page sequence, and `translations.json` includes common and variable findings. These content releases must match `release-contract.json`. Translation errors stop generation; there is no English fallback.

## Updates and additional languages

1. Update the common source content and all released language dictionaries together. Increment the version in content, translations, page templates and the release contract together.
2. For a new language, translate every common paragraph, heading, field label, subdimension record, question-specific action, variable finding and every dimension summary. Translate the variable letter and date phrases in `pages.js`, and add the browser messages and language selector. Preserve one shared analytical model.
3. Add the language to the release contract only when the complete content and UI are ready. The test loops use this contract, so the new language must pass all response-combination and PDF checks.
4. Run `cd server && npm test`, then the root `npm run build`. Validate session isolation, completion requirements and downloads in the browser. All reports must have 18 pages including the cover, no unresolved placeholders, and readable text above the notes area. Render and inspect all pages in each language, including strong, weak, mixed, unknown and not-applicable profiles.
5. If the analytical model changes, regenerate and review fixtures against the approved reporting specification. Keep common priority selection and uncertainty rules identical in every language.

Fonts and original cover artwork are bundled in `assets.json` for deterministic generation. Report generation runs in Node and requires no Python installation or PDF subprocess in production.
