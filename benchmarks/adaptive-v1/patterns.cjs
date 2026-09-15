// Synthetic development fixtures. Expected questions are authored independently of the selector.
const scenarios=[
 ['adhd_trauma',{'adhd.current':true,'trauma.exposure':true,'trauma.intrusion':true},'before',{'adhd.onlyTrauma':false}],
 ['ocd_gad',{'ocd.intrusive':true,'anxiety.broad':true},'yes',{'ocd.response':true,'ocd.rituals':true}],
 ['trauma_ocd',{'ocd.intrusive':true,'trauma.intrusion':true},'memory',{'ocd.traumaMemory':true,'trauma.intrusion':true}],
 ['mood_adhd',{'mood.low':true,'adhd.current':true},'before',{'adhd.onlyMood':false}],
 ['adhd_anxiety',{'anxiety.broad':true,'adhd.current':true},'general',{'adhd.onlyAnxiety':false}],
 ['adhd_activation',{'adhd.current':true,'mood.activation':true},'episodes',{'adhd.activation':true,'mood.activation':true}],
 ['restriction_motive',{'eating.restriction':true},'other',{'eating.weightMotive':false,'eating.notWeight':true,'eating.drivers':true}],
 ['compensation',{'eating.binge':true,'eating.loss':true},'yes',{'eating.compRecurrent':true}],
 ['psychosis_sleep',{'psychosis.perception':true},'sleep',{'psychosis.awake':false,'psychosis.sleep':true}],
 ['psychosis_trauma',{'psychosis.perception':true,'psychosis.awake':true,'trauma.intrusion':true},'memory',{'psychosis.trauma':true}],
 ['reality_testing',{'psychosis.perception':true,'psychosis.awake':true,'psychosis.dissociation':true},'yes',{'psychosis.insight':false}],
 ['mood_anxiety',{'mood.low':true,'anxiety.excessive':true},'yes',{'mood.interest':true}],
 ['mood_ocd',{'mood.low':true,'ocd.intrusive':true},'both',{'mood.rumination':true,'ocd.response':true,'ocd.ego':true}]
];module.exports={scenarios};
