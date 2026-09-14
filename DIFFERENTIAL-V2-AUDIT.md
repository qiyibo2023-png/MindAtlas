# Differential v2 pre-refactor audit

Baseline: `9e1c4d219fbe879b9891aa76d916492035d20130`, on
`feature/cross-disorder-differential-v2`. The clean baseline passed 656 checks.
This is an implementation audit, not clinical validation.

## Working contracts to retain

- All seven assessments already expose stable structured facts, revisions and
  question identifiers. Assessment engines and Safety thresholds need no change.
- The declarative v1 conjunction rules and direction requirements are reusable.
- Central bilingual catalogs, source-only builds, and opt-in comparison remain.
- Safety evaluation is authoritative and independent of candidate ranking.

## Findings

| Area | Existing implementation | v2 requirement |
| --- | --- | --- |
| Domain assembly | `trauma/integration.js`, `adhd/integration.js`, `eating/integration.js`, `psychosis/integration.js` each wrap validation, adapters and evaluation | One seven-domain registry and one evaluator; reuse stable assessment contracts |
| Co-occurrence | Each extension appends its own pairs after evaluation | Derive retained supported combinations once, without forcing a winner |
| Time | `differential/normalize.js` groups by concept regardless of temporality | Keep current, historical and episodic evidence separate; explicitly permit developmental/exposure context |
| Precedence | Structured facts beat extraction; clarification beats structured facts | Preserve provenance, selected nodes and the reason for selection; do not equate source priority with diagnostic certainty |
| Conflict | `differential/engine.js` lowers consistency even when precedence resolves a conflict | Distinguish resolved disagreements from unresolved contradictions; retain both observations |
| Missing information | Unknown is represented, but generic rule-outs can name absent concepts | Register rule-outs explicitly and report unknown separately from explicit negative evidence |
| Router adapter | Reads the legacy projection, losing v2 subject, temporality and clarification provenance | Read v2 evidence nodes, never candidate route labels or rankings |
| Assessment adapters | Mostly reliable generated facts; trauma exposure and psychosis facts default to current | Retain generated facts and enrich from structured question contracts where time/context matters |
| Unsupported concepts | OCD autism context is projected to `unsupported.attention` | Preserve the actual unsupported concept rather than silently relabeling it |
| Future handoff | No unresolved-discriminator or reliable-answer inventory contract | Export uncertainty, contradictions, already collected evidence and saturation; no adaptive question UI |
| UI/clinical separation | No translated-string reasoning found in core rules | Keep all clinical concepts language-independent; render explanations from catalog keys |

## Migration boundary

The v1 public API remains available for compatibility and its unchanged regression
suite. The active v2 comparison will use a single normalized graph and registered
seven-domain evaluation, rather than invoking the chain of v1 evaluation wrappers.
Assessment algorithms, Router v2.0.1 and the Safety Engine remain unchanged.
New rules require clinician review and default to `unreviewed`.

## Specification boundary

Sections 93–111 were received and reconciled with the implementation. The authorized checkpoint is a local commit only; no remote push, tag or Adaptive Assessment implementation. The benchmark leakage audit is recorded in benchmarks/differential-v1/quality-audit-v1.0.0.json.
