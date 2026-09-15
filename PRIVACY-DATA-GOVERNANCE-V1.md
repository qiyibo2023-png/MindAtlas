# Privacy & Data Governance v1 — implementation and audit

Internal version: `privacy-data-governance-v1.0.0`.
Branch: `feature/privacy-data-governance-v1`.
Baseline main: `a30f3c8cddb04ca0cdde8b55a30e1a8258117ae6`.

Status: engineering implementation complete against sections 1–91. No production accounts, profile, tracking, database, cloud synchronization, analytics, research collection, or AI agents have been introduced. All governance policies require qualified legal/privacy review before production.

## Enforced boundaries

`src/privacy/policy.js` owns classifications, inventory, purpose-specific consent,
retention, persistence, export eligibility, log sanitization, and future contracts.
`canPersist` requires a registered category, matching class, explicit allowed
purpose and approved target. Only static public/operational assets qualify.
Unknown input, exceptions, invalid consent and every personal persistent target
are denied. `persist` has no enabled adapter and always denies. Consent alone
never enables persistence, even if granted for profile storage or tracking.

Consent purposes are independent: profileStorage, longitudinalTracking,
clinicianExport, optionalAnalytics, research, modelTraining, marketing. Defaults
are not_asked, with explicit granted/denied/withdrawn transitions. These are
future contract states in memory, not an operational consent collection UI or
legal consent record. Withdrawal never grants another purpose. Any future backend
must add reviewed capabilities, retention, deletion and storage adapters before
the policy can permit health persistence.

`safeLog` does not write to a console, file or network. It returns only fixed
event IDs and enumerated operational values. Unknown events return null;
unapproved fields and unapproved values under otherwise allowed keys are omitted.
There is no diagnostic-content logging sink. All analytics are disabled,
including after optionalAnalytics consent. Research has a separate disabled
contract. Future AI context must be minimum necessary, without all-history access.

`scripts/validate-privacy.cjs` scans deployed source for browser storage,
network/API payload sinks, console logging, history/query/fragment writes and
tracking markup. It is exercised by the complete regression suite, including
negative developer-misuse examples. This is an accidental-misuse guard, not a
sandbox against malicious JavaScript or hostile browser extensions. Future
approved integrations require explicit review of both policy and enforcement
tests, rather than bypassing the check.

## Data inventory and storage audit

The authoritative machine-readable inventory is `PrivacyGovernance.inventory`
in the source policy. Its documentation snapshot and complete tabular inventory
are in `docs/privacy-data-inventory.json` and `docs/privacy-data-inventory.md`.

Audit of current source:

| Surface | Finding |
|---|---|
| localStorage / sessionStorage | No application use |
| IndexedDB | No application use |
| Cookies | No application read/write |
| URL path, query, fragment | Clinical routes use the in-memory `view`; no health URL writes |
| Document title | Fixed bilingual catalog title, no answers or symptoms |
| Network upload / analytics | No fetch, XHR, socket or beacon data sink |
| Static assets | Served from canonical generated dist; no external script/font loader |
| Cache | Local server sets Cache-Control: no-store; no service worker/application cache API |
| External evidence links | Public reference URLs; no health parameters. Added no-referrer policy |
| Logs | No production console logging of assessment state |
| Downloads | Mood/Anxiety create user-initiated local text-file Blob downloads |
| Printing | Mood/Anxiety call browser print after a user action |
| Copy | Readonly summary selection/manual copying; no automatic clipboard upload |

Browser/OS caches, extensions, clipboard history, screenshots, user downloads,
print spooling, developer tools and external websites are outside page controls.
This is not a claim of anonymous operation, secure memory erasure, or deletion
from a backend that does not exist. Local static server access is not a health
payload channel; deployment-level logging still needs separate production review.

## Flow and lifetime

