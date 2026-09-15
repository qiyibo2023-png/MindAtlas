// Deterministic synthetic UX scenarios. Metrics are not clinical validation.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const create=require('../tests/differential-v2-harness.cjs');
const routerCases=require('../benchmarks/router-v1/cases.cjs');
const directions={mood:'both',anxiety:'worry',ocd:'checking',trauma:'reliving',adhd:'longstanding',eating:'restriction',psychosis:'awake'};
const scenarios=Object.entries(directions).map(([domain,value])=>({id:'route-'+domain,text:['不好','bad'],steps:[['answer','entryBroad',domain],['answer',null,value]],state:'ROUTE_RECOMMENDATION',route:domain}));
scenarios.push(
 {id:'vague',text:['感觉不太对','I do not feel right.'],steps:[['answer','entryBroad','unknown']],state:'DIRECT_ASSESSMENT_SELECTION'},
 {id:'one-symptom',text:['我感到情绪低落。','I feel depressed.'],steps:[['answer','entryMood','interest']],state:'ROUTE_RECOMMENDATION',route:'mood'},
 {id:'prefer',text:['不好','bad'],steps:[['answer','entryBroad','prefer']],state:'DIRECT_ASSESSMENT_SELECTION'},
 {id:'other',text:['不好','bad'],steps:[['answer','entryBroad','other']],state:'UNSUPPORTED_NAVIGATION'},
 {id:'repeat-uncertainty',text:['不好','bad'],steps:[['answer','entryBroad','unknown'],['resume'],['resume'],['resume']],state:'DIRECT_ASSESSMENT_SELECTION'},
 {id:'budget',text:['不好','bad'],steps:[['answer','entryBroad','anxiety'],['back'],['answer','entryBroad','anxiety'],['back'],['answer','entryBroad','anxiety']],state:'DIRECT_ASSESSMENT_SELECTION',exhausted:true},
 {id:'direct',text:['不好','bad'],steps:[['action','direct'],['start','ocd']],state:'DIRECT_ASSESSMENT_SELECTION',manual:'ocd'},
 {id:'knowledge',text:['不好','bad'],steps:[['action','knowledge']],state:'STOPPED'},
 {id:'stop',text:['不好','bad'],steps:[['action','stop']],state:'STOPPED'},
 {id:'edit',text:['我感到情绪低落。','I feel depressed.'],steps:[['action','edit'],['replace']],state:'ROUTE_RECOMMENDATION',route:'ocd'},
 {id:'safety-return',text:['不好','bad'],steps:[['answer','entryBroad','anxiety'],['safety-return']],state:'ENTRY_BROAD_CLARIFICATION'},
 {id:'suicide-emergence',text:['不好','bad'],steps:[['answer','entryBroad','anxiety'],['danger','suicide']],state:'SAFETY_CLARIFICATION',acute:true},
 {id:'violence-emergence',text:['不好','bad'],steps:[['answer','entryBroad','anxiety'],['danger','violence']],state:'SAFETY_CLARIFICATION',acute:true},
 {id:'medical-emergence',text:['不好','bad'],steps:[['answer','entryBroad','anxiety'],['danger','medical']],state:'SAFETY_CLARIFICATION',acute:true}
);
const mixed=locale=>routerCases.find(r=>r.pairId==='mixed-mood-ocd'&&r.language===locale).text;
scenarios.push({id:'ambiguous-multiple',text:[mixed('zh'),mixed('en')],steps:[['answer','moodOcd','both']],state:'ROUTE_RECOMMENDATION',multiple:true});
for(const domain of ['autism','sleep','substance','personality','somatic','grief','cognitive'])scenarios.push({id:'unsupported-'+domain,text:['zh','en'].map(locale=>routerCases.find(r=>r.pairId==='unsupported-'+domain&&r.language===locale).text),steps:[],state:'UNSUPPORTED_NAVIGATION'});
function run(){
 const metrics={involuntaryRestartCount:0,deadEndCount:0,duplicateQuestionCount:0,unnecessaryRepeatedSafetyUICount:0,routeCompletionCount:0,clarificationBudgetExhaustionCount:0,bilingualParity:{passed:0,total:scenarios.length}};
 const results=[];
 for(const scenario of scenarios){const shapes=[];
  for(const locale of [0,1]){
   const c=create(),e=c.EntryFlow,r=c.SymptomRouter,g=c.GlobalSafety;c.lang=locale;
   const seen=new Set(),trace=[];let explicitBack=false;
   function observe(event,allowDescription=false){
    const gate=e.checkSafety(),s=e.store;
    if(!allowDescription&&s.state==='ENTRY_DESCRIPTION')metrics.involuntaryRestartCount++;
    if(gate.show&&g.store.ack===g.fingerprint(gate.result)&&!gate.result.requiresInterruption)metrics.unnecessaryRepeatedSafetyUICount++;
    const html=r.render();if(!gate.result.requiresInterruption&&!/data-entry-action=|data-entry-answer=|data-global=|global-entry-form/.test(html))metrics.deadEndCount++;
    const q=s.question;if(['ROUTER_CLARIFICATION','ENTRY_BROAD_CLARIFICATION'].includes(s.state)&&q){
     if(event!=='resume'&&trace.at(-1)?.question!==q.id&&seen.has(q.id)&&!explicitBack)metrics.duplicateQuestionCount++;
     if(s.state==='ENTRY_BROAD_CLARIFICATION'&&q.id!=='entryBroad'&&q.options.filter(o=>Object.keys(o.effects).length).some(o=>Object.keys(o.effects).every(p=>r.store.v2.profile.facts[p]!=='unknown')))metrics.duplicateQuestionCount++;

    }
    trace.push({event,state:s.state,question:q?.id||null,used:s.used});explicitBack=false;
   }
   function resolve(){if(g.current().requiresInterruption)return;for(const p of g.current().followup)g.answer(p,false);g.acknowledge();r.resume();}
   e.submit(scenario.text[locale]);resolve();observe('submitted');
   for(const [action,id,value]of scenario.steps){
    if(action==='answer'){seen.add(id||e.store.question?.id);assert(e.respond(id||e.store.question?.id,value),scenario.id);resolve();}
    if(action==='back'){assert(e.back());explicitBack=true;}
    if(action==='resume')r.resume();
    if(action==='action'){const dest=e.action(id);if(id==='knowledge')assert.equal(dest,'library');}
    if(action==='start'){const profile=JSON.stringify(r.store);assert.equal(e.start(id),id);assert.equal(JSON.stringify(r.store),profile);}
    if(action==='replace'){e.submit(locale?'I repeatedly check the door.':'我反复检查门。');resolve();}
    if(action==='safety-return'){
     const before=JSON.stringify([r.store.v2,e.store.answers,e.store.used,e.store.question]);
     g.answer('suicide.intent','unknown');e.reconcile();assert.equal(e.store.state,'SAFETY_CLARIFICATION');g.answer('suicide.intent',false);g.acknowledge();r.resume();
     assert.equal(JSON.stringify([r.store.v2,e.store.answers,e.store.used,e.store.question]),before);
    }
    if(action==='danger'){
     const raw={suicide:['我打算自杀，已经有计划。','I intend to kill myself tonight and have a plan.'],violence:['我打算杀死别人，已经有计划。','I intend to kill someone tonight and have a plan.'],medical:['我胸痛剧烈而且无法呼吸。','I have severe chest pain and cannot breathe.']}[id][locale];
     assert.equal(e.addText(raw),'safety');assert.equal(g.current().urgency,'acute');
    }
    observe(action,action==='action'&&id==='edit');
   }
   assert.equal(e.store.state,scenario.state,scenario.id);
   if(scenario.route)assert.equal(r.store.result.primaryRoute,scenario.route,scenario.id);
   if(scenario.multiple){assert.equal(r.store.result.primaryRoute,null);assert.equal(r.store.result.candidateRoutes.length,2);}
   if(scenario.acute){for(let i=0;i<3;i++){r.render();r.resume();assert.equal(e.store.state,'SAFETY_CLARIFICATION');}assert(!r.render().includes('data-entry-answer'));}
   if(scenario.exhausted)assert.equal(e.store.used,3);
   if(e.store.used===3)metrics.clarificationBudgetExhaustionCount++;
   if(e.store.state==='ROUTE_RECOMMENDATION')metrics.routeCompletionCount++;
   shapes.push(JSON.stringify({state:e.store.state,used:e.store.used,answers:e.store.answers,facts:r.store.v2?.profile.facts,route:r.store.result?.candidateRoutes.map(x=>[x.domain,x.rank]),safety:g.current().urgency}));
   results.push({id:scenario.id+'-'+(locale?'en':'zh'),passed:true,trace});
  }
  assert.equal(shapes[0],shapes[1],scenario.id+' parity');metrics.bilingualParity.passed++;
 }
 for(const key of ['involuntaryRestartCount','deadEndCount','duplicateQuestionCount','unnecessaryRepeatedSafetyUICount'])assert.equal(metrics[key],0,key);
 return {version:'assessment-entry-flow-v1.0.0',synthetic:true,clinicalValidation:false,scenarioPairs:scenarios.length,localizedScenarios:results.length,metrics,results};
}
module.exports={run,scenarios};
if(require.main===module){process.chdir(path.resolve(__dirname,'..'));const result=run();fs.mkdirSync('work',{recursive:true});fs.writeFileSync('work/entry-scenario-results.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify({scenarioPairs:result.scenarioPairs,localizedScenarios:result.localizedScenarios,metrics:result.metrics},null,2));}
