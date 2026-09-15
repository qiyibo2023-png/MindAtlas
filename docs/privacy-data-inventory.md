# Current data inventory

Snapshot of src/privacy/policy.js. No actual user records are included. Exportability is policy eligibility, not an automatic export action.

| Category / example fields | Class | Source / purpose | Location / lifetime | Persisted | Exportable | Deletable by page | Analytics | Logging |
|---|---|---|---|---|---|---|---|---|
| education / topics, sources | PUBLIC | static editorial content / education | src/data.js and i18n catalog / static | true | true | false | false | false |
| capabilities / TopicCapabilities.topics | PUBLIC | product registry / technical_operation | src/capabilities/registry.js / static | true | true | false | false | false |
| uiLabels / I18n catalog | PUBLIC | static catalog / technical_operation | src/i18n/catalog.js / static | true | true | false | false | false |
| appVersion / engine.version | OPERATIONAL | static release metadata / technical_operation | engine constants / static | true | true | false | false | true |
| preferences / lang, region, category | SENSITIVE | user choices / current_session | application and module stores / session | false | false | true | false | false |
| rawText / global-description, adaptive safety textarea | HIGHLY_SENSITIVE_HEALTH | user input / current_assessment | DOM draft and temporary extraction arguments / ephemeral | false | false | true | false | false |
| assessmentAnswers / Mood.store.state, Anxiety.store.state, OCD.store.state, Trauma.store.state, ADHD.store.state, Eating.store.state, Psychosis.store.state | HIGHLY_SENSITIVE_HEALTH | structured answers / current_assessment | seven module stores / session | false | true | true | false | false |
| traumaEvidence / trauma.exposure, trauma.intrusion | HIGHLY_SENSITIVE_HEALTH | structured trauma assessment / current_assessment | Trauma store and derived evidence / session | false | true | true | false | false |
| psychosisEvidence / psychosis.perception, psychosis.insight | HIGHLY_SENSITIVE_HEALTH | structured psychosis assessment / current_assessment | Psychosis store and derived evidence / session | false | true | true | false | false |
| routerEvidence / SymptomRouter.store.profile, SymptomRouter.store.v2 | HIGHLY_SENSITIVE_HEALTH | local extraction and clarification / current_assessment | SymptomRouter store / session | false | true | true | false | false |
| differentialEvidence / Differential.store, DifferentialV2.store | HIGHLY_SENSITIVE_HEALTH | assessment and Router adapters / current_assessment | comparison stores and cached fingerprints / session | false | true | true | false | false |
| adaptiveEvidence / Adaptive.store.session, Adaptive.store.retainedEvidence | HIGHLY_SENSITIVE_HEALTH | clarification answers / current_assessment | Adaptive store / session | false | true | true | false | false |
| assessmentResults / module.store.result | HIGHLY_SENSITIVE_HEALTH | local assessment engines / current_assessment | module result caches / session | false | true | true | false | false |
| clinicianSummary / summary-text, a-summary-text, module.summary | HIGHLY_SENSITIVE_HEALTH | structured current-session evidence / user_requested_export | generated strings and readonly DOM textareas / session | false | true | true | false | false |
| safetySignals / GlobalSafety.store.signals, suicide.intent, medical.lossOfConsciousness | SAFETY_CRITICAL | local Safety extraction and structured adapters / safety_processing | Safety store and module answers / session | false | true | true | false | false |
| safetyAudit / GlobalSafety.store.audit, lastAudit | SAFETY_CRITICAL | Safety evaluation / safety_processing | bounded memory audit and fingerprint / session | false | false | true | false | false |
| consentChoices / PrivacyGovernance.consentState | SENSITIVE | future-purpose consent contract / consent_management | governance memory; no collection UI enabled / session | false | false | true | false | false |
| deletionStatus / PrivacyGovernance.deletionState | OPERATIONAL | user-requested clear action / technical_operation | governance memory; status only / session | false | false | true | false | false |
| userExport / downloaded summary, printout, clipboard copy | HIGHLY_SENSITIVE_HEALTH | explicit user export / user_requested_export | user-managed file, print or clipboard outside application / user_controlled | true | true | false | false | false |
