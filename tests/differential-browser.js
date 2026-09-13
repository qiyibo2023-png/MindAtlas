// Synthetic controls only. No real answers, persistence, or deployed fixture route.
(function(){
 const cases=['ocd_gad','mood_anxiety','ocd_mood','bipolar','missing','conflict','suicide','medical','harm','self_obsession','trauma','mood_result','anxiety_result','ocd_result'];
 const bar=document.createElement('div');bar.style.cssText='padding:12px;display:flex;flex-wrap:wrap;gap:12px';bar.innerHTML='<strong>SYNTHETIC TEST HARNESS</strong><label>Scenario <select id="fixture-case">'+cases.map(x=>'<option>'+x+'</option>').join('')+'</select></label><output id="fixture-check">Ready</output>';document.body.prepend(bar);
 const snapshot=()=>JSON.stringify([view,Differential.store,Mood.store,Anxiety.store,OCD.store,SymptomRouter.store,GlobalSafety.store]);
 document.addEventListener('click',event=>{if(event.target.closest('#lang')){const before=snapshot();queueMicrotask(()=>document.getElementById('fixture-check').textContent=snapshot()===before?'PASS state preserved':'FAIL state changed');}},true);
 function choose(name){DifferentialFixtures.load(({mood_result:'mood',anxiety_result:'gad',ocd_result:'ocd'})[name]||name);GlobalSafety.store.region='ca';if(name.endsWith('_result')){Differential.store.enabled=false;const key=name.split('_')[0],module={mood:Mood,anxiety:Anxiety,ocd:OCD}[key];module.store.step=key==='mood'?11:'results';navigate(({mood:'screen',anxiety:'anxiety',ocd:'ocd'})[key]);}else navigate('differential');document.getElementById('fixture-check').textContent='Ready';}
 document.getElementById('fixture-case').onchange=e=>choose(e.target.value);choose(cases[0]);
})();
