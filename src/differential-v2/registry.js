(function(V,D){'use strict';
V.domains=new Map();
V.contradictionRules=[
 {id:'DV2_WORRY_SCOPE_CONFLICT',all:{'anxiety.broad':true,'anxiety.onlyObsessions':true},concept:'anxiety.onlyObsessions'},
 {id:'DV2_WEIGHT_MOTIVE_CONFLICT',all:{'eating.weightMotive':true,'eating.notWeight':true},concept:'eating.weightMotive'}
].map(r=>({...r,version:V.version,reviewStatus:V.reviewStatus}));
V.processingRules=['source_precedence','temporal_partition','unknown_not_negative','partial_anchor','opposition_limits_consistency','missing_ruleout_limits_consistency','unresolved_conflict_limits_consistency','multilabel_retention','discriminator_priority','saturation'].map(id=>({id:'DV2_'+id.toUpperCase(),version:V.version,reviewStatus:V.reviewStatus}));
V.registerDifferentialDomain=function(domain){
 if(!V.domainIds.includes(domain.id)||V.domains.has(domain.id)||!domain.directions.length)throw Error('Invalid differential registration');
 for(const field of ['supportingRules','opposingRules','discriminatingFeatures','ruleOuts','missingCriticalEvidence','cooccurrenceRules'])if(!Array.isArray(domain[field]))throw Error('Invalid differential contract');
 V.domains.set(domain.id,Object.freeze({...domain,reviewMetadata:{version:V.version,reviewStatus:V.reviewStatus}}));
};
// Import declarative conditions, not v1's evaluator or its domain wrappers.
const inherited=D.rules.map(r=>({...r,effects:r.effects.map(e=>({...e,support:e.support&&(/_CONTEXT_|_RETAINED|DIFF_ADHD_only/i.test(r.id)?Math.min(1,e.support):e.support)})),version:V.version,reviewStatus:V.reviewStatus}));
V.extraRules=[
 {id:'DV2_TRAUMA_PARTIAL',all:{'trauma.exposure':true,'trauma.intrusion':true},effects:[{direction:'trauma',support:2}],explanationKey:'traumaUI.comparison'}
].map(r=>({...r,version:V.version,reviewStatus:V.reviewStatus}));
const ruleouts={mood:['medical','substance','stressor'],anxiety:['medical','substance'],ocd:['medical','substance'],trauma:['medical','substance'],adhd:['medical','substance','sleep'],eating:['medical','substance','gi','medication'],psychosis:['medical','substance','sleep','culture','grief','medication','sudden']};
const anchors={mood:['mood.low','mood.interest','mood.contextSymptoms','mood.activation'],anxiety:['anxiety.broad','anxiety.excessive','anxiety.panic','anxiety.social','anxiety.specific','anxiety.agora','anxiety.separation'],ocd:['ocd.intrusive','ocd.rituals'],trauma:['trauma.intrusion','trauma.avoidance','trauma.arousal'],adhd:['adhd.current'],eating:['eating.restriction','eating.binge','eating.drivers'],psychosis:['psychosis.perception','psychosis.belief','psychosis.disorganization','psychosis.negative']};
for(const id of V.domainIds){
 const directions=Object.entries(D.directions).filter(([,d])=>d.domain===id).map(([key,d])=>({id:key,...d,required:[...d.required]}));
 const rules=[...inherited,...V.extraRules].filter(r=>r.effects.some(e=>directions.some(d=>d.id===e.direction)));
 V.registerDifferentialDomain({id,evidenceMap:Object.fromEntries(Object.entries(V.concepts).filter(([k])=>k.startsWith(id+'.'))),directions,anchors:anchors[id],supportingRules:rules.filter(r=>r.effects.some(e=>e.support)),opposingRules:rules.filter(r=>r.effects.some(e=>e.oppose)),discriminatingFeatures:[...new Set(rules.flatMap(r=>Object.keys(r.all)))],ruleOuts:ruleouts[id].map(k=>id+'.'+k),missingCriticalEvidence:[...new Set(directions.flatMap(d=>d.required))],cooccurrenceRules:V.domainIds.filter(other=>other!==id)});
}
// These describe missing facts; they do not select or ask assessment questions.
V.discriminatorRegistry=[
 ['mood_ocd_rumination',['mood','ocd'],'mood.rumination','differential.ruminationPattern'],
 ['mood_ocd_neutralization',['mood','ocd'],'ocd.response','differential.ocdCycle'],
 ['ocd_gad_scope',['ocd','anxiety'],'anxiety.onlyObsessions','differential.linkedAnxiety'],
 ['ocd_gad_rituals',['ocd','anxiety'],'ocd.rituals','differential.gadNoRitual'],
 ['trauma_ocd_memory',['trauma','ocd'],'trauma.intrusion','traumaUI.ocdCompare'],
 ['trauma_ocd_ego',['trauma','ocd'],'ocd.ego','traumaUI.ocdCompare'],
 ['trauma_anxiety_scope',['trauma','anxiety'],'anxiety.broad','traumaUI.anxietyCompare'],
 ['trauma_panic_unexpected',['trauma','anxiety'],'anxiety.panic','traumaUI.anxietyCompare'],
 ['trauma_mood_interest',['trauma','mood'],'mood.interest','traumaUI.moodCompare'],
 ['mood_anxiety_course',['mood','anxiety'],'mood.together','differential.moodCore'],
 ['adhd_development',['adhd'],'adhd.onset','adhdUI.patternReason'],
 ['adhd_settings',['adhd'],'adhd.crossSetting','adhdUI.patternReason'],
 ['adhd_mood_scope',['adhd','mood'],'adhd.onlyMood','adhdUI.moodCompare'],
 ['adhd_anxiety_scope',['adhd','anxiety'],'adhd.onlyAnxiety','adhdUI.anxietyCompare'],
 ['adhd_trauma_scope',['adhd','trauma'],'adhd.onlyTrauma','adhdUI.traumaCompare'],
 ['activation_course',['mood','adhd'],'mood.activation','adhdUI.bipolarCompare'],
 ['eating_weight_motive',['eating'],'eating.weightMotive','eatingUI.weightMotive'],
 ['eating_compensation',['eating'],'eating.compRecurrent','eatingUI.compCourse'],
 ['eating_mood_scope',['eating','mood'],'eating.mood','eatingUI.moodCompare'],
 ['eating_ocd_scope',['eating','ocd'],'eating.ocd','eatingUI.ocdCompare'],
 ['psychosis_qualification',['psychosis'],'psychosis.qualified','psychosisUI.qualified'],
 ['psychosis_awake',['psychosis'],'psychosis.awake','psychosisUI.sleepCompare'],
 ['psychosis_ocd_relationship',['psychosis','ocd'],'psychosis.ocd','psychosisUI.ocdCompare'],
 ['psychosis_trauma_relationship',['psychosis','trauma'],'psychosis.trauma','psychosisUI.traumaCompare'],
 ['psychosis_mood_relationship',['psychosis','mood'],'psychosis.mood','psychosisUI.moodCompare'],
 ['psychosis_activation_relationship',['psychosis','mood'],'psychosis.bipolar','psychosisUI.bipolarCompare']
].map(([id,domainsCompared,conceptNeeded])=>({id,domainsCompared,conceptNeeded,reason:conceptNeeded.startsWith('adhd.')?'dv2.discrDevelopment':conceptNeeded.startsWith('eating.')?'dv2.discrEating':conceptNeeded.startsWith('psychosis.')?'dv2.discrPerception':conceptNeeded==='mood.activation'?'dv2.discrActivation':domainsCompared.includes('trauma')?'dv2.discrTrauma':domainsCompared.includes('ocd')?'dv2.discrThinking':'dv2.discrMoodAnxiety',version:V.version,reviewStatus:V.reviewStatus}));
// Sparse evidence may justify a discriminator before a competing domain has a
// supported candidate. These entries do not add support or change route ranks.
V.discriminatorRegistry.push(...[
 {id:'intrusion_neutralization',domainsCompared:['ocd','anxiety'],conceptNeeded:'ocd.response',whenAny:['ocd.intrusive'],reason:'dv2.discrThinking'},
 {id:'intrusion_event_relationship',domainsCompared:['trauma','ocd'],conceptNeeded:'ocd.traumaMemory',whenAny:['ocd.intrusive'],reason:'dv2.discrTrauma'},
 {id:'concentration_development',domainsCompared:['mood','adhd'],conceptNeeded:'adhd.onset',whenAny:['mood.concentration'],reason:'dv2.discrDevelopment'}
].map(r=>({...r,version:V.version,reviewStatus:V.reviewStatus})));
})(globalThis.DifferentialV2,globalThis.Differential);
