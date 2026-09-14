# Symptom Router v1 rule catalog

Version: `symptom-router-v1.0.0`. All rules: **unreviewed**. This is a research/education prototype, not a validated triage instrument or diagnostic model. Routing relevance is ordinal; it is not disease probability. Rules need qualified clinical and bilingual review before clinical deployment.

| Rule ID | Domain | Trigger | Relevance | Explanation key |
| --- | --- | --- | --- | --- |
| ROUTER_OCD_INTRUSION_RITUAL_001 | OCD | Intrusive thoughts or recurrent doubt, plus at least one repetitive response | high | router.reasonOcdSpecific |
| ROUTER_OCD_REPETITION_002 | OCD | Repetitive response; isolated knife avoidance alone is insufficient | moderate | router.reasonOcdRitual |
| ROUTER_OCD_UNWANTED_003 | OCD | Intrusive thoughts and unwanted quality | moderate | router.reasonOcdThought |
| ROUTER_MOOD_COMBINATION_001 | Mood | Low mood or anhedonia plus at least two positive Mood features overall | moderate | router.reasonMood |
| ROUTER_MOOD_PERSISTENCE_002 | Mood | Low mood or anhedonia with repetition, persistent duration or functional impact | moderate | router.reasonMoodCourse |
| ROUTER_MOOD_CLUSTER_003 | Mood | Low mood or anhedonia plus at least three positive Mood features overall | high | router.reasonMood |
| ROUTER_ANXIETY_WORRY_001 | Anxiety | Broad/excessive worry pattern | moderate | router.reasonWorry |
| ROUTER_ANXIETY_PATTERN_002 | Anxiety | Panic, panic concern, situational avoidance, social evaluation fear or specific fear | moderate | router.reasonFear |
| ROUTER_ANXIETY_CLUSTER_003 | Anxiety | At least three positive Anxiety features | high | router.reasonWorry |

Repetitive responses: checking, washing/cleaning, mental rituals, reassurance seeking, neutralization, ritualized symmetry/exactness or knife avoidance. Literal word mentions of sadness, perfectionism, distress or OCD do not themselves trigger a route.

## Ordering and uncertainty

1. High relevance precedes moderate relevance.
2. Within a relevance tier, more positive domain features precede fewer.
3. An exact tie has no automatic primary route. Registration order only orders tied cards. A single broad clarification asks which concern matters most.
4. Secondary candidates remain available. A user's explicit selection changes the next assessment only, never the extracted facts, Safety state or existing module answers.
5. No candidates: ask the same broad question, with Mood, Anxiety, OCD, something else and not sure. The last two choices do not force a route. Corrupted profiles show a technical error instead.

These thresholds and tie policies are implementation choices requiring review, not empirical diagnostic cutoffs. General functional concerns and course information are retained separately. Functional impact supports the Mood persistence rule but is not an invented cross-domain diagnostic score.

## Extraction and schema contract

`src/router/types.d.ts` defines `ClinicalSymptomProfile` and `RoutingResult`; `schema.js` validates all groups and explicit `true / false / unknown` facts. Unrecognized input stays unknown. `course` holds ordinal duration/frequency/severity; no numerical duration is inferred. Context is also recorded per observation so mixed subjects and time frames are auditable without retaining excerpts.

One local bilingual phrase extractor normalizes Unicode, segments clauses, attaches subject/time/polarity, and populates the same IDs in both languages. Explicit third-person, historical and hypothetical observations do not become current self symptoms. Direct negation produces false; uncertainty stays unknown. First-person entry fragments default to self/current, an explicit product assumption. Conflicting observations resolve to unknown. Course indicators are taken only from clauses with eligible affirmed observations.

The extractor is bounded, not general language understanding: complex quotations, sarcasm, coordinated negation, pronoun resolution, numerical durations and unsupported paraphrases may be missed. No LLM/network call is used. A future extractor may implement the same `extract(text) -> validated profile` interface; deterministic rules remain authoritative.

Unsupported flags cover trauma re-experiencing, attention/hyperactivity, eating behaviors and possible psychotic symptoms. These are broad concerns, not diagnoses or new assessment modules. Supported candidates are retained only if independently supported.

## Safety boundary

`runtime.submit` always calls `GlobalSafety.submitText` first. Acute or technical Safety failure prevents symptom extraction. In nonacute states only a structured profile is held pending; routing is deferred until the existing Safety guard permits continuation. Existing guidance/acknowledgment semantics are unchanged. Unknown answers are never converted to negative answers.

Router rendering, user selection and assessment start all recheck the shared guard. Acute Safety hides ordinary navigation and routing CTAs. Intrusive thoughts/rituals can support OCD relevance but never set actual desire, intent, plan or preparation in the separate SafetySignal schema. No assessment scores are prefilled from Router output.

One required acceptance statement exposed a pre-existing Safety extraction gap: explicit first-person `I plan to kill myself tonight` did not set plan. A bounded plan-to expression was added with negation, fear, hypothetical and historical guards. Existing rules and thresholds are unchanged. Ordered reversible deltas in `extraction-i18n-patch.json` preserve the original hash comparison. A second exact acceptance expression, intrusive thoughts of stabbing, now enters harm-specific clarification without inferring intent. Ten dedicated Safety extraction checks cover these corrections.

## Privacy and lifecycle

No raw text, excerpts, browser storage, analytics, console logging or remote requests are used by Router. The entry DOM holds text while typing. Submission retains only structured facts; edit clears Router state and asks for a new description. Reload clears in-memory state. Existing module answers remain independent. Only synthetic examples are committed in tests.

## Reproduction

