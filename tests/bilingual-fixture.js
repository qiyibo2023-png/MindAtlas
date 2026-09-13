// Synthetic fixture controls, separate from actual app routes and distribution.
(function(){
 const cases=['homepage','mood_mid','anxiety_mid','ocd_mid','mood_result','anxiety_result','ocd_result','clarification','attention','elevated','acute_suicide','acute_medical','evidence','translation_failure'];
 const bar=document.createElement('div');bar.style.cssText='padding:12px;display:flex;flex-wrap:wrap;gap:12px;background:#eef4f1';bar.innerHTML='<strong>SYNTHETIC TEST HARNESS</strong><label>Scenario <select id="fixture-case">'+cases.map(x=>'<option>'+x+'</option>').join('')+'</select></label><output id="fixture-check">Ready</output>';document.body.prepend(bar);
 const snapshot=()=>JSON.stringify({view,mood:Mood.store,anxiety:Anxiety.store,ocd:OCD.store,safety:GlobalSafety.store});
 function fill(module){let state=module.emptyState();for(const q of module.questions){if(q.type==='month'||q.optional)continue;if(module===Mood&&!Mood.visible(q,state))continue;const value=q.options.find(o=>o[0]==='no')?.[0]??q.options.find(o=>o[0]==='0')?.[0]??q.options[0][0];state=module.setAnswer(state,q.id,value);}return state;}
 document.getElementById('fixture-case').onchange=e=>choose(e.target.value);
 document.addEventListener('click',event=>{if(event.target.closest('#lang')){const before=snapshot();queueMicrotask(()=>{document.getElementById('fixture-check').textContent=snapshot()===before?'PASS state preserved':'FAIL state changed';});}},true);
 function choose(name){GlobalSafety.reset();view='library';const state=GlobalSafety.empty();for(const p of GlobalSafety.critical)GlobalSafety.put(state,p,false);GlobalSafety.store.signals=state;GlobalSafety.store.region='ca';
  const parts=name.split('_'),module={mood:Mood,anxiety:Anxiety,ocd:OCD}[parts[0]];
  if(module){module.store.state=fill(module);module.store.step=parts[1]==='result'?(module===Mood?11:'results'):(module===Mood?6:module.sections[Math.floor(module.sections.length/2)].id);view={mood:'screen',anxiety:'anxiety',ocd:'ocd'}[parts[0]];GlobalSafety.acknowledge();}
  if(name==='evidence')view='evidence';
  if(name==='clarification'){GlobalSafety.store.signals=GlobalSafety.empty();view='safety';}
  if(name==='attention'){state.suicide.passiveDeathWish=true;view='safety';}
  if(name==='elevated'){state.selfHarm.recentBehavior=true;view='safety';}
  if(name==='acute_suicide'){state.suicide.intent=true;view='safety';}
  if(name==='acute_medical'){state.medical.severeChestPain=true;state.medical.severeBreathingDifficulty=true;view='safety';}
  render();if(name==='translation_failure')MindAtlasTranslationRecovery.recover();
  document.getElementById('fixture-check').textContent='Ready';
 }
 choose('homepage');
})();
