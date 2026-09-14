export type Domain = 'mood' | 'anxiety' | 'ocd' | 'trauma' | 'adhd' | 'eating' | 'psychosis';
export type Tri = boolean | 'unknown';
export type Status = 'sufficient' | 'partially_sufficient' | 'insufficient' | 'conflicted' | 'safety_interrupted';
export type SourceType = 'free_text_extraction' | 'standardized_screener' | 'structured_assessment' | 'functional_impairment' | 'duration' | 'exclusion' | 'developmental_history' | 'user_clarification' | 'safety_clarification';
export interface EvidenceNode {
 id: string; concept: string; domain: Domain | 'screen' | 'unsupported';
 /** Strings other than unknown are restricted to registered categorical contracts. */
 value: Tri | string; certainty: 'reported' | 'uncertain' | 'unknown';
 temporality: 'current' | 'history' | 'episodic' | 'hypothetical' | 'unknown';
 subject: 'self' | 'other' | 'unknown'; source: Domain | 'router' | 'clarification' | 'safety';
 sourceType: SourceType; quality: 'direct' | 'screening' | 'context';
 provenance: {questionIds: string[]; revision: number; engineVersion: string; quotationStatus: 'direct_self_report' | 'quoted_speech' | 'reported_speech' | 'clinician_question' | 'unclear'};
 timestampOrSequence: number;
 /** Empty on input; calculated on graph output. */
 conflictsWith: string[];
}
export interface EvidenceReason {ruleId: string | null; key: string; concepts: string[]; evidenceIds: string[];}
export interface CandidateDirection {
 id: string; domain: Domain; labelKey: string; role: 'primary' | 'cooccurring' | 'alternative' | 'unresolved';
 consistency: 'insufficient' | 'weak' | 'supported' | 'strong'; level: 0 | 1 | 2 | 3;
 supportingEvidence: EvidenceReason[]; opposingEvidence: EvidenceReason[]; discriminatingEvidence: EvidenceReason[];
 missingEvidence: string[]; unresolvedRuleOuts: string[];
 provenanceSummary: Array<{id: string; concept: string; source: EvidenceNode['source']; sourceType: SourceType; temporality: EvidenceNode['temporality']; quality: EvidenceNode['quality']; questionIds: string[]}>;
}
export interface Contradiction {concept: string; bucket: string; evidenceIds: string[]; selectedEvidenceIds: string[]; selectedValue: Tri | string; resolved: boolean; policy: string; ruleId?: string; contributingConcepts?: string[];}
export interface Discriminator {id: string; domainsCompared: Domain[]; conceptNeeded: string; reason: string; priority: number; priorityFactors: string[]; alreadyAsked: boolean; evidenceIds: string[]; version: string; reviewStatus: 'unreviewed';}
export interface SafetyState {urgency: 'none' | 'attention' | 'elevated' | 'acute'; assessmentStatus: string; requiresInterruption: boolean; primaryDomain: string | null; intrusiveInterpretation: {harm: boolean; self: boolean; notAnOCDDiagnosis: boolean};}
export interface AdaptiveContract {
 version: 'cross-disorder-differential-v2.0.0'; engineVersion: string; differentialStatus: Status;
 supportingEvidence: EvidenceReason[]; opposingEvidence: EvidenceReason[]; unresolvedRuleOuts: string[]; evidenceStateReasons: string[];
 candidateDirections: CandidateDirection[]; missingEvidence: string[]; unresolvedDiscriminators: Discriminator[];
 contradictions: Contradiction[]; alreadyCollectedEvidence: Array<{concept: string; value: Tri | string; evidenceIds: string[]; temporality: string[]; sourceTypes: SourceType[]}>;
 safetyState: SafetyState; evidenceState: 'insufficient' | 'still_discriminating' | 'reasonably_saturated';
}
