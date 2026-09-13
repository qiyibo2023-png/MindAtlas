export type EatingFact = true | false | 'unknown';
export type EatingPattern = 'restrictive' | 'bulimia' | 'bed' | 'arfid';
export interface EatingState {revision:number;[section:string]:number|Record<string,string>;}
export interface EatingResult {version:'eating-disorders-assessment-v1.0.0';revision:number;reviewStatus:'unreviewed';instrument:'original_structured_not_validated';score:null;scope:boolean;facts:Record<string,EatingFact>;patterns:{id:EatingPattern;level:0|1|2|3;consistency:'insufficient'|'low'|'moderate'|'high';support:string[];opposing:string[];missing:string[]}[];missing:string[];conflicts:string[];ruleouts:string[];medicalWarning:boolean;alternatives:string[];restrictionWithBingePurge:boolean;}
