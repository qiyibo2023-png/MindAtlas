export type AdaptiveStatus = 'ask' | 'stop_sufficient' | 'stop_multiple_supported' | 'stop_insufficient' | 'stop_user' | 'stop_budget' | 'stop_safety' | 'stop_unsupported';
export interface AdaptiveQuestion {
 id: string; conceptTarget: string; targets: string[]; domainsCompared: string[];
 questionKey: string; whyKey: string;
 answerOptions: {value: string; labelKey: string; evidenceUpdates: Record<string, boolean>}[];
 priority?: number; kind: string; contraindications?: string[]; requiresUnknownEvidence?: boolean;
 stopImpact?: string; version: string; reviewStatus: 'unreviewed';
}
export interface AdaptiveOutput {
 adaptiveStatus: AdaptiveStatus; nextQuestion: AdaptiveQuestion | null;
 whyThisQuestion: string | null; competingDirections: string[];
 expectedInformationValue: {kind: 'deterministic_priority'; score: number; reasons: string[]} | null;
 questionsAsked: number; questionBudgetRemaining: number; stopReason: string | null;
 safetyState: import('../differential-v2/types').SafetyState | null;
 engineVersion: 'adaptive-assessment-v1.0.0'; reviewStatus: 'unreviewed';
}
// Answers and evidence are in page memory only; no raw-text field is permitted.
export interface AdaptiveAnswer {questionId: string; targets: string[]; value: string; evidenceUpdates: Record<string, boolean>}
