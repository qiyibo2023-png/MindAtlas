(function(V,D){'use strict';
Object.assign(V.concepts,{'mood.concentration':'dv2.concentration','ocd.traumaMemory':'dv2.traumaMemory'});
Object.assign(V.concepts,{'psychosis.awake':'psychosisUI.q_audio_awake','psychosis.medication':'psychosisUI.q_substance_medication','psychosis.sudden':'psychosisUI.q_course_onset','trauma.dissociation':'psychosisUI.dissociationCompare','eating.gi':'eatingUI.q_medical_gi','eating.medication':'eatingUI.q_substance_medication','unsupported.autism':'dv2.autism','unsupported.substance':'dv2.substance','unsupported.sleep':'dv2.sleep','unsupported.somatic':'dv2.somatic','unsupported.personality':'dv2.personality','unsupported.cognitive':'dv2.cognitive','unsupported.grief':'dv2.grief','unsupported.bdd':'dv2.bdd','unsupported.hoarding':'dv2.hoarding'});
V.valueOptions={};V.observationContracts=[];
// Typed categorical observations retain functional severity, affected settings,
// change from baseline and course. They are not converted to symptom points.
for(const [domain,module]of Object.entries(D.modules()))for(const q of module.questions){
 if(!/^(course|function|onset|settings|settingImpact)\./.test(q.id)||!Array.isArray(q.options))continue;
 const concept=domain+'.observation.'+q.id,kind=/^(function|settings|settingImpact)\./.test(q.id)?'functional_impairment':'duration';
 V.concepts[concept]=kind==='functional_impairment'?'dv2.function':'dv2.course';
 V.valueOptions[concept]=q.options.map(o=>o[0]);V.observationContracts.push({domain,concept,questionId:q.id,kind});
}
})(globalThis.DifferentialV2,globalThis.Differential);
