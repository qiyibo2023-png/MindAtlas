# Assessment Entry Flow v1

Internal version: `assessment-entry-flow-v1.0.0`. Engineering prototype; new entry question mappings are **unreviewed**, not clinically validated. Router v2.0.1 ordering/ranks, Safety escalation rules, Differential and Adaptive clinical engines remain unchanged. Two explicit-language extraction coverage corrections are documented in the completion audit.

## Architecture and transitions

`src/entry/registry.js` contains eight small bilingual question definitions: one family selector and seven follow-ups. `runtime.js` coordinates the existing Router and live Safety engine. `ui.js` presents questions, recommendations and escape routes. Available assessment buttons come from `TopicCapabilities.assessments()`, not another capability list.

| Current event | Next state |
| --- | --- |
| Initial or intentionally replaced description | SAFETY_EVALUATION → ROUTER_EVALUATION, if permitted |
| Safety requires interaction | SAFETY_CLARIFICATION; normal entry is suspended |
| Safety acknowledgment permits resumption | Reevaluate Router using preserved profile and answers |
| Eligible Router discriminator | ROUTER_CLARIFICATION |
| Insufficient evidence with a useful unasked entry question | ENTRY_BROAD_CLARIFICATION |
| Supported sufficient or multiple routes | ROUTE_RECOMMENDATION |
| Unsupported Router status or “something else” | UNSUPPORTED_NAVIGATION |
| Uncertainty, refusal, no useful remaining question, or exhausted budget | DIRECT_ASSESSMENT_SELECTION, or available route recommendations |
| User requests knowledge or stop | STOPPED; structured evidence remains in the session |
| Explicit edit request | ENTRY_DESCRIPTION; replacement occurs on submission |

Only an explicit edit/new submission starts a new description cycle. Repeated Router evaluation never sends insufficient evidence back to the description page.

## Three-question budget

The maximum is **three answered entry questions total**, including mature Router clarifications. Going back restores the prior question, answers and profile, but does not refund consumed turns; this prevents back/answer loops. At the limit, questions and Back are replaced with route/selection/navigation options. Users can stop earlier or intentionally edit the description. Uncertainty and refusal end entry clarification with choices rather than guessing evidence or forcing a longer questionnaire.

Family selection is a preference about the concern, **not** an asserted symptom cluster or diagnosis. The follow-up adds only its explicit concepts with clarification provenance. Original denials, subject attribution, temporality and uncertainty remain in the Router profile. Known single-domain candidates skip the family selector. Explicitly fully awake perceptual experiences rule out the sleep-only clarification and do not require that same factual question again. Multiple independently supported routes retain their existing ordering and ranks.

## Safety and evidence lifetime

Every entry submission, answer, additional-text update and assessment selection consults the shared Safety engine. Rendering also checks live Safety; the stored evaluation is audit metadata, never an authorization cache. It records an evidence version, evaluation time, resolved signal paths, status and a structured fingerprint. New waking perceptual experiences use the existing hallucination Safety signal; other new urgent information uses the shared extractor. No thresholds are changed.

Ordinary routing answers do not clear Safety facts or acknowledgment. The shared fingerprint still invalidates acknowledgment for new positive evidence or escalation. Acute and failed Safety processing prevent Router extraction/continuation. Explicit Safety answers survive intentional description replacement unless new extracted information conflicts; new positive information takes priority. Additional text merges evidence, while explicit editing replaces the old extracted symptom profile.

Raw text is used as an ephemeral argument/DOM draft only. The original text is not retained for prefilling an edit; the interface explains that limitation. No answers are put in URLs, logging, analytics or persistent storage. `EntryFlow.store` is inventoried under sensitive Router evidence and included in Privacy's startup-snapshot clear-session mechanism. Clear/reset removes entry history, answers, Safety metadata and the other existing module stores. No production browser fixtures are introduced.

## Boundaries and review

No new disorder module, Router rank, Differential rule or Adaptive rule is added. Entry answers are routing evidence, not assessment scores or confirmation of a disorder. Downstream structured assessments retain their own time-frame, severity and diagnostic requirements; a broad entry preference does not prefill those answers.

Review every `entry*` question's wording and effects with clinicians, especially trauma exposure, childhood onset, eating behavior and perceptual-context wording. The fallback is deliberately small and cannot cover all presentations. Existing deterministic extraction limitations remain; unknown/unsupported concerns lead to choices and professional guidance. Engineering test success is not clinical validation.

## Validation

Run `node scripts/test-all.cjs`, all three existing benchmark scripts, `node scripts/verify-source-rebuild.cjs`, and `node scripts/validate-privacy.cjs`. `tests/entry.test.cjs` uses synthetic cases for transitions, no-loop protection, all seven paths, live Safety overrides, evidence preservation, bilingual presentation, deletion and uncertainty. Browser checks exercise the actual form/controls at 390×844 and desktop size.

The complete transition audit, scenario definitions, validation results and limitations are in [the completion report](docs/entry-flow-completion-report.md). Run `node scripts/entry-scenarios.cjs` to reproduce the separate synthetic UX metrics. The milestone is a local Git checkpoint only; no tag or remote synchronization is performed.

### Current local verification (2026-09-14)

- 1,221/1,221 automated checks: 1,075 existing checks plus 53 entry-flow checks and 93 completion/scenario checks; no existing assertions removed or weakened.
- 2,421 complete bilingual keys; privacy static-boundary validation passes.
- Source-only isolated rebuild reproduces all 121 runtime files byte for byte.
- Router benchmark: primary and clarification 226/226, top-two 88/88, Safety 14/14, bilingual 113/113, false positives 0/92; unchanged.
- Differential benchmark: primary 264/264, co-occurrence 114/114, contradictions 28/28, bilingual 132/132; unchanged.
- Adaptive benchmark: next question and stop 314/314, duplicates avoided 550/550, evidence updates 234/234, Safety 38/38, bilingual 183/183; unchanged.
- Browser: seven entry families, follow-up choices, nonacute Safety return, acute interruption with no ordinary navigation/Continue, uncertainty/refusal/other, direct assessment start, knowledge escape, Back, budget exhaustion, intentional edit, mixed Mood/OCD routes, both languages and language switching, privacy deletion, mobile and desktop checked through actual controls. Mobile width 390, content width 375; desktop width 1280, content width 1265. Entry choices are at least 48px tall; keyboard focus has a visible 3px outline. No new console errors.
- Working branch: `feature/assessment-entry-flow-v1`, based on `bb49a9caf001f1783f0aecc9678215cc2619c6e2`, matching the verified local `main` and `origin/main` references. Generated `dist/`, scratch `work/`, backups and browser session artifacts are excluded.
