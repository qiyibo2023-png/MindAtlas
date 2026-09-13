export type ADHDFact=true|false|'unknown';
export interface ADHDCount {count:number;unknown:number;threshold:5;present:ADHDFact}
export interface ADHDResult {
 version:'adhd-assessment-v1.0.0';revision:number;reviewStatus:'unreviewed';instrument:'custom_structured_not_validated';score:null;
 counts:Record<'inattention'|'hyper',ADHDCount>;
 facts:Record<'current'|'developmental'|'onset'|'crossSetting'|'impairment'|'persistent'|'independent'|'sleepClear',ADHDFact>;
 positiveSettings:string[];unknownSettings:string[];visibleImpact:ADHDFact;compensation:ADHDFact;
 contributions:Record<'sleep'|'medical'|'substance',ADHDFact>;support:string[];opposing:string[];missing:string[];ruleouts:string[];alternatives:string[];conflicts:string[];
 consistency:'high'|'moderate'|'low'|'insufficient';scope:boolean;
}
