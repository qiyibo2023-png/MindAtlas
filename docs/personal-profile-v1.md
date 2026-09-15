# Personal Profile v1

Internal version: `personal-profile-v1.0.0`. Review status: **unreviewed**.
This is an engineering prototype, not clinical validation, legal approval or a compliance certification.

## Architecture and ownership

`src/profile/registry.js` is the centralized field registry. `store.js` owns an independent, private Map behind the governed ProfileStore interface. `summaries.js` copies bounded outcomes from existing assessment engines; it does not score, diagnose or change their rules. `adapters.js` supplies a structured evidence boundary. `ui.js` provides user controls; all copy uses the central i18n catalog.

The actual adapter is **governed_memory**, with lifetime **runtime_until_reload**. No personal data is written to a browser database, cookie, URL, account, server or cloud. A new page runtime starts empty. Refresh and closing the page clear Profile data. It is not persistent storage or an account, and it does not synchronize across devices.

`src/privacy/profile-contract.js` extends the existing PrivacyGovernance contract for the narrow purpose `user_controlled_profile` in memory. It uses existing `profileStorage` consent. The existing persistent-storage prohibition, future persistence contract and separate-purpose consent remain in force. The inventory includes `profileItems`; the retention contract specifies individual deletion, Clear Profile or reload. Unknown contracts, fields, values, purposes or targets fail closed.

## Registry and item model

| Field ID | Purpose | Permitted content |
|---|---|---|
| language | Preference | English / Simplified Chinese preference, without changing active presentation |
| goal | User goals | Understanding, preparing for support, learning about coping |
| lifeStage | Optional context | Student, working, retired, other, unknown |
| childhoodAttention | Developmental context | User-confirmed attention, activity or impulse-control difficulties before age 12; yes/no/unknown |
| pastPanic | History | Whether panic attacks occurred in the past; never current panic evidence |
| impact | Functional context | None, some, substantial, unknown; explicit temporality |
| professionalSupport | Support context | Yes/no/unknown; no clinician identity or treatment narrative |
| assessment | Assessment history | Domain, module version, assessment revision and bounded existing result outcomes |

Each registry definition includes category, data class, purpose, permitted sources, consent, persistence, export, editing, deletion, longitudinal eligibility and display key. All items are conservatively classified HIGHLY_SENSITIVE_HEALTH. Persistence and longitudinal use are disabled.

Items carry stable ID, field ID, value, source type/reference, confirmation flag, creation/update sequence, class, purpose, consent scope, retention, version and temporality. Creation/update markers are **runtime sequence numbers, not calendar dates**. The UI labels them accordingly. Assessment source references retain module and revision; they are meaningful within this runtime only.

User-confirmed context and structured assessment results are distinct. Saving an assessment does not mark its clinical interpretation as a user-confirmed fact. System-inference writes and arbitrary provenance supplied by callers are rejected. Assessment records are historical and immutable; editable context preserves its item ID and creation marker. Different conflicting historical reports are retained, but excluded from reuse until resolved by the user. The user may delete obsolete items.

## Save, consent and history

Completing any of the seven assessments does not create an item. An optional Save to Profile action opens a minimized preview. Not now dismisses the offer or preview without saving. Consent alone does not save. Confirm save is a separate action. Unasked, denied and withdrawn consent block writes. An assessment preview becomes invalid if its source revision changes or acute Safety interrupts.

The preview includes the domain, existing outcome, source and historical/current context. No questionnaire transcript, original description, Safety history, Differential graph or Adaptive answer history is copied. Outcome codes come from the source engine and are presented with its existing bilingual labels; no diagnostic probability is manufactured. Repeated identical saves return the existing item.

Withdrawal blocks subsequent writes and Profile evidence reuse. Existing items remain viewable, deletable and exportable by the user until cleared or refreshed. There is no claim of backend erasure. Context edits require consent. Individual deletion removes the item from the actual Map; Clear Profile clears that Map after confirmation.

Clear current session resets the existing assessment/engine stores and revokes consent, but retains Profile items under separate ownership. Pending save/export previews and dismissals are cleared. Clear Profile does not reset current assessment answers. Reload clears both. Downloaded files remain under user control.

## Evidence integration

