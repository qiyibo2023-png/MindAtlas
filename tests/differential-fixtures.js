// Synthetic assessment fixtures only. Shared by unit and local browser acceptance tests.
(function(F){'use strict';
F.set=(module,state,answers)=>{for(const [path,value]of Object.entries(answers))state=module.setAnswer(state,path,value);return state;};
F.fill=module=>{let s=module.emptyState();for(const q of module.questions){if(q.optional||q.type==='month'||module===Mood&&!Mood.visible(q,s))continue;const v=q.options.find(o=>o[0]==='no')?.[0]??q.options.find(o=>o[0]==='0')?.[0]??q.options.find(o=>o[0]==='none')?.[0]??q.options[0][0];s=module.setAnswer(s,q.id,v);}return F.set(module,s,module===Mood?{'intro.age':'yes','intro.agree':'yes'}:module===Anxiety?{'intro.age':'adult','intro.respondent':'self','intro.agree':'yes'}:{'intro.agree':'yes'});};
F.mood=()=>{let s=F.fill(Mood);s=F.set(Mood,s,{'course.duration':'14to29','course.together':'yes','function.work':'2'});for(const id of ['mood','interest','energy','sleep','worth','focus'])s=F.set(Mood,s,{['symptoms.'+id+'.present']:'yes',['symptoms.'+id+'.duration']:'14to29',['symptoms.'+id+'.frequency']:'daily',['symptoms.'+id+'.changed']:'yes',['symptoms.'+id+'.severity']:'2'});for(let i=0;i<8;i++)s=Mood.setAnswer(s,'phq.'+i,'2');return s;};
F.ocd=()=>F.set(OCD,F.fill(OCD),{'obsessions.present':'yes','obsessions.ego':'yes','obsessions.control':'yes','visible.check':'yes','cycle.response':'yes','cycle.relief':'yes','impact.time':'1to3','impact.work':'2','diff.gad':'no'});
F.gad=()=>F.set(Anxiety,F.fill(Anxiety),{'clusters.gad':'yes','gad.multiple':'yes','gad.excessive':'yes','gad.control':'yes','gad.mostDays':'yes','gad.symptoms.tension':'yes','gad.symptoms.fatigue':'yes','gad.symptoms.focus':'yes','gad.duration':'6plus','gad.impact':'2'});
F.panic=()=>F.set(Anxiety,F.fill(Anxiety),{'clusters.panic':'yes','panic.abrupt':'yes','panic.recurrent':'yes','panic.unexpected':'yes','panic.concern':'yes','panic.month':'yes','panic.impact':'2','panic.symptoms.heart':'yes','panic.symptoms.sweat':'yes','panic.symptoms.tremble':'yes','panic.symptoms.breath':'yes'});
F.reset=()=>{GlobalSafety.reset();SymptomRouter.clear();Differential.clear();Differential.store.selected={mood:true,anxiety:true,ocd:true,router:true};const s=GlobalSafety.empty();for(const p of GlobalSafety.paths)GlobalSafety.put(s,p,false);GlobalSafety.store.signals=s;};
F.load=function(name){F.reset();const put=(module,state)=>{module.store.state=state;};
 if(['ocd','harm','violence','ocd_mood','linked_anxiety','suicide','ocd_gad','self_obsession'].includes(name))put(OCD,F.ocd());
 if(['mood','mood_anxiety','bipolar','ocd_mood','rumination'].includes(name))put(Mood,F.mood());
 if(['gad','mood_anxiety','ocd_gad'].includes(name))put(Anxiety,F.gad());
 if(name==='gad')put(OCD,F.fill(OCD)),OCD.store.state=OCD.setAnswer(OCD.store.state,'diff.gad','yes');
 if(name==='ocd_gad')OCD.store.state=OCD.setAnswer(OCD.store.state,'diff.gad','yes');
 if(name==='harm'||name==='self_obsession')OCD.store.state=F.set(OCD,OCD.store.state,{'harm.intrusive':'yes','harm.target':name==='harm'?'others':'self','harm.desire':'no','harm.intent':'no','harm.plan':'no','harm.preparation':'no'});
 if(name==='violence')OCD.store.state=F.set(OCD,OCD.store.state,{'harm.target':'others','harm.intent':'yes','harm.plan':'yes'});
 if(name==='suicide')GlobalSafety.answer('suicide.intent',true);
 if(name==='bipolar')Mood.store.state=F.set(Mood,Mood.store.state,{'mania.period':'yes','mania.features.elevated':'yes','mania.features.energy':'yes','mania.features.sleep':'yes','mania.features.driving':'yes','mania.current':'no','mania.duration':'4to6','mania.together':'yes'});
 if(name==='panic'||name==='medical')put(Anxiety,F.panic());
 if(name==='medical'){GlobalSafety.answer('medical.severeChestPain',true);GlobalSafety.answer('medical.severeBreathingDifficulty',true);GlobalSafety.answer('medical.lossOfConsciousness',true);}
 if(name==='conflict'){put(OCD,F.fill(OCD));SymptomRouter.store.profile=SymptomRouter.extract('I keep having intrusive unwanted thoughts.');}
 if(name==='missing'){put(Mood,F.mood());Mood.store.state=Mood.setAnswer(Mood.store.state,'course.duration','unknown');}
 if(name==='trauma')put(OCD,F.set(OCD,F.fill(OCD),{'obsessions.trauma':'yes'}));
 if(name==='rumination'){put(OCD,F.fill(OCD));Differential.clarify('rumination',true);}
 if(Mood.store.state.revision)Mood.store.result=Mood.assess(Mood.store.state);
 if(Anxiety.store.state.revision)Anxiety.store.result=Anxiety.assess(Anxiety.store.state,Mood.store.state);
 if(OCD.store.state.revision)OCD.store.result=OCD.assess(OCD.store.state,Mood.store.state,Anxiety.store.state);
 Differential.store.enabled=true;GlobalSafety.acknowledge();return Differential.current();
};
})(globalThis.DifferentialFixtures=globalThis.DifferentialFixtures||{});
