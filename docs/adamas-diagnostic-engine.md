# Adamas Diagnostic Engine

## Common methodology

Every Adamas Review uses:

- 48 statements
- 6 dimensions
- 24 subdimensions
- language-neutral IDs
- critical-question rules
- cross-question diagnostic signals
- participant-facing classifications: Established, Developing, Exposed, Unclear
- priorities and a 12-month action plan
- confidential report output

## Review modules

1. Family Continuity Review
2. NextGen Readiness Review
3. Founder Dependency Review
4. Family Governance Review
5. Trustee Governance Review
6. Family Office Institutionalisation Review
7. Stewardship Review
8. Annual Continuity Monitoring

Annual Continuity Monitoring retains the 48/6/24 structure while adding longitudinal movement, deterioration, emerging exposure and resolved exposure.

## Localisation

The engine is multilingual. Planned locales are EN, CS, DE, PL and ES. EN is canonical. CS is active alongside EN initially; other locales remain inactive until content and professional linguistic QA are complete.

Diagnostic logic must never depend on translated strings. Each locale maps to immutable statement, dimension, subdimension, signal and action IDs.

A substantive change to canonical English content must mark every active translation of that item as requiring review before release.

## Website language metadata

Each public Review landing page should declare:
- its locale-specific HTML lang value;
- locale-appropriate Open Graph locale;
- self canonical;
- reciprocal hreflang entries for every published locale;
- x-default pointing to the canonical English landing page.

Inactive locales must not be emitted in hreflang until their corresponding public page exists.
