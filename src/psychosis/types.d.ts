export type Answer = 'yes' | 'no' | 'unknown';
export type Fact = true | false | 'unknown';
export type Impact = 'none' | 'mild' | 'moderate' | 'severe' | 'unknown';
export type Conviction = 'doubt' | 'uncertain' | 'strong' | 'complete' | 'fluctuating' | 'unknown';
export type Insight = 'open' | 'some' | 'limited' | 'none' | 'unknown';
export type Modality = 'audio' | 'visual' | 'tactile' | 'smell' | 'presence' | 'distortion';
export interface PerceptualContext {
  time?: 'current' | 'history' | 'unknown';
  frequency?: 'isolated' | 'recurrent' | 'unknown';
  awake?: Answer; conviction?: Conviction; insight?: Insight;
  distress?: Impact; impact?: Impact; sleep?: Answer; trauma?: Answer; substance?: Answer;
  type?: 'name' | 'internal' | 'external' | 'commentary' | 'command' | 'unknown';
}
export interface PsychosisState {
  revision: number;
  intro: { agree?: Answer; adult?: Answer; concern?: 'perception'|'belief'|'organization'|'function'|'other' };
  perception: Partial<Record<Modality, Answer>>;
  audio: PerceptualContext; visual: PerceptualContext; tactile: PerceptualContext;
  smell: PerceptualContext; presence: PerceptualContext; distortion: PerceptualContext;
  belief: Partial<Record<'targeted'|'reference'|'grandiose'|'control'|'other'|'current', Answer>> & {conviction?: Conviction; insight?: Insight};
  organization: Partial<Record<'thought'|'speech'|'behavior'|'baseline', Answer>>;
  negative: Partial<Record<'motivation'|'expression'|'speech'|'social'|'pleasure', Answer>>;
  function: {decline?: Answer} & Partial<Record<'work'|'school'|'relationships'|'selfCare'|'living'|'communication'|'social'|'organization', Impact>>;
  course: {onset?: 'sudden'|'gradual'|'stable'|'unknown'; time?: 'current'|'history'|'unknown'; pattern?: 'persistent'|'episodic'|'unknown'; duration?: 'days'|'weeks'|'months'|'unknown'; worsening?: Answer};
  mood: Partial<Record<'depression'|'onlyDepression'|'activation'|'onlyActivation', Answer>>;
  trauma: Partial<Record<'reliving'|'only'|'dissociation', Answer>>;
  ocd: Partial<Record<'intrusive'|'rituals'|'linked', Answer>>;
  sleep: Partial<Record<'transitions'|'deprivation', Answer>>;
  context: Partial<Record<'anxiety'|'adhd', Answer>>;
  substance: Partial<Record<'use'|'withdrawal'|'medication', Answer>>;
  medical: Partial<Record<'illness'|'neurology'|'change', Answer>>;
  culture: Partial<Record<'shared'|'grief', Answer>>;
  safety: Record<string, Record<string, Answer>>;
}
export interface PsychosisResult {
  version: 'psychosis-assessment-v1.0.0'; revision: number; reviewStatus: 'unreviewed';
  instrument: 'original_structured_not_validated'; score: null; scope: boolean;
  patterns: Array<{id:'psychosis';level:0|1|2|3;consistency:'insufficient'|'low'|'moderate'|'high';support:string[];opposing:string[];missing:string[]}>;
  facts: Record<string, Fact>;
  perceptions: Array<{id:Modality;present:Fact;qualified:Fact;impact?:Fact;distress?:Fact;insight?:Fact;conviction?:Fact}>;
  alternatives: string[]; ruleouts: string[]; conflicts: string[]; missing: string[]; medicalWarning: boolean;
}