Run `node scripts/test-all.cjs` for build, catalog validation and all module/Safety/i18n/Router tests. Run `node scripts/verify-baseline.cjs` for the current Router release manifest. Older bilingual and source-migration manifests remain historical artifacts and are not rewritten to conceal changes.

## Symptom Router v2 unified registry

The v1 catalog above describes retained compatibility APIs. Live entry uses v2. All entries below are unreviewed; qualitative ranks order evidence, never probabilities.

| Rule | Domain | Required all | Required any | Rank | Explanation |
| --- | --- | --- | --- | --- | --- |
| V2_MOOD_CORE | mood | — | mood.depressedMood, mood.anhedonia | 1 | router.reasonMood |
| V2_MOOD_ASSOCIATED | mood | mood.depressedMood | mood.lowEnergy, mood.hopelessness, general.functionalImpact | 2 | router.reasonMood |
| V2_MOOD_COMBINATION | mood | mood.depressedMood, mood.anhedonia | — | 3 | router.reasonMood |
| V2_MOOD_EPISODIC | mood | mood.episodicElevation, mood.reducedNeedForSleep | — | 3 | rv2.reasonEpisode |
| V2_ANXIETY_WORRY | anxiety | anxiety.excessiveWorry | — | 2 | router.reasonWorry |
| V2_ANXIETY_PATTERN | anxiety | anxiety.excessiveWorry | anxiety.difficultToControlWorry, anxiety.physicalTension | 3 | router.reasonWorry |
| V2_ANXIETY_FEAR | anxiety | — | anxiety.panicLikeEpisodes, anxiety.socialEvaluationFear, anxiety.specificFear | 2 | router.reasonFear |
| V2_OCD_UNWANTED | ocd | ocd.intrusiveThoughts | ocd.thoughtsUnwanted, ocd.egoDystonic | 2 | router.reasonOcdThought |
| V2_OCD_RITUAL | ocd | — | ocd.checking, ocd.washingCleaning, ocd.mentalCompulsions, ocd.neutralization | 2 | router.reasonOcdRitual |
| V2_OCD_PATTERN | ocd | ocd.intrusiveThoughts, ocd.thoughtsUnwanted | ocd.checking, ocd.mentalCompulsions, ocd.neutralization, ocd.washingCleaning | 3 | router.reasonOcdSpecific |
| V2_TRAUMA_PATTERN | trauma | trauma.exposure, trauma.reliving | — | 3 | rv2.reasonTrauma |
| V2_TRAUMA_REMINDERS | trauma | trauma.exposure | trauma.avoidance, trauma.alertness, trauma.nightmares | 2 | rv2.reasonTrauma |
| V2_ADHD_DEVELOPMENT | adhd | adhd.developmental | adhd.disorganized, adhd.distractible, adhd.unfinished, adhd.impulsive | 3 | rv2.reasonAdhd |
| V2_ADHD_CLARIFIED | adhd | adhd.developmental, adhd.crossSetting, general.attention | — | 2 | rv2.reasonAdhd |
| V2_ADHD_CONTEXT | adhd | — | adhd.disorganized, adhd.distractible, adhd.unfinished, general.attention | 1 | rv2.reasonAttention |
| V2_EATING_WEIGHT | eating | eating.restriction, eating.weightFear | — | 3 | rv2.reasonEating |
| V2_EATING_BINGE | eating | eating.binge, eating.loss | — | 3 | rv2.reasonEating |
| V2_EATING_AVOIDANCE | eating | eating.avoidance, eating.intakeImpact | eating.sensory, eating.consequenceFear, eating.lowInterest | 3 | rv2.reasonEating |
| V2_EATING_CONTEXT | eating | — | eating.restriction, eating.avoidance, eating.binge | 1 | rv2.reasonEating |
| V2_PSYCHOSIS_PERCEPTION | psychosis | psychosis.perception | — | 1 | rv2.reasonPsychosis |
| V2_PSYCHOSIS_PATTERN | psychosis | psychosis.perception, psychosis.awake | psychosis.recurrent, psychosis.decline | 3 | rv2.reasonPsychosis |
| V2_PSYCHOSIS_BELIEF | psychosis | psychosis.belief, psychosis.conviction | — | 3 | rv2.reasonPsychosis |
| V2_PSYCHOSIS_ORGANIZATION | psychosis | psychosis.disorganization, psychosis.decline | — | 2 | rv2.reasonPsychosis |

Clarifications: `moodAnxiety`, `ocdGad`, `ocdTrauma`, `ocdPsychosis`, `adhdMood`, `adhdAnxiety`, `adhdTrauma`, `adhdBipolar`, `eatingMood`, `eatingOcd`, `eatingAnxiety`, `anArfid`, `bnBed`, `psychosisTrauma`, `psychosisDissociation`, `psychosisMood`, `sleepPsychosis`, `attentionContext`. Each has explicit required evidence, domain comparisons, information value, translated options and stopping conditions in `src/router-v2/questions.js`.

Extraction coverage corrections use the existing medical.severeConfusion, medical.severeBreathingDifficulty and harmToOthers.intent signal IDs. They do not alter Safety thresholds. See `ROUTER-V2-ARCHITECTURE.md` for context, provenance and limitations.

## v2.0.1 clarification coverage

`moodOcd` (unreviewed) compares mood-congruent rumination with unwanted, ego-dystonic intrusions accompanied by compulsive responses. Five options: Mood, OCD, both, unknown, prefer not to answer. Priority 50; requires both candidate domains; at most one use within the unchanged three-question budget. Positive relationship facts add explanation/discrimination to existing candidates only. Existing Mood/OCD routing rules, ranks and candidate sorting are unchanged.
