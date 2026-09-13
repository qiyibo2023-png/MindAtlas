# Cross-Disorder Differential v1 rule contract

Engine version: `cross-disorder-differential-v1.0.0`. Every rule is **unreviewed**. These are engineering heuristics for explaining assessment evidence, not clinically validated diagnostic criteria, likelihood ratios, probabilities, or treatment decisions.

## Evidence and precedence

The ten-field `AssessmentEvidence` contract is defined in `src/differential/types.d.ts` and checked at runtime in `schema.js`: id, domain, concept, value, sourceModule, sourceType, temporality, certainty, relevance and provenance. Facts are true, false or unknown. Provenance retains source question IDs, module revision and engine version, never original free text. Domains and IDs are identical in Chinese and English.

Only a generated result matching its module's current revision and consent enters the comparison. Editing or clearing invalidates that evidence. Unknown answers remain unknown. Hidden Mood questions are ignored during validation; inactive Anxiety branches cannot support a direction.

Safety is authoritative and outside this ranking. Direct fixed clarification ranks 4; structured assessment, function, duration and exclusion evidence rank 3; standardized screening ranks 2; Router extraction ranks 1. Only ranks 3–4 can trigger comparative pattern rules. PHQ/GAD-7 context never selects a diagnosis. Lower-quality contradictory evidence is retained for review even when structured evidence is preferred. Equal-quality opposing answers resolve to unknown. Module revision numbers are not compared across modules.

Two optional fixed clarifications concern repetitive self-critical/past-focused thinking and whether anxiety occurs only around obsessions. They do not replace original answers and are not an Adaptive Assessment engine. Explicitly broad independent worry plus an only-obsessional answer creates a contradiction.

## Deterministic rule inventory

Each executable rule in `src/differential/rules.js` has an ID, comparison, conjunction of concept/value conditions, support/opposition effects, explanation translation key, evidence source, review status and version. Support levels 1/2/3 mean weak/supported/strong within this prototype; they are not calibrated clinical confidence.

| Rule | Required positive facts unless stated | Effect |
| --- | --- | --- |
| DIFF_OCD_CYCLE_001 | intrusive thoughts, rituals, ritual response | OCD support 2 |
| DIFF_OCD_SPECIFIC_002 | intrusive, unwanted/ego-dystonic, rituals, temporary relief | OCD support 3 |
| DIFF_GAD_BROAD_001 | broad, excessive, difficult-to-control, most-days worry | GAD support 3 |
| DIFF_GAD_NO_RITUAL_002 | broad, difficult-to-control worry; rituals false | GAD support 2; oppose OCD |
| DIFF_OCD_LINKED_ANXIETY_003 | intrusive, rituals; broad worry false | oppose independent GAD |
| DIFF_OCD_SCOPE_004 | intrusive, rituals, anxiety only around obsessions | oppose independent GAD |
| DIFF_MOOD_CORE_001 | low mood and reduced interest | depressive symptoms support 2 |
| DIFF_MOOD_ENERGY_002 | low mood, reduced interest, reduced energy | depressive symptoms support 3 |
| DIFF_RUMINATION_001 | past/self-critical repetitive thinking, low mood; rituals false | depressive symptoms support 2; oppose OCD |
| DIFF_BIPOLAR_HISTORY_001 | activation history | bipolar evaluation support 2; oppose pure unipolar/persistent interpretation |
| DIFF_CHRONIC_001 | chronic low mood and impact | persistent depressive symptoms support 3 |
| DIFF_PANIC_001 | recurrent unexpected abrupt panic pattern | panic evaluation support 2 |
| DIFF_ANXIETY_SOCIAL_001 | existing social pattern | social pattern support 2 |
| DIFF_ANXIETY_SPECIFIC_001 | existing specific-fear pattern | specific-fear pattern support 2 |
| DIFF_ANXIETY_AGORA_001 | existing agoraphobic pattern | agoraphobic pattern support 2 |
| DIFF_ANXIETY_SEPARATION_001 | existing separation pattern | separation pattern support 2 |

Adapters preserve existing assessment constructs. Mood duration, concurrence, impairment and bipolar-history clarity constrain depressive interpretation. Chronic course uses reported two-year duration and remission category. Activation is a reason for professional evaluation, not a bipolar I/II diagnosis. Anxiety duration and functional impact constrain GAD; panic duration/impact remain distinct. OCD includes time information and impact. See adapter question IDs for exact source mapping.

## Uncertainty and simultaneous directions

Each candidate contains supporting and opposing reasons, discriminating features, missing evidence and unresolved medical/substance factors (also stressor context for Mood). Explicit contrary required facts and contradictions cap support at weak. Unknown required facts or unresolved exclusions cap strong support at supported. No affirmative pattern leaves the comparison insufficient; it does not imply health or exclude an unsupported disorder.

All equally best supported directions remain primary. Other supported directions remain secondary. Weak/opposed alternatives remain inspectable. OCD/Mood, OCD/GAD and Mood/Anxiety can coexist without claiming causation. Unsupported trauma, attention/developmental, eating, psychotic and other concerns prompt broader professional evaluation, never a new disorder module. `sufficient` only means enough information for this limited comparison.

## Safety boundary

The unchanged shared Global Safety Engine processes all available domains regardless of comparative source selection. Acute states hide comparison and ordinary navigation; medical emergencies route to medical support. Invalid/missing structured Safety input blocks evaluation. Incomplete or elevated states use the existing Safety guard/acknowledgment behavior; unresolved safety clarification remains explicit in comparison output. Ego-dystonic harm/self-harm obsessions are never converted into intent by the Differential layer. Actual desire, intent, plan and preparation remain Safety facts.

## Clinical review required

All 16 rules, source normalization, support caps, wording and co-occurrence handling require independent clinician review and representative clinical evaluation before clinical use. Tests show software behavior only. The layer lacks longitudinal interviews, collateral history, physical examination, medication verification and complete diagnostic coverage. No sensitivity/specificity or probability is claimed.

Design context: [NICE OCD recommendations](https://www.nice.org.uk/guidance/cg31/chapter/Recommendations), [NICE depression recommendations](https://www.nice.org.uk/guidance/ng222/chapter/Recommendations), and [NICE bipolar recommendations](https://www.nice.org.uk/guidance/cg185/chapter/recommendations). These guidelines support careful history, differential review and avoiding misinterpretation of intrusive thoughts; they do **not** validate this rule table or support-level thresholds.
