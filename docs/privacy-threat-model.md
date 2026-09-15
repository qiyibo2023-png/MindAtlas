# Privacy / data threat model

Review status: engineering_review_only. Version: privacy-data-governance-v1.0.0.
These mitigations are not legal approval or complete security assurance.

| Risk | Current mitigation | Remaining limitation | Production requirement |
|---|---|---|---|
| Clinical state logged accidentally | Enumerated safeLog values; static console sink check; forbidden-payload tests | Deliberately obfuscated code or browser tooling is outside the guard | Reviewed telemetry pipeline and independent security testing |
| Symptoms in URL or title | In-memory views, fixed title; negative URL/title tests; no-referrer | Browser extensions can observe page content | Deployment URL/referrer/access-log review |
| Future feature bypasses policy | No personal persistence adapter; source storage/network scan | Source checks are not a hostile-code sandbox | Mandatory integration review, adapter authorization and CI protection |
| Blanket consent | Separate consent IDs; no pre-granted values; isolation tests | No production consent ledger exists | Versioned purpose notices and withdrawal implementation |
| Profile reused for analytics/research | Both disabled; separate contracts/consent | Future consent alone must not enable infrastructure | Purpose-specific legal/privacy review and access controls |
| Raw text retained | Temporary draft/arguments; structured outputs; no storage sinks | Drafts, browser memory and developer tools can hold temporary copies | Lifecycle, browser-cache and incident-response review |
| Third-party script reads health context | All runtime scripts/styles are local; no tracker SDK; source guard | Hostile extensions and future deployment changes remain risks | Dependency review, CSP and supply-chain controls |
| User unintentionally shares export | Warning beside export controls; preview; explicit action; no clinician transmission | Page cannot revoke downloaded/printed/copied material | Explicit scope preview, secure delivery and recipient verification |
| Stale data after clear | All 12 owned stores reset; DOM cleared; bilingual E2E and idempotence tests | No secure erasure of browser/OS copies; download Blob URLs expire after 30 seconds | Approved persisted-data deletion and backup policies |
| Excessive future AI context | Disabled capability; request category allowlist; no all-history access | No AI service implemented or assessed | Minimum-context selection and separate vendor review |
| Privacy failure prevents Safety | Safety engine does not depend on persistence authorization | Unrelated fatal application/browser failure can still affect UI | Resilience and production emergency UX testing |
| Safety urgency causes indefinite retention | Session-only Safety signals; bounded audit; no persistence exception | Audit/fingerprints are still sensitive in memory | Purpose-based reviewed retention, never automatic indefinite storage |

No account, database, cloud synchronization, clinician transmission, research
collection, or AI component is enabled. Production requires qualified legal/privacy
review of notices, consent, retention, deletion, hosting and vendors; no compliance
certification follows from passing these engineering tests.
