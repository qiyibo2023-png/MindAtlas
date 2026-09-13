/** Tri-state facts, not predicted risk. Runtime validation: schema.js. */
export type SafetyValue = true | false | 'unknown';
export interface SafetySignals {
  suicide: {
    passiveDeathWish: SafetyValue;
    suicidalIdeation: SafetyValue;
    currentIdeation: SafetyValue;
    desireToDie: SafetyValue;
    intent: SafetyValue;
    plan: SafetyValue;
    preparation: SafetyValue;
    accessToMeans: SafetyValue;
    recentAttempt: SafetyValue;
    escalatingRisk: SafetyValue;
    unableToStaySafe: SafetyValue;
    intrusiveThought: SafetyValue;
    thoughtsUnwanted: SafetyValue;
  };
  selfHarm: {
    currentUrges: SafetyValue;
    recentBehavior: SafetyValue;
    medicalInjuryConcern: SafetyValue;
    escalatingFrequency: SafetyValue;
    suicidalIntentAssociated: SafetyValue;
  };
  harmToOthers: {
    violentThoughts: SafetyValue;
    thoughtsUnwanted: SafetyValue;
    distress: SafetyValue;
    avoidance: SafetyValue;
    neutralization: SafetyValue;
    actualDesire: SafetyValue;
    intent: SafetyValue;
    targetIdentified: SafetyValue;
    plan: SafetyValue;
    preparation: SafetyValue;
    accessToMeans: SafetyValue;
    imminence: SafetyValue;
    impairedBehavioralControl: SafetyValue;
  };
  psychosis: {
    hallucinations: SafetyValue;
    commandHallucinations: SafetyValue;
    commandSelfHarm: SafetyValue;
    commandOtherHarm: SafetyValue;
    persecutoryBeliefs: SafetyValue;
    bizarreBeliefs: SafetyValue;
    severeParanoia: SafetyValue;
    severeDisorganization: SafetyValue;
    impairedRealityTesting: SafetyValue;
    dangerousBehaviorFromBeliefs: SafetyValue;
    inabilityToCareForSelf: SafetyValue;
  };
  mania: {
    severelyReducedNeedForSleep: SafetyValue;
    markedlyIncreasedEnergy: SafetyValue;
    grandiosity: SafetyValue;
    extremeImpulsivity: SafetyValue;
    dangerousSpending: SafetyValue;
    recklessDriving: SafetyValue;
    sexualRisk: SafetyValue;
    aggression: SafetyValue;
    psychoticFeatures: SafetyValue;
    impairedJudgment: SafetyValue;
    inabilityToControlBehavior: SafetyValue;
  };
  selfCare: {
    unableToEat: SafetyValue;
    unableToDrink: SafetyValue;
    unableToMaintainShelter: SafetyValue;
    unableToManageEssentialMedication: SafetyValue;
    severeSelfNeglect: SafetyValue;
    unableToRemainSafelyAlone: SafetyValue;
    severeFunctionalCollapse: SafetyValue;
  };
  medical: {
    severeChestPain: SafetyValue;
    severeBreathingDifficulty: SafetyValue;
    lossOfConsciousness: SafetyValue;
    seizure: SafetyValue;
    strokeLikeSymptoms: SafetyValue;
    severeConfusion: SafetyValue;
    severeHeadInjury: SafetyValue;
    suspectedPoisoning: SafetyValue;
    suspectedOverdose: SafetyValue;
    severeAllergicReaction: SafetyValue;
    otherImmediateMedicalDanger: SafetyValue;
  };
  substances: {
    severeIntoxication: SafetyValue;
    overdoseConcern: SafetyValue;
    severeWithdrawalConcern: SafetyValue;
    impairedConsciousness: SafetyValue;
    seizureRisk: SafetyValue;
    respiratorySuppression: SafetyValue;
    severeAgitation: SafetyValue;
  };
  other: {
    immediateDanger: SafetyValue;
    harmDesire: SafetyValue;
    harmAction: SafetyValue;
  };
  screen: {
    positiveUnspecified: SafetyValue;
    ambiguousDistress: SafetyValue;
  };
}
export type SafetyUrgency = 'none' | 'attention' | 'elevated' | 'acute';
export type AssessmentStatus = 'assessed' | 'incomplete' | 'unable_to_assess';
export interface Extraction { status: 'complete' | 'partial' | 'failed'; signals: Partial<{[D in keyof SafetySignals]: Partial<SafetySignals[D]>}>; }
export interface SafetyResult { urgency: SafetyUrgency; domains: string[]; primaryDomain: string | null; requiresInterruption: boolean; requiresGuidance: boolean; assessmentStatus: AssessmentStatus; recommendedAction: string; unresolvedCriticalSignals: string[]; triggeredRules: string[]; engineVersion: string; }
