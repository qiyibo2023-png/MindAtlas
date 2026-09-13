(function(D){'use strict';
D.directions={ocd:{label:'differential.ocd',domain:'ocd',required:['ocd.intrusive','ocd.rituals','ocd.timeKnown','ocd.impact']},mood:{label:'differential.mood',domain:'mood',required:['mood.duration','mood.together','mood.impact','mood.bipolarKnown']},gad:{label:'differential.gad',domain:'anxiety',required:['anxiety.broad','anxiety.control','anxiety.duration','anxiety.impact']},bipolar:{label:'differential.bipolar',domain:'mood',required:['mood.activation']},persistent:{label:'differential.persistent',domain:'mood',required:['mood.chronic','mood.impact']},panic:{label:'differential.panicDirection',domain:'anxiety',required:['anxiety.panic','anxiety.panicDuration','anxiety.panicImpact']},social:{label:'differential.social',domain:'anxiety',required:['anxiety.social']},specific:{label:'differential.specific',domain:'anxiety',required:['anxiety.specific']},agora:{label:'differential.agora',domain:'anxiety',required:['anxiety.agora']},separation:{label:'differential.separation',domain:'anxiety',required:['anxiety.separation']}};
const rule=(id,comparison,all,effects,explanationKey)=>({id,comparison,all,effects,explanationKey,evidenceSource:'normalized_structured_evidence',reviewStatus:'unreviewed',version:D.version});
// All entries are auditable conjunctions, with explicit support/opposition effects.
D.rules=[
 rule('DIFF_OCD_CYCLE_001','ocd_gad',{'ocd.intrusive':true,'ocd.rituals':true,'ocd.response':true},[{direction:'ocd',support:2}],'differential.ocdCycle'),
 rule('DIFF_OCD_SPECIFIC_002','ocd_gad',{'ocd.intrusive':true,'ocd.ego':true,'ocd.rituals':true,'ocd.relief':true},[{direction:'ocd',support:3}],'differential.ocdSpecific'),
 rule('DIFF_GAD_BROAD_001','ocd_gad',{'anxiety.broad':true,'anxiety.excessive':true,'anxiety.control':true,'anxiety.mostDays':true},[{direction:'gad',support:3}],'differential.gadBroad'),
 rule('DIFF_GAD_NO_RITUAL_002','ocd_gad',{'anxiety.broad':true,'anxiety.control':true,'ocd.rituals':false},[{direction:'gad',support:2},{direction:'ocd',oppose:true}],'differential.gadNoRitual'),
 rule('DIFF_OCD_LINKED_ANXIETY_003','ocd_linked_anxiety',{'ocd.intrusive':true,'ocd.rituals':true,'anxiety.broad':false},[{direction:'gad',oppose:true}],'differential.linkedAnxiety'),
 rule('DIFF_OCD_SCOPE_004','ocd_linked_anxiety',{'ocd.intrusive':true,'ocd.rituals':true,'anxiety.onlyObsessions':true},[{direction:'gad',oppose:true}],'differential.linkedAnxiety'),
 rule('DIFF_MOOD_CORE_001','mood_anxiety',{'mood.low':true,'mood.interest':true},[{direction:'mood',support:2}],'differential.moodCore'),
 rule('DIFF_MOOD_ENERGY_002','mood_anxiety',{'mood.low':true,'mood.interest':true,'mood.energy':true},[{direction:'mood',support:3}],'differential.moodCluster'),
 rule('DIFF_RUMINATION_001','ocd_rumination',{'mood.rumination':true,'mood.low':true,'ocd.rituals':false},[{direction:'mood',support:2},{direction:'ocd',oppose:true}],'differential.ruminationPattern'),
 rule('DIFF_BIPOLAR_HISTORY_001','unipolar_bipolar',{'mood.activation':true},[{direction:'bipolar',support:2},{direction:'mood',oppose:true},{direction:'persistent',oppose:true}],'differential.activationHistory'),
 rule('DIFF_CHRONIC_001','mood_course',{'mood.chronic':true,'mood.low':true,'mood.impact':true},[{direction:'persistent',support:3}],'differential.chronicPattern'),
 rule('DIFF_PANIC_001','panic_medical',{'anxiety.panic':true},[{direction:'panic',support:2}],'differential.panicPattern'),
 ...['social','specific','agora','separation'].map(id=>rule('DIFF_ANXIETY_'+id.toUpperCase()+'_001','existing_anxiety_patterns',{['anxiety.'+id]:true},[{direction:id,support:2}],'differential.existingAnxiety'))
];
})(globalThis.Differential);
