# Bilingual architecture hardening checkpoint

## 1. Canonical scope
The existing repository and `src/` remain authoritative. No historical output,
archive or alternate source tree was used for implementation. No new disorder,
Symptom Router, Adaptive Assessment or Cross-Disorder Differential Layer was added.

## 2. Files created in this pass
- `src/i18n/fallback.js`: independent bilingual translation-failure recovery.
- `scripts/preview-bilingual.cjs`: local-only actual-app browser fixture server.
- `tests/bilingual-fixture.js`: synthetic assessment/state controls for that server.
- `CHECKPOINT-BILINGUAL.md`: this review record.

## 3. Files modified in this pass
`I18N.md`, `VERSION-CONTROL.md`, `scripts/validate-i18n.cjs`, `src/app.js`,
`src/i18n/catalog.js`, `src/i18n/runtime.js`, `src/index.html`, `src/ocd/ui.js`,
`src/safety/extraction.js`, `src/shared/fields.js`, `src/style.css`,
`tests/fixtures/extraction-i18n-patch.json`,
`tests/fixtures/runtime-bilingual-v1.0.0.json`, `tests/i18n.test.cjs`.

## 4. i18n architecture and resources
One strict runtime, one central catalog, English and Simplified Chinese pairs.
The 1,215 keys use duplicate-safe entry lists. All 1,205 retained translations
are unchanged from the preceding bilingual pass; one unused error key was
removed and ten terminology keys added. The existing project needs no framework
or dependency migration. New features must reuse this runtime and namespace contract.

## 5. Completeness and missing-language behavior
Build checks reject missing locale values, key references, mismatched placeholders,
duplicate entries, orphan keys and unexpected inline UI text. Render tests check
missing/raw values and Chinese leakage in English. Translation failures surface
in development; production has readable bilingual recovery copy independent of
the failed catalog, with ordinary assessment navigation removed. Recovery never
turns a technical failure into a confirmed clinical emergency.

## 6. Terminology
The Evidence page exposes a 14-concept glossary, through stable `I18n.terms` IDs:
OCD, obsessions, compulsions, mental compulsions, intrusive thoughts, anhedonia,
functional impairment, differential diagnosis, manic episode, hypomanic episode,
suicidal ideation, self-harm, psychotic symptoms and medical emergency. Formal
Chinese terminology is centralized. Plain questions may use explanatory phrases
such as unwanted thoughts or impact on daily life instead of repeating jargon.
Proper author names, DOI/URLs and reference identifiers remain intact.

## 7. Clinical state
No duplicated Chinese/English questions, state or clinical engine. Translated
options map to the same existing answer values and IDs. Existing `suicide.intent`
is preserved rather than renamed to the illustrative ID in the specification.
Scoring and differential rules never read the presentation locale.

## 8. Verified extraction bugs
The exact supplied examples initially differed across languages. Bounded phrase
recognition now maps life-ending intent/plan, frightening family-harm images and
severe chest pain/near-fainting to equal structured safety facts. Explicit denial
and actual-intent override tests also pass. A denial of desire does not establish
a denial of intent: the latter remains unknown until clarified.

No escalation, diagnostic or scoring threshold changed. The original seven-file
hash fixture is preserved: six files match directly; extraction is reconstructed
using the exact documented ordered deltas and then matched to its original hash.
The initial and final i18n corrections affect ten original extraction lines in
total, represented by thirteen reversible replacement records.

## 9. Bilingual parity tests
39 bilingual checks pass, including the required exact statements, passive death
wish, label-to-ID mapping for Mood/Anxiety/OCD, intrusion versus intent, medical
priority, catalog failure, glossary and safe recovery. OCD checking parity uses
the existing structured questions. Free-text entry remains a safety preflight;
this pass does not introduce a general symptom-to-disorder text router.

## 10. Language-switch preservation
Tests compare complete stores/results under a fixed clock. Both directions of
switching preserve midpoint steps, answers, scores, symptom counts, functional
impact, safety facts/status/urgency/rules, route, results and object identity.
Free-text-derived elevated and acute states remain unchanged. Browser fixture
controls snapshot synthetic state around the actual app's language button.

## 11. Accessibility
Both locales have labeled controls, headings and matching error associations.
OCD progress gained an accessible label; month validation now associates its
error message. Buttons have a minimum 44px height; safety controls retain 48px.
The visible 3px keyboard focus indicator survives language redraw. Shared secondary
copy contrast was increased. Disabled controls retain their disabled presentation.
No unlabeled select, textarea or progress control was found in the browser matrix.

## 12. Responsive/browser verification
The actual application was exercised with synthetic data at 1280px desktop,
768px tablet and 390x844 mobile, in both locales. All 78 page/state combinations
and 24 expanded-summary/evidence combinations passed, without horizontal page
overflow or state changes. Tablet English header overflow was found and fixed by
wrapping navigation. Acute suicide/medical pages consistently had zero ordinary
navigation buttons and zero Continue controls. Real keyboard switching, recovery
copy and console checks passed; no new browser errors/warnings were observed.

## 13. Existing regressions
All 139 pre-existing checks pass: Mood 17, summary 2, controls 1, Anxiety 15, OCD
16, Safety 56, routing 1, Safety UX 30 and static assembly 1. With 39 bilingual
checks, the total is **178 passing checks across 10 suites**. Build validation is
an additional mandatory gate, not counted as another regression assertion.

## 14. Safety regression
All 56 safety cases, 30 safety UX checks and routing interruption assertions pass.
The original hash baseline remains passing with only the explicitly documented
extraction bug fixes allowed. No old assertion was removed to accept a regression.

## 15. Reproduction
```sh
node scripts/test-all.cjs
node scripts/verify-baseline.cjs
node scripts/preview-bilingual.cjs
```
The last command exposes synthetic fixtures at localhost:4175 for browser checks;
it is never included in `dist/`. The complete site builds from `src/` alone.

## 16. Limits and review needs
Automated functional parity is not independent clinical or linguistic validation.
Questionnaire translations, clinical thresholds and professional terminology need
qualified clinical/language review. The bounded extractor does not understand all
possible paraphrases, temporal context or complex negation. Unknown information
still uses clarification. Preserve the PHQ translation-equivalence disclosure,
prototype status, evidence limitations and local-resource review requirements.

## 17. Git checkpoint readiness
Official remote: `origin`, `https://github.com/qiyibo2023-png/MindAtlas.git`.
Existing branch: `codex/safety-engine-v1.0.0`. No reinitialization or history rewrite.
Required message: `feat: complete bilingual architecture and clinical parity`.
The repository has no commit yet. Git reports `Author identity unknown`; a name
and email must be supplied before committing. No identity was invented, no global
identity changed, no commit created and no push attempted without that identity.
Only canonical source, tests and documents are intended for staging. Generated
output, temporary reports, backups, environments, credentials and real user data
are excluded. See the external acceptance report for the exact final staged list
and current checkpoint status.
