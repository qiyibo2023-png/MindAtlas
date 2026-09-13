# PTSD / Trauma Assessment v1

Version: `ptsd-trauma-assessment-v1.0.0`. Review status: **unreviewed**. This is an adult self-assessment educational prototype, not a diagnostic instrument or a clinically validated application.

## Architecture and assessment contract

`src/trauma/data.js` defines stable field IDs and references the central bilingual catalog. `engine.js` owns revisioned in-memory state, conditional questions, symptom counts and explanation facts. `ui.js` uses shared field rendering and state-preserving language presentation. `integration.js` registers normalized evidence with the existing Differential engine and merges safety facts into the existing Safety engine. `router.js` registers the fourth assessment domain and bounded bilingual text features. `types.d.ts` documents the output shape.

Workflow: consent/adult self-assessment → four short shared-safety question groups → exposure → intrusion → avoidance → negative cognition/mood → arousal → course/distress → impairment → dissociation → medical/substance factors → contextual comparisons → result and optional summary. Unknown/prefer-not-to-answer is supported. Declined consent or nonadult use cannot advance. Close-person exposure detail is conditional on that mode. Event category, timing and intimacy impact are optional. Pause preserves memory state; module clear resets its answers. Global reset clears all assessments.

No event narrative field exists. Event category and timing are coarse. No answers are sent to analytics, persisted in storage or logged. The original Router entry accepts optional descriptions under its existing privacy contract; this extension retains only structured flags and provenance, never excerpts.

## Clinical modeling and limits

Exposure is separate from symptom clusters. The self-report threshold concerns death/threatened death, serious injury or sexual violence; direct, in-person witnessed and repeated occupational modes can support exposure. Close-person context requires serious injury, sexual violence, or the violent/accidental qualifier for death/threatened death. Nonoccupational media does not support exposure. Major stressor category conflicting with a positive threshold becomes unknown. Bereavement and major stressors do not automatically establish PTSD. Professional exposure assessment remains necessary; a broad event category alone is insufficient.

Intrusion asks event linkage plus five original frequency questions (memories, nightmares, reliving, emotional and physical reminder responses). Avoidance asks internal and external event-reminder avoidance. Negative cognition/mood asks seven original constructs: beliefs, blame, painful emotions, interest, detachment, positive emotion and memory gaps. Arousal asks six constructs: vigilance, startle, anger, sleep, concentration and reckless behavior. Each uses recent/past-month frequency; presence is separated from reported distress and impairment. The four cluster minimum counts are 1/1/2/2. Any nonzero frequency counts as reported presence; **these thresholds and wording are not validated PCL-5 scoring or clinical severity estimates**.

`TRAUMA_CLUSTER_PATTERN_001` requires exposure, event-linked cluster support, symptoms persisting over one month, current/recent symptoms and meaningful distress/impairment. Medical/substance uncertainty prevents the strongest module interpretation. Very early symptoms remain recent reactions, not definitive PTSD or Acute Stress Disorder. Nonqualifying exposure takes the stressor path. Work, school, relationships, sleep, self-care, leaving home, concentration, social functioning, routines and optional intimacy are assessed independently from symptom frequency.

Self-detachment and dreamlike/unreal surroundings produce a dissociative-feature flag, not psychosis. Fixed unusual experiences outside re-experiencing or impaired reality testing produce a separate professional-assessment flag. Memory gaps can reflect sleep, mood, ordinary forgetting, substances or medical concerns; relevant unknown contributions remain unresolved. No dissociative amnesia diagnosis is made.

## Shared Safety integration

No suicide, violence, medical or substance escalation threshold was added or changed. Trauma safety answers use the existing global signal IDs. `GlobalSafety.collect` is extended to merge the fourth module's structured answers, preserving positive evidence and invalid-input failure behavior. The global guard governs the trauma view. Updating a positive safety answer immediately re-renders the safety intervention and focuses its heading. Acute states hide ordinary navigation and assessment continuation. Medical loss of consciousness, seizure, severe confusion and head injury remain medical signals; dissociation never replaces them.

Clearing Trauma alone does not erase previously shared safety facts. Users can correct safety answers or use the existing explicit global reset. Safety labels are reused where suitable and otherwise use centralized, direct bilingual questions. Shared core rule files remain byte-identical.

## Router and Differential extension

`ROUTER_TRAUMA_REEXPERIENCING_001` uses exposure language plus reliving/flashback language to support the fourth route; avoidance and alertness add contextual features. Hypothetical, denied, other-person and exclusively historical descriptions are conservatively excluded. Extraction is bounded lexical matching, not clinical understanding. Trauma mentions alone remain insufficient/contextual; ADHD, eating and psychotic domains remain unsupported. Safety still executes before Router. Existing Mood/Anxiety/OCD candidate rules remain unchanged.

`DIFF_TRAUMA_CLUSTERS_001` adds trauma to the **existing** conjunction-rule engine. Evidence retains question IDs, revision, version, unknowns and the established source-quality precedence. Router trauma flags remain weak contextual evidence. Completed current Trauma results provide exposure, clusters, duration, current symptoms, impairment and medical/substance factors; edits invalidate them. Psychotic-feature flags enter the shared unsupported-domain output. Four domains may coexist; a high questionnaire score never selects the winner.

Comparisons preserve event re-experiencing versus hypothetical OCD fears/neutralization; event avoidance versus ritualized or anxiety avoidance; reminder-linked vigilance versus generalized worry; trauma-linked guilt versus broader depressive symptoms; reminder panic versus independently supported unexpected panic. Context answers explain why another assessment may help but do not diagnose that domain. Independent Mood, Anxiety and OCD assessment results remain necessary for supported comparative patterns. No causation is inferred from co-occurrence.

All three new rule entries are **unreviewed**. Router/Differential retain their v1 engine versions and include the Trauma module version for audit where applicable. A version label is not clinical validation or a Git release tag.

## Screener decision and evidence

This implementation has **no PCL-5 total score**. `instrument` is `custom_structured_not_validated` and `score` is null. Original structured symptom counts are clearly labeled as counts. The [VA PCL-5 documentation](https://www.ptsd.va.gov/professional/assessment/adult-sr/ptsd-checklist.asp) describes the instrument and scoring; this milestone does not claim that original Chinese/English questions reproduce its validated wording, translation or administration. A future instrument integration requires exact version/translation review and separate scoring tests.

Care text is high-level education based on [NICE NG116 recommendations](https://www.nice.org.uk/guidance/ng116/chapter/recommendations): professional trauma-focused therapies and clinician medication evaluation. It does not prescribe drugs or provide unsupervised trauma-exposure exercises. The guideline does not validate MindAtlas rules.

## Regression compatibility

The prior Router test's exact assumptions of three domains and unsupported trauma were updated to four domains and supported re-experiencing, retaining exact candidate assertions. No assertions were deleted, scoring thresholds weakened, or original clinical engines modified. All 42 previous Differential tests remain unchanged and passing. A browser-discovered empty-focus restoration bug in shared i18n was fixed by resolving missing IDs to null; a regression test covers it. This is a presentation fix, not a clinical change.

Independent clinician review should examine exposure qualifiers, original bilingual wording, symptom frequency thresholds, impairment interpretation, unknown handling, dissociation, memory alternatives and all comparison rules before clinical use. This milestone does not cover children, formal diagnosis, complex PTSD, full grief/adjustment assessment or longitudinal evaluation.
