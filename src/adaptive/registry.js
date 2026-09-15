(function(A,V){'use strict';
const keys={"adhd_trauma":["adaptive.q_adhd_trauma","adaptive.why_adhd_trauma"],"ocd_gad":["adaptive.q_ocd_gad","adaptive.why_ocd_gad"],"trauma_ocd":["adaptive.q_trauma_ocd","adaptive.why_trauma_ocd"],"mood_adhd":["adaptive.q_mood_adhd","adaptive.why_mood_adhd"],"adhd_anxiety":["adaptive.q_adhd_anxiety","adaptive.why_adhd_anxiety"],"adhd_activation":["adaptive.q_adhd_activation","adaptive.why_adhd_activation"],"restriction_motive":["adaptive.q_restriction_motive","adaptive.why_restriction_motive"],"psychosis_sleep":["adaptive.q_psychosis_sleep","adaptive.why_psychosis_sleep"],"psychosis_trauma":["adaptive.q_psychosis_trauma","adaptive.why_psychosis_trauma"],"reality_testing":["adaptive.q_reality_testing","adaptive.why_reality_testing"],"mood_anxiety":["adaptive.q_mood_anxiety","adaptive.why_mood_anxiety"],"mood_ocd":["adaptive.q_mood_ocd","adaptive.why_mood_ocd"]};
const o=A.option,reg=(id,targets,domains,answers,p=60)=>A.register(id,targets,domains,...keys[id],answers,p);
reg('adhd_trauma',['adhd.onlyTrauma'],['adhd','trauma'],[o('before','adaptive.before',{'adhd.onlyTrauma':false}),o('after','adaptive.after',{'adhd.onlyTrauma':true}),o('mixed','adaptive.mixed')],90);
reg('ocd_gad',['ocd.response','ocd.rituals'],['ocd','anxiety'],[o('yes','adaptive.yes',{'ocd.response':true,'ocd.rituals':true}),o('no','adaptive.no',{'ocd.response':false,'ocd.rituals':false})],85);
reg('trauma_ocd',['ocd.traumaMemory','trauma.intrusion','ocd.ego'],['trauma','ocd'],[o('memory','adaptive.memory',{'ocd.traumaMemory':true,'trauma.intrusion':true}),o('possibility','adaptive.possibility',{'ocd.traumaMemory':false,'ocd.ego':true}),o('both','adaptive.both',{'ocd.traumaMemory':true,'trauma.intrusion':true,'ocd.ego':true})],84);
reg('mood_adhd',['adhd.onlyMood'],['mood','adhd'],[o('before','adaptive.beforeMood',{'adhd.onlyMood':false}),o('during','adaptive.duringMood',{'adhd.onlyMood':true}),o('mixed','adaptive.mixed')],80);
reg('adhd_anxiety',['adhd.onlyAnxiety'],['adhd','anxiety'],[o('general','adaptive.general',{'adhd.onlyAnxiety':false}),o('worry','adaptive.worry',{'adhd.onlyAnxiety':true}),o('both','adaptive.both',{'adhd.onlyAnxiety':false})],80);
reg('adhd_activation',['adhd.activation','mood.activation'],['adhd','mood'],[o('episodes','adaptive.episodes',{'adhd.activation':true,'mood.activation':true}),o('longstanding','adaptive.longstanding',{'adhd.activation':false}),o('both','adaptive.both',{'adhd.activation':true,'mood.activation':true})],81);
reg('restriction_motive',['eating.weightMotive','eating.notWeight','eating.drivers'],['eating'],[o('weight','adaptive.weight',{'eating.weightMotive':true,'eating.notWeight':false}),o('other','adaptive.otherMotive',{'eating.weightMotive':false,'eating.notWeight':true,'eating.drivers':true}),o('both','adaptive.both',{'eating.weightMotive':true,'eating.drivers':true})],88);
A.binary('compensation','eating.compRecurrent',['eating'],'adaptive.q_compensation','adaptive.why_compensation',88);
reg('psychosis_sleep',['psychosis.awake','psychosis.sleep'],['psychosis'],[o('awake','adaptive.awake',{'psychosis.awake':true,'psychosis.sleep':false}),o('sleep','adaptive.sleepOnly',{'psychosis.awake':false,'psychosis.sleep':true}),o('both','adaptive.both',{'psychosis.awake':true,'psychosis.sleep':true})],95);
reg('psychosis_trauma',['psychosis.trauma'],['psychosis','trauma'],[o('memory','adaptive.memory',{'psychosis.trauma':true}),o('unrelated','adaptive.unrelated',{'psychosis.trauma':false}),o('both','adaptive.both')],83);
reg('reality_testing',['psychosis.insight'],['psychosis'],[o('yes','adaptive.yes',{'psychosis.insight':false}),o('no','adaptive.no',{'psychosis.insight':true})],86);
reg('mood_anxiety',['mood.interest'],['mood','anxiety'],[o('yes','adaptive.yes',{'mood.interest':true}),o('no','adaptive.no',{'mood.interest':false})],76);
// Same clinical distinction as Router v2.0.1, without changing Router answers/ranks.
reg('mood_ocd',['mood.rumination','ocd.response','ocd.ego'],['mood','ocd'],[o('mood','adaptive.rumination',{'mood.rumination':true}),o('ocd','adaptive.intrusiveRitual',{'ocd.response':true,'ocd.ego':true}),o('both','adaptive.both',{'mood.rumination':true,'ocd.response':true,'ocd.ego':true})],87);
A.binary('childhood_onset','adhd.onset',['adhd'],'adaptive.q_childhood_onset','adaptive.why_childhood_onset',55);
A.binary('cross_setting','adhd.crossSetting',['adhd'],'adaptive.q_cross_setting','adaptive.why_cross_setting',50);
A.binary('mood_together','mood.together',['mood'],'adaptive.q_mood_together','adaptive.why_mood_together',35,'missing');
A.binary('mood_duration','mood.duration',['mood'],'adaptive.q_mood_duration','adaptive.why_mood_duration',35,'missing');
A.binary('ocd_impact','ocd.impact',['ocd'],'adaptive.q_ocd_impact','adaptive.why_ocd_impact',30,'missing');
// Context questions bind a named domain, not every domain at once.
for(const domain of V.domainIds)for(const kind of ['medical','substance','medication','sleep']){
 const concept=domain+'.'+kind;if(!V.domains.get(domain).ruleOuts.includes(concept))continue;
 const keys={medical:['adaptive.q_medical','adaptive.why_medical'],substance:['adaptive.q_substance','adaptive.why_substance'],medication:['adaptive.q_medication','adaptive.why_medication'],sleep:['adaptive.q_sleep','adaptive.why_sleep']};A.binary('context_'+domain+'_'+kind,concept,[domain],...keys[kind],20,'ruleout');
}
})(globalThis.Adaptive,globalThis.DifferentialV2);

