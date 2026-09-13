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