| Boundary | Class | Retention | Logging / export |
|---|---|---|---|
| Input DOM draft → local extraction | Highly sensitive health | Temporary DOM and call arguments; draft survives locale redraw | No logging or raw-text export |
| Extraction → structured evidence | Highly sensitive health | Current page memory | No analytics/logging; summary scope only |
| Input / module adapters → Safety | Safety critical | Current page memory | Minimal bounded audit; no automatic export |
| Safety → Router | Safety critical + health evidence | Memory; Safety first | No payload logging or URL transport |
| Router → assessment | Highly sensitive health | Seven module stores | User-visible structured answers |
| Assessment → Differential | Highly sensitive health | Evidence, caches and fingerprints in memory | Scoped summary may include enabled comparison |
| Differential → Adaptive | Highly sensitive health | Current reasoning session and retained structured evidence in memory | No longitudinal database |
| Summary → user file/print/copy | Highly sensitive health, possibly Safety | User-controlled outside webpage after export | Explicit user action and warning; no automatic clinician transmission |

Raw text is processed locally and not saved into a long-term narrative store.
Unsubmitted text remains in its input; temporary redraw snapshots preserve it
through language switching. Extractors return structured observations rather than
retaining source sentences. Structured evidence is still sensitive. Existing
synthetic benchmark text is authored test material, not collected user narratives.

## Retention and deletion

Retention modes currently used are static, ephemeral, session and user_controlled.
No fixed legal period is invented. Future production health retention requires
legal/privacy review; no claim is made about jurisdiction-specific compliance.

`src/privacy/runtime.js` captures empty startup stores and resets all seven
modules plus GlobalSafety, SymptomRouter, Differential, DifferentialV2 and
Adaptive for an explicit current_session/user_requested_deletion/memory request.
This includes result caches, fingerprints, Safety audit, Adaptive retained evidence
and future consent choices. Unsupported account/cloud scopes fail explicitly.
UI clearing also clears editable DOM controls, closes/removes topic dialog content,
and resets search/category. Locale remains as presentation preference; region
returns to the startup default. Unknown answers are not changed into negative
clinical answers by deletion; the session restarts empty.

Downloaded files, clipboard contents and printouts cannot be erased by the page.
Existing download handlers revoke Blob URLs after 30 seconds; a pending download
and browser-owned buffers are not secure-erasure targets. Clearing drops owned
session references, not every possible browser/OS copy. UI reports failure if a
local clear cannot finish and recommends reload. Necessary in-memory Safety
evaluation never calls persistence or consent gates.

## Export integration

The existing module implementations remain byte-identical. At application bind
time, the governance UI wraps Mood/Anxiety download/print buttons with the shared
export policy and places the sensitive-content warning beside their controls.
The contract requires explicit initiation, current-summary scope, available
preview and warning; it rejects raw narrative, unknown categories and cloud
targets. Existing readonly summary previews remain available. Current exports
may include Safety and enabled Differential content, stated in the warning.
Nothing automatically shares a file with a clinician. Direct browser print or
manual copy remains a user/browser action outside programmatic export controls.

## Privacy center and validation

A bilingual Privacy & Data footer entry opens the lightweight center. It explains
current memory processing, raw drafts, export sensitivity, unsupported future
profiles and practical browser limitations. Clearing uses an expandable explanation
and explicit action, with no preselected persistence consent. In an acute state,
the emergency panel remains first and ordinary assessment navigation stays hidden;
privacy controls remain accessible below it.

Validation: 1,075 tests passed (969 prior + 106 privacy tests). The new suite
covers classification, conservative unknowns, persistent denial, consent isolation
and withdrawal, retention, logging redaction, analytics denial, URL boundaries,
export guards, deletion of all stores, bilingual preservation and Safety operation
during policy failure. The Router, Differential and Adaptive benchmarks reran
without metric changes. The catalog has 2,368 complete paired keys. Source-only
rebuild reproduced 117 runtime files byte-for-byte.

Browser checks include Chinese/English privacy pages, 390×844 wrapping and touch
targets, keyboard clearing, synthetic Mood/Anxiety export warnings, and an acute
medical panel with privacy controls below it. Synthetic browser fixtures are in
tests only, not deployed source. No new browser console errors were observed.
This is focused validation, not comprehensive legal review or assistive-technology
certification. The local Git checkpoint follows successful full regression, benchmark, source rebuild and privacy-claim review.

The executable future contract validators and 12 governance rules are in src/privacy/contracts.js. Proposed Profile and Longitudinal fields are separate from the current inventory and all persistence remains disabled. See [claim audit](docs/privacy-claim-audit.md), [threat model](docs/privacy-threat-model.md), and [rule catalog](docs/privacy-governance-rules.json).
