export type TraumaFact = true | false | 'unknown';
export type TraumaAnswer = 'yes' | 'no' | 'unknown' | '0' | '1' | '2' | '3' | string;
export interface TraumaCluster {count:number;unknown:number;threshold:number;linked:TraumaFact;present:TraumaFact}
export interface TraumaResult {
 version:'ptsd-trauma-assessment-v1.0.0'; revision:number; reviewStatus:'unreviewed';
 instrument:'custom_structured_not_validated';score:null;
 clusters:Record<'intrusion'|'avoidance'|'negative'|'arousal',TraumaCluster>;
 facts:Record<'exposure'|'intrusion'|'avoidance'|'negative'|'arousal'|'duration'|'impairment'|'current',TraumaFact>;
 support:string[];opposing:string[];missing:string[];ruleouts:string[];
 direction:'compatible'|'limited'|'early'|'stressor'|'low';consistency:'strong'|'limited'|'insufficient';
 dissociation:boolean;psychoticFlag:boolean;context:Record<string,TraumaAnswer>;safety:string;
}
