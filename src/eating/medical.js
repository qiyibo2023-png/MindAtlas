(function(A,G){'use strict';
// Map explicit medical danger to the existing shared schema; no numerical threshold.
A.medicalMap={fainting:['medical.otherImmediateMedicalDanger'],weakness:['medical.otherImmediateMedicalDanger','selfCare.severeFunctionalCollapse'],dehydration:['medical.otherImmediateMedicalDanger','selfCare.unableToDrink'],chest:['medical.severeChestPain'],breathing:['medical.severeBreathingDifficulty'],confusion:['medical.severeConfusion'],bleeding:['medical.otherImmediateMedicalDanger'],unableEat:['selfCare.unableToEat'],unableDrink:['selfCare.unableToDrink']};
// Retain unknowns only until all questions mapping to a common signal are known.
A.medicalSignals=s=>{const signals=G.empty();for(const p of [...new Set(Object.values(A.medicalMap).flat())])G.put(signals,p,A.any(Object.entries(A.medicalMap).filter(([,ps])=>ps.includes(p)).map(([k])=>A.tri(s.medicalNow?.[k]))));return signals;};
A.medicalRules=Object.entries(A.medicalMap).map(([question,signals])=>({id:'EATING_MEDICAL_'+question.toUpperCase(),question:'medicalNow.'+question,signals,version:A.version,reviewStatus:'unreviewed',classification:'shared_signal_adapter'}));
const safety=Trauma.sections.filter(s=>s.id.startsWith('safety')).flatMap(s=>s.questions).map(q=>({...q}));
A.sections.splice(1,0,...Array.from({length:Math.ceil(safety.length/5)},(_,i)=>({id:'safety'+i,label:'eatingUI.safety',questions:safety.slice(i*5,i*5+5)})));
// Keep medical groups short; a positive answer is evaluated immediately.
const index=A.sections.findIndex(s=>s.id==='medicalCheck'),medical=A.sections[index];A.sections.splice(index,1,...[0,1,2].map(i=>({...medical,id:'medicalCheck'+i,questions:medical.questions.slice(i*3,i*3+3)})));
A.questions=A.sections.flatMap(s=>s.questions);A.clear();
const guard=G.guard,reset=G.reset,collect=G.collect,update=A.update;
G.guard=target=>guard(target==='eating'?'screen':target);G.reset=()=>{A.clear();reset();};
A.update=(p,v)=>{update(p,v);if(p.startsWith('safety.'))G.answer(p.slice(7),A.tri(v));if(p.startsWith('medicalNow.'))for(const signal of A.medicalMap[p.split('.')[1]]){const value=G.get(A.medicalSignals(A.store.state),signal);if(value!=='unknown'||v==='unknown')G.answer(signal,value);}};
G.collect=()=>{const base=collect(),s=A.store.state;if(!s?.revision)return base;let failed=false;const signals=A.medicalSignals(s);for(const q of A.questions.filter(q=>q.id.startsWith('safety.')||q.id.startsWith('medicalNow.'))){const v=Assessment.get(s,q.id);if(v!==undefined&&!['yes','no','unknown'].includes(v))failed=true;if(q.id.startsWith('safety.')){const p=q.id.slice(7),a=G.get(signals,p),b=A.tri(v);G.put(signals,p,a===true||b===true?true:a===false||b===false?false:'unknown');}}const merged=G.merge([base.signals,signals]);return {...G.evaluate(merged.signals,{failed:failed||base.assessmentStatus==='unable_to_assess'}),signals:merged.signals,sources:[...base.sources,{module:'eating',revision:s.revision}]};};
})(globalThis.Eating,globalThis.GlobalSafety);
