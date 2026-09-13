export type Fact = true | false | 'unknown';
export interface SymptomContext { subject: 'self'|'other'|'unclear'; temporality: 'current'|'recent'|'historical'|'hypothetical'|'unclear'; polarity: 'affirmed'|'denied'|'uncertain'; uncertainty: boolean; }
export interface ClinicalSymptomProfile {
 mood: Record<'depressedMood'|'anhedonia'|'lowEnergy'|'guiltWorthlessness'|'hopelessness'|'sleepChange'|'appetiteChange'|'concentrationDifficulty'|'psychomotorChange',Fact>;
 anxiety: Record<'excessiveWorry'|'difficultToControlWorry'|'physicalTension'|'panicLikeEpisodes'|'panicConcern'|'situationalAvoidance'|'socialEvaluationFear'|'specificFear',Fact>;
 ocd: Record<'intrusiveThoughts'|'thoughtsUnwanted'|'egoDystonic'|'recurrentDoubt'|'checking'|'washingCleaning'|'mentalCompulsions'|'reassuranceSeeking'|'neutralization'|'symmetryExactness'|'avoidance'|'needForCertainty',Fact>;
 general: Record<'functionalImpact'|'sleep'|'schoolImpact'|'workImpact'|'relationshipImpact',Fact>;
 unsupported: Record<'trauma'|'attention'|'eating'|'psychotic',Fact>;
 context: SymptomContext;
 course: {duration:'unknown'|'brief'|'persistent';frequency:'unknown'|'repeated';severity:'unknown'|'marked'};
 observations: {path:string;value:Fact;context:SymptomContext}[];
}
export interface RoutingResult {version:string;primaryRoute:'mood'|'anxiety'|'ocd'|null;candidateRoutes:{domain:string;relevance:'moderate'|'high';supportingSignals:string[];explanationKeys:string[]}[];unsupportedSignals:string[];unresolvedQuestions:string[];confidenceStatus:'sufficient'|'uncertain'|'insufficient';explanationKeys:string[];matchedRules:string[];}
