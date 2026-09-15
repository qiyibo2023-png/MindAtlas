# Privacy Center claim verification

Version: privacy-data-governance-v1.0.0. Status: engineering_review_only.
All claims below describe the current source, not future hosting or legal compliance.

| Claim / central i18n key | Implementation evidence | Verification |
|---|---|---|
| Current product explanation, not legal advice / privacy.current | Central paired copy; no compliance label | Privacy Center bilingual and no-compliance tests |
| No accounts or long-term profile / privacy.current, privacy.future | No enabled persistence adapter; future fields separate from current inventory | Storage guard, future capability rejection tests |
| Current structured evidence stays in page memory / privacy.session | Twelve module/reasoning stores; no browser-storage sinks | Inventory snapshot, all-store deletion and E2E tests |
| Drafts temporarily remain; submission extracts locally / privacy.raw | Safety and Router submit functions accept raw arguments; extraction returns structured profiles; DOM redraw draft snapshot | Source audit and synthetic summary excludes original sentence |
| Locale switching preserves draft / privacy.raw | I18n.captureView/restoreView and Safety captureUI/restoreUI | Existing bilingual tests; browser and state-preservation tests |
| No code uploading answers / privacy.limits | No fetch/XHR/socket/beacon or remote model/analytics SDK; no external runtime script | Static network/third-party guard; full source assembly audit |
| No answers in browser storage or URL / privacy.limits | In-memory view; fixed catalog title; no storage/history sinks | Negative path/query/fragment/title tests and source checks |
| Sensitive summaries / privacy.exportWarning | Warning next to Mood/Anxiety export buttons and on summary views | Export wrapper tests and browser fixtures |
| No automatic clinician transmission / privacy.exportScope | Download Blob / browser print only; handoffDecision always denies transmission | Handoff contract and no-network tests |
| Current session clear / privacy.clearScope | privacy/runtime resets seven modules and five shared stores; UI clears drafts/dialog | E2E Router→assessment→Differential→Adaptive→summary→clear in both locales |
| Files and device copies remain outside page control / privacy.limits, privacy.exportWarning | deleteData explicitly reports downloadedFilesDeleted:false | External/nonexistent target rejection tests |
| Profiles/longitudinal not enabled; consent separate / privacy.future | Disabled future contracts and independent consent IDs | Profile/longitudinal/analytics/research isolation tests |

## Network and third-party audit

Runtime script origins: local relative assets only. Stylesheets: local relative
assets only. Favicon: inline data SVG. Fonts use a CSS font-family stack without
a remote font request. No third-party runtime script, tracking pixel, telemetry
SDK, remote model call, analytics request or production API exists in this source.
Public reference anchors include WHO, NICE and NIMH websites; opening one is a
user navigation to that site, without appended clinical data. A no-referrer meta
policy prevents page URL referrers. External-site behavior is outside this audit.

The local static server sends Cache-Control: no-store and does not log health
payloads. It serves static files and contains no clinical request endpoint.
No application service worker, IndexedDB, cookie or browser-storage use was found.
Browser extensions, history/BFCache, developer tools, OS memory, clipboard,
downloads and print spooling remain outside application erasure guarantees.

## Flow audit

The architecture document's flow table covers input, extraction, structured
evidence, Safety, Router, assessment, Differential, Adaptive and export. All
clinical stages are analytics-ineligible and logging-ineligible. The only
clinical audit records are bounded, in-memory Safety rule/action/version/time
events, still classified Safety critical. Input is raw and ephemeral; downstream
evidence is structured and current-session scoped. Summary output is generated
text from that structured evidence and remains sensitive. Only explicit user
exports leave the page to user-managed files, print or clipboard; no cloud
transmission is implemented.
