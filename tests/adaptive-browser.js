// Synthetic local browser fixture. Not included in application source/build output.
(function(){
 const A=Adaptive,V=DifferentialV2,G=GlobalSafety,D=Differential;
 const patterns={adhd_trauma:{'adhd.current':true,'trauma.exposure':true,'trauma.intrusion':true},ocd_gad:{'ocd.intrusive':true,'anxiety.broad':true},trauma_ocd:{'ocd.intrusive':true,'trauma.intrusion':true},mood_adhd:{'mood.low':true,'adhd.current':true},adhd_anxiety:{'anxiety.broad':true,'adhd.current':true},adhd_activation:{'adhd.current':true,'mood.activation':true},restriction_motive:{'eating.restriction':true},compensation:{'eating.binge':true,'eating.loss':true},psychosis_sleep:{'psychosis.perception':true},psychosis_trauma:{'psychosis.perception':true,'psychosis.awake':true,'trauma.intrusion':true},reality_testing:{'psychosis.perception':true,'psychosis.awake':true,'psychosis.dissociation':true},mood_anxiety:{'mood.low':true,'anxiety.excessive':true},mood_ocd:{'mood.low':true,'ocd.intrusive':true}};
 const names=[...Object.keys(patterns),'contradiction','saturation','multiple','insufficient','budget','user','unsupported','suicide','medical','live_mood'];
 const bar=document.createElement('aside');bar.style.padding='12px';bar.innerHTML='<label>Synthetic adaptive scenario <select id="adaptive-fixture">'+names.map(n=>'<option>'+n+'</option>').join('')+'</select></label> <output id="adaptive-check">Ready</output>';document.body.prepend(bar);
 const snapshot=()=>JSON.stringify([view,A.store,D.store,V.store,G.store,SymptomRouter.store,...Object.values(D.modules()).map(m=>m.store)]);
 document.addEventListener('click',e=>{if(e.target.closest('#lang')){const before=snapshot();queueMicrotask(()=>document.getElementById('adaptive-check').textContent=before===snapshot()?'PASS state preserved':'FAIL state changed');}},true);
 function choose(name){G.reset();SymptomRouter.clear();D.clear();for(const p of G.paths)G.answer(p,false);G.store.region='ca';G.acknowledge();A.start();let facts=patterns[name]||patterns.ocd_gad;
 if(['saturation','multiple','live_mood'].includes(name)){Mood.store.state=DifferentialFixtures.mood();Mood.store.result=Mood.assess(Mood.store.state);if(name==='multiple'){Trauma.store.state=TraumaFixtures.classic();Trauma.store.result=Trauma.assess(Trauma.store.state);}A.start();if(name==='saturation'){A.store.session.baseEvidence=A.store.session.baseEvidence.filter(n=>n.concept!=='mood.concentration');}if(name==='live_mood'){navigate('differential');return;}}
 else{if(name==='insufficient')facts={};if(name==='unsupported')facts={'unsupported.autism':true};A.store.session.baseEvidence=Object.entries(facts).map(([k,v])=>V.node(k,v,{source:k.startsWith('unsupported.')?'clarification':k.split('.')[0]}));}
 if(name==='contradiction')A.store.session.baseEvidence.push(V.node('ocd.intrusive',false,{id:'conflict:two'}));
 if(name==='budget'){A.store.session.budget=1;A.refresh(A.store.session);A.answer(A.store.session,A.store.session.result.nextQuestion.id,'unknown');}
 if(name==='user')A.stop(A.store.session);
 if(name==='suicide')G.answer('suicide.intent',true);if(name==='medical')G.answer('medical.lossOfConsciousness',true);
 navigate('adaptive');document.getElementById('adaptive-check').textContent='Ready';}
 document.getElementById('adaptive-fixture').onchange=e=>choose(e.target.value);choose('adhd_trauma');
})();