Only explicitly confirmed developmental context is eligible for reuse. The adapter returns item ID, data class, source provenance and historical temporality alongside a valid shared Differential observation. Unknown, conflicting or unconsented context is excluded. Current structured answers, including unfinished explicit ADHD responses, suppress corresponding historical contributions. Historical panic, goals and saved result/route labels are not current clinical evidence.

Entry Flow uses eligible concepts only to remove genuine duplicate clarification options; its broad entry question remains unchanged. Router receives eligible historical observations through its existing structured schema, preserving historical status. Its existing normalization excludes these from current symptom ranking. The adapter never turns old route labels into evidence, and Safety remains first.

Differential v2 receives only validated observations through its assessment adapter, not arbitrary Profile UI state. Adaptive uses that same collection boundary and can avoid repeating a known developmental-onset question. Distinct questions, such as the relationship between onset and trauma, are not assumed answered. No routing ranks, diagnostic criteria, Safety thresholds or question budgets were changed.

## Export, privacy and accessibility

Export is selected-item-only and requires a visible sensitive-data warning and preview before download. Editing or deletion invalidates a prior export preview. The downloaded JSON contains the selected structured items and their metadata, not current unsaved state. The human-readable preview is bilingual; stable JSON field IDs do not change with language. No automatic email, clinician sharing, share links, AI context injection or telemetry is implemented. Profile operations emit no value logs; existing safeLog sanitization is tested. No Profile values enter URLs or titles.

Privacy Center explains actual in-memory behavior, withdrawal, deletion and future persistence boundaries. Language switching preserves items, IDs, consent, previews, edit choices and export selection. Semantic headings, labelled selects, list items, native buttons/checkboxes, 44px controls and visible focus support keyboard and mobile use.

## Validation

- Complete canonical suite: **1,275 PASS checks across 32 suites** (1,221 prior checks plus 54 Profile checks). This count includes the static assembly check, not 1,275 independent clinical scenarios.
- Profile deterministic scenario suite: 16 localized synthetic scenarios. All eight failure metrics are zero: automatic save, unauthorized save, raw-text persistence, Safety auto-profile, duplicate items, failed deletion, language-switch duplication, policy bypass.
- Router Benchmark: 226/226 primary, clarification, unsupported and status; top-two 88/88; Safety 14/14; bilingual 113/113; false positives 0/92.
- Differential Benchmark: 264/264 primary, acceptable direction and Safety; co-occurrence 114/114; contradictions 28/28; bilingual 132/132.
- Adaptive Benchmark: next/stop 314/314; top-two 296/296; duplicate avoidance 550/550; updates 234/234; Safety 38/38; bilingual 183/183.
- Entry Flow scenario suite: 29 bilingual pairs; all pass, zero restart/dead-end/duplicate/repeated-Safety failures.
- Translation completeness: 2,496 complete bilingual keys. Source-independent rebuild: 128 runtime files, exact byte parity.
- Browser: Chinese/English empty state, denied save, explicit save, Not now, editing, withdrawal, selected export preview, language preservation, clear-session vs clear-Profile, individual deletion, refresh loss, real Mood result save and acute interruption checked. Keyboard focus and activation checked. 390×844 and 1280×900 layouts show no horizontal overflow. A test-fixture step-index error was corrected; it required no assessment implementation change.

These tests are engineering evidence, not a privacy/security or clinical certification. The Profile context interpretation, governance contract and clinical reuse boundary require independent clinical/privacy/security review before production. Exported files are not encrypted or remotely revocable. The registry is deliberately small and structured; it does not support arbitrary narratives, medications, exact identity, diagnoses entered as facts, or account persistence.

## Future boundary

Longitudinal Tracking is a separate milestone. Profile v1 does not compare scores, construct trajectories, infer improvement/deterioration, schedule reassessment or collect research data. A future implementation requires a separately reviewed purpose, consent, temporal model and storage policy. The present `longitudinalEligible: false` contract must not be treated as approval for future tracking.

## Local checkpoint scope

Intended changes: Profile source, Privacy integration/inventory, app assembly and i18n, tests/scenario runner and this documentation. Generated `dist/`, ignored `work/` logs and fixture server, old archives, backups, credentials and environment files are excluded. Test fixture text is synthetic. The milestone is local only: `feat: add personal profile v1`; no push or tag.
