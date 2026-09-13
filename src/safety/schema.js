(function(G){'use strict';
G.version='1.0.0';G.reviewed='2026-09-13';
G.schema={
suicide:'passiveDeathWish suicidalIdeation currentIdeation desireToDie intent plan preparation accessToMeans recentAttempt escalatingRisk unableToStaySafe intrusiveThought thoughtsUnwanted'.split(' '),
selfHarm:'currentUrges recentBehavior medicalInjuryConcern escalatingFrequency suicidalIntentAssociated'.split(' '),
harmToOthers:'violentThoughts thoughtsUnwanted distress avoidance neutralization actualDesire intent targetIdentified plan preparation accessToMeans imminence impairedBehavioralControl'.split(' '),
psychosis:'hallucinations commandHallucinations commandSelfHarm commandOtherHarm persecutoryBeliefs bizarreBeliefs severeParanoia severeDisorganization impairedRealityTesting dangerousBehaviorFromBeliefs inabilityToCareForSelf'.split(' '),
mania:'severelyReducedNeedForSleep markedlyIncreasedEnergy grandiosity extremeImpulsivity dangerousSpending recklessDriving sexualRisk aggression psychoticFeatures impairedJudgment inabilityToControlBehavior'.split(' '),
selfCare:'unableToEat unableToDrink unableToMaintainShelter unableToManageEssentialMedication severeSelfNeglect unableToRemainSafelyAlone severeFunctionalCollapse'.split(' '),
medical:'severeChestPain severeBreathingDifficulty lossOfConsciousness seizure strokeLikeSymptoms severeConfusion severeHeadInjury suspectedPoisoning suspectedOverdose severeAllergicReaction otherImmediateMedicalDanger'.split(' '),
substances:'severeIntoxication overdoseConcern severeWithdrawalConcern impairedConsciousness seizureRisk respiratorySuppression severeAgitation'.split(' '),
other:['immediateDanger','harmDesire','harmAction'],screen:['positiveUnspecified','ambiguousDistress']};
G.paths=Object.entries(G.schema).flatMap(([d,keys])=>keys.map(k=>d+'.'+k));
G.empty=()=>Object.fromEntries(Object.entries(G.schema).map(([d,keys])=>[d,Object.fromEntries(keys.map(k=>[k,'unknown']))]));
G.get=(s,p)=>p.split('.').reduce((o,k)=>o?.[k],s);
G.put=(s,p,v)=>{const [d,k]=p.split('.');s[d][k]=v;return s;};
G.validate=function(input){const signals=G.empty(),errors=[];if(!input||typeof input!=='object'||Array.isArray(input))return {valid:false,signals,errors:['invalid_object']};for(const [d,values]of Object.entries(input)){if(!Object.hasOwn(G.schema,d)||!values||typeof values!=='object'||Array.isArray(values)){errors.push('invalid_domain');continue;}for(const [key,value]of Object.entries(values)){if(!G.schema[d].includes(key)||![true,false,'unknown'].includes(value)){errors.push('invalid_signal');continue;}signals[d][key]=value;}}return {valid:!errors.length,signals,errors};};
G.validateExtraction=function(raw){try{const o=typeof raw==='string'?JSON.parse(raw):raw;if(!o||typeof o!=='object'||Array.isArray(o)||Object.keys(o).some(k=>!['status','signals'].includes(k))||!Object.hasOwn(o,'signals')||!['complete','partial','failed'].includes(o.status))throw Error();const v=G.validate(o.signals);if(o.status==='failed'||!v.valid)throw Error();return {...v,status:o.status};}catch{return {valid:false,status:'failed',signals:G.empty(),errors:['extraction_failed']};}};
G.merge=function(inputs){const out=G.empty();let invalid=false;for(const input of inputs){const v=G.validate(input);if(!v.valid)invalid=true;for(const p of G.paths){const a=G.get(out,p),b=G.get(v.signals,p);G.put(out,p,a===true||b===true?true:a===false||b===false?false:'unknown');}}return {signals:out,invalid};};
G.domainNames={suicide:['自杀相关安全','Suicide-related safety'],self_harm:['自伤','Self-harm'],harm_to_others:['伤害他人','Harm to others'],psychosis:['精神病性体验相关安全','Psychosis-related safety'],mania:['兴奋／行为失控','Activation / behavioral dysregulation'],self_care:['基本生活与安全','Basic needs and safety'],medical:['医疗急症','Medical emergency'],substance:['物质、过量与戒断','Substances, overdose and withdrawal'],other:['其他即刻危险','Other immediate danger']};
})(globalThis.GlobalSafety=globalThis.GlobalSafety||{});
