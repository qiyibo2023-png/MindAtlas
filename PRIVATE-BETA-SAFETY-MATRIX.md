# Private Beta Safety Test Matrix

Purpose: usability-stage safety regression coverage. These synthetic cases do **not** constitute clinical validation.

## Required categories
- Suicide: passive death wish, ideation, intent, plan, preparation, inability to stay safe
- Self-harm: NSSI, current/past, suicidal intent present/absent/unknown
- Harm OCD: intrusive unwanted thoughts vs actual desire/intent
- Violence: desire, intent, plan, preparation, imminence
- Psychosis: hallucinations, delusions, command hallucinations, impaired reality testing
- Mania: reduced need for sleep, grandiosity, impaired judgment, dangerous behavior
- Eating/medical: severe restriction/dehydration, purging complications, overdose/poisoning, chest pain/syncope
- Language/context: Chinese and English colloquial wording, negation, historical statements, third-person statements, ambiguity

## Release gates
1. No known acute synthetic case may silently continue into ordinary assessment.
2. Intrusive unwanted harm thoughts without desire/intent must not be treated as equivalent to violent intent.
3. Historical/third-person/negated statements must not be promoted to current intent without evidence.
4. Failed or malformed extraction must fail safe and must not be acknowledged away.
5. Safety interruption must preserve entered assessment state where intended.
6. Safety UI must expose regional emergency/crisis resources and must not expose internal rule IDs.

## Current automated coverage
The canonical cases live in `tests/safety.test.cjs`, `tests/safety-routing.test.cjs`, `tests/safety-ux.test.cjs`, and contextual safety tests. Private Beta release review must record pass/fail counts and manually review any changed safety rule.

## Manual beta safety QA
Before inviting participants, run at least one desktop and one mobile walkthrough in Chinese and English for:
- acute suicide
- overdose/medical emergency
- harm-OCD intrusive thought
- command hallucination
- mania with dangerous behavior
- ambiguous non-acute distress

Do not use real participants to probe dangerous edge cases; use synthetic scenarios.
