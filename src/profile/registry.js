(function(P){'use strict';
P.version='personal-profile-v1.0.0';
const definitions=[
 ['language','preferences',['zh','en'],'profile.language'],
 ['goal','goals',['understand','support','coping'],'profile.goal'],
 ['lifeStage','context',['student','working','retired','other','unknown'],'profile.lifeStage'],
 ['childhoodAttention','context',['yes','no','unknown'],'profile.childhoodAttention'],
 ['pastPanic','history',['yes','no','unknown'],'profile.pastPanic'],
 ['impact','functional',['none','some','substantial','unknown'],'profile.impact'],
 ['professionalSupport','support',['yes','no','unknown'],'profile.professionalSupport'],
 ['assessment','assessment_history',null,'profile.assessment']
];
P.fields=Object.freeze(Object.fromEntries(definitions.map(([id,category,values,displayKey])=>[id,Object.freeze({id,category,values:values&&Object.freeze(values),displayKey,dataClass:'HIGHLY_SENSITIVE_HEALTH',purpose:'user_controlled_profile',sourceTypes:Object.freeze(id==='assessment'?['assessment_result']:['user_confirmed']),consentRequired:'profileStorage',persistenceAllowed:false,exportable:true,editable:id!=='assessment',deletable:true,longitudinalEligible:false})])));
P.domains=Object.freeze({mood:'Mood',anxiety:'Anxiety',ocd:'OCD',trauma:'Trauma',adhd:'ADHD',eating:'Eating',psychosis:'Psychosis'});
})(globalThis.PersonalProfile={});
