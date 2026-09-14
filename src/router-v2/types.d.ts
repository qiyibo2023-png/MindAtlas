export type ClinicalValue = true | false | 'unknown';
export type AssessmentDomain = 'mood' | 'anxiety' | 'ocd' | 'trauma' | 'adhd' | 'eating' | 'psychosis';
export interface SymptomEvidence {
  id: string;
  path: string;
  value: ClinicalValue;
  source: 'extraction' | 'clarification';
  context: {
    subject: 'self' | 'other' | 'unclear';
    temporality: 'current' | 'recent' | 'historical' | 'hypothetical' | 'unclear';
    polarity: 'affirmed' | 'denied' | 'uncertain';
    quotationStatus: 'direct_self_report' | 'quoted_speech' | 'reported_speech' | 'clinician_question' | 'unclear';
    certainty: 'reported' | 'uncertain';
  };
}
export interface ClinicalSymptomProfileV2 {
  schemaVersion: 'symptom-router-v2.0.1';
  facts: Record<string, ClinicalValue>;
  evidence: SymptomEvidence[];
  course: { duration: 'unknown' | 'brief' | 'persistent'; frequency: 'unknown' | 'repeated'; severity: 'unknown' | 'marked' };
}
export interface RoutingSessionV2 {
  answers: Record<string, string>;
  order: string[];
  stopped: boolean;
  maxQuestions: number;
  preference?: AssessmentDomain;
}
export interface RoutingResultV2 {
  routerVersion: 'symptom-router-v2.0.1';
  primaryRoute: AssessmentDomain | null;
  secondaryRoutes: AssessmentDomain[];
  candidateRoutes: Array<{domain: AssessmentDomain; relevance: 'high' | 'moderate' | 'tentative'; supportingEvidence: Array<{concept: string; evidenceIds: string[]}>; opposingEvidence: Array<{concept: string; evidenceIds: string[]}>; discriminatingEvidence: Array<{concept: string; evidenceIds: string[]}>; explanationKeys: string[]}>;
  routingStatus: 'sufficient' | 'ambiguous' | 'insufficient' | 'safety_interrupted' | 'unsupported';
  unsupportedDomainFlags: string[];
  unresolvedQuestions: string[];
  clarificationRecommended: boolean;
  explanationKeys: string[];
  stopReason: string | null;
}
