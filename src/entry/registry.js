// Entry questions collect routing evidence; they are not diagnostic criteria.
(function(E){'use strict';
E.version='assessment-entry-flow-v1.0.0';
E.maxQuestions=3;
const option=(value,labelKey,effects={})=>({value,labelKey,effects});
const unsure=()=>[option('unknown','rv2.unknown'),option('prefer','rv2.prefer')];
E.questions={
 broad:{id:'entryBroad',questionKey:'entry.broad',options:[
 option('mood','entry.familyMood'),option('anxiety','entry.familyAnxiety'),option('ocd','entry.familyOcd'),option('trauma','entry.familyTrauma'),option('adhd','entry.familyAdhd'),option('eating','entry.familyEating'),option('psychosis','entry.familyPsychosis'),option('other','router.other'),...unsure()]},
 mood:{id:'entryMood',questionKey:'entry.mood',options:[option('low','entry.low',{'mood.depressedMood':true}),option('interest','entry.interest',{'mood.anhedonia':true}),option('both','entry.lowInterest',{'mood.depressedMood':true,'mood.anhedonia':true}),...unsure()]},
 anxiety:{id:'entryAnxiety',questionKey:'entry.anxiety',options:[option('worry','entry.worry',{'anxiety.excessiveWorry':true}),option('panic','entry.panic',{'anxiety.panicLikeEpisodes':true}),option('social','entry.social',{'anxiety.socialEvaluationFear':true}),option('specific','entry.specific',{'anxiety.specificFear':true}),...unsure()]},
 ocd:{id:'entryOcd',questionKey:'entry.ocd',options:[option('thought','entry.thought',{'ocd.intrusiveThoughts':true,'ocd.thoughtsUnwanted':true}),option('checking','entry.checking',{'ocd.checking':true}),option('mental','entry.mental',{'ocd.mentalCompulsions':true}),...unsure()]},
 trauma:{id:'entryTrauma',questionKey:'entry.trauma',options:[option('reliving','entry.reliving',{'trauma.exposure':true,'trauma.reliving':true}),option('avoidance','entry.avoidance',{'trauma.exposure':true,'trauma.avoidance':true}),option('eventOnly','entry.eventOnly',{'trauma.exposure':true}),...unsure()]},
 adhd:{id:'entryAdhd',questionKey:'entry.adhd',options:[option('longstanding','entry.longstanding',{'adhd.developmental':true,'adhd.disorganized':true}),option('recent','entry.recent',{'general.attention':true,'general.onsetRecent':true}),...unsure()]},
 eating:{id:'entryEating',questionKey:'entry.eating',options:[option('restriction','entry.restriction',{'eating.restriction':true,'eating.weightFear':true}),option('binge','entry.binge',{'eating.binge':true,'eating.loss':true}),option('avoidance','entry.foodAvoidance',{'eating.avoidance':true}),...unsure()]},
 psychosis:{id:'entryPsychosis',questionKey:'entry.psychosis',options:[option('awake','entry.awake',{'psychosis.perception':true,'psychosis.awake':true,'psychosis.recurrent':true,'psychosis.sleep':false}),option('sleep','entry.sleep',{'psychosis.perception':true,'psychosis.sleep':true}),option('belief','entry.belief',{'psychosis.belief':true,'psychosis.conviction':true}),...unsure()]}
};
for(const q of Object.values(E.questions)){q.version=E.version;q.reviewStatus='unreviewed';q.conceptIds=[...new Set(q.options.flatMap(o=>Object.keys(o.effects)))];}
})(globalThis.EntryFlow={});
