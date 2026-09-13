(function(G){'use strict';
// Positive evidence wins across overlapping questionnaire fields; missing values never erase facts.
const write=(out,path,value)=>{const old=G.get(out,path);return G.put(out,path,old===true||value===true?true:old===false||value===false?false:'unknown');};
const tri=v=>v==='yes'?true:v==='no'?false:'unknown';
G.phqSafety=state=>{const value=state?.phq?.[8];return {item9:[0,1,2,3,'0','1','2','3'].includes(value)?Number(value):null};};
G.adapt=function(module,state,phq={}){const out=G.empty();if(!state||typeof state!=='object'||Array.isArray(state))return {signals:out,failed:true};let failed=['intro','safety','harm','mania','psychosis','obsessions','avoid','mental','context'].some(k=>state[k]!==undefined&&(!state[k]||typeof state[k]!=='object'||Array.isArray(state[k])));const map=(from,to)=>{const v=G.get(state,from);if(v!==undefined&&!['yes','no','unknown'].includes(v))failed=true;return write(out,to,tri(v));};
for(const [a,b]of Object.entries({unableSafe:'suicide.unableToStaySafe',current:'suicide.currentIdeation',passive:'suicide.passiveDeathWish',thoughts:'suicide.suicidalIdeation',plan:'suicide.plan',intent:'suicide.intent',means:'suicide.accessToMeans',attempt:'suicide.recentAttempt',selfharm:'selfHarm.recentBehavior',injury:'selfHarm.medicalInjuryConcern'}))map('safety.'+a,b);
map('intro.immediate','other.immediateDanger');
if(module==='mood'){
  phq=G.phqSafety(state);
  if(phq.item9>0||state.symptoms?.death?.present==='yes')write(out,'screen.positiveUnspecified',true);
  if(state.mania?.current==='yes'){
    map('mania.features.energy','mania.markedlyIncreasedEnergy');map('mania.features.sleep','mania.severelyReducedNeedForSleep');
    map('mania.psychosis','mania.psychoticFeatures');
    if(state.mania.psychosis==='yes'||state.mania.impact==='3'||state.mania.hospital==='yes'){write(out,'mania.impairedJudgment',true);write(out,'mania.inabilityToControlBehavior',true);}
  }
}
if(module==='anxiety'){
 for(const [a,b]of Object.entries({chest:'severeChestPain',breath:'severeBreathingDifficulty',faint:'lossOfConsciousness',otherEmergency:'otherImmediateMedicalDanger'}))map('intro.'+a,'medical.'+b);
 if(state.context?.acuteActivation==='yes'){write(out,'mania.impairedJudgment',true);write(out,'mania.inabilityToControlBehavior',true);}
}
if(module==='ocd'){
 map('psychosis.reality','psychosis.impairedRealityTesting');map('psychosis.fixed','psychosis.bizarreBeliefs');
 const h=state.harm||{};const self=['self','both'].includes(h.target),others=['others','both'].includes(h.target);
 if(h.intrusive==='yes'){
  if(self||!others){write(out,'suicide.intrusiveThought',true);write(out,'suicide.thoughtsUnwanted',true);}
  if(others||!self){write(out,'harmToOthers.violentThoughts',true);write(out,'harmToOthers.thoughtsUnwanted',true);write(out,'harmToOthers.distress',true);}
 }
 for(const [key,sk,vk]of [['desire','desireToDie','actualDesire'],['intent','intent','intent'],['plan','plan','plan'],['preparation','preparation','preparation']]){
  if(h[key]==='no'){write(out,'suicide.'+sk,false);write(out,'harmToOthers.'+vk,false);}
  if(h[key]==='yes'){
   if(self)write(out,'suicide.'+sk,true);if(others)write(out,'harmToOthers.'+vk,true);
   if(!self&&!others)write(out,'other.'+(key==='desire'?'harmDesire':'harmAction'),true);
  }
 }
 map('harm.selfIntent','suicide.intent');if(h.selfIntent===undefined&&h.intent!==undefined&&self)write(out,'suicide.intent',tri(h.intent));
 map('harm.othersIntent','harmToOthers.intent');if(h.othersIntent===undefined&&h.intent!==undefined&&others)write(out,'harmToOthers.intent',tri(h.intent));
 if(h.desire==='no'&&h.intent==='no'){write(out,'suicide.desireToDie',false);write(out,'suicide.intent',false);write(out,'harmToOthers.actualDesire',false);write(out,'harmToOthers.intent',false);}
 // Separate specific intent always wins over a contradictory generic response.
 if(h.selfIntent==='yes')write(out,'suicide.intent',true);if(h.othersIntent==='yes')write(out,'harmToOthers.intent',true);
 if(state.obsessions?.ego==='yes'&&h.intrusive==='yes'){write(out,'harmToOthers.thoughtsUnwanted',true);write(out,'suicide.thoughtsUnwanted',true);}
 if(Object.values(state.avoid||{}).includes('yes'))write(out,'harmToOthers.avoidance',true);
 if(Object.values(state.mental||{}).includes('yes'))write(out,'harmToOthers.neutralization',true);
}
const extra=state.safetySignals?G.validate(state.safetySignals):{valid:true,signals:G.empty()};const merged=G.merge([out,extra.signals]);return {signals:merged.signals,failed:failed||!extra.valid};};
G.moduleSafety=function(module,state,related={},phq={}){const own=G.adapt(module,state,phq);const inputs=[own.signals];if(G.store?.signals)inputs.push(G.store.signals);let failed=own.failed||G.store?.failed===true;const relatedFindings=[];
for(const [name,s]of Object.entries(related)){if(!s?.revision)continue;const p=name==='mood'&&globalThis.Mood?G.phqSafety(s):{};const a=G.adapt(name,s,p);inputs.push(a.signals);failed ||= a.failed;const r=G.evaluate(a.signals);relatedFindings.push(...r.findings.map(f=>({...f,key:name+'.'+(name==='mood'&&s.safety?.current==='yes'&&f.key==='SUICIDE_ACTION'?'current':f.key),text:[(name==='mood'?'情绪模块：':'关联模块：')+f.text[0],name+' module: '+f.text[1]]})));}
const r=G.evaluate(G.merge(inputs).signals,{failed});const legacy=G.legacy(r);const oldUnknown=['unableSafe','current','passive','thoughts','plan','intent','means','attempt','selfharm','injury'].filter(k=>state?.safety?.[k]===undefined||state?.safety?.[k]==='unknown');
legacy.unknown=[...new Set([...oldUnknown,...r.unresolvedCriticalSignals])];
legacy.needsCheck=(phq.item9>0||state?.symptoms?.death?.present==='yes')&&['unableSafe','current','passive','thoughts','plan','intent','means','attempt','selfharm','injury','support'].some(k=>state?.safety?.[k]===undefined);
// Legacy display compatibility only. Global status always retains unknowns and drives interruption.
if(module==='ocd'&&r.urgency!=='acute'&&!r.findings.some(f=>['elevated','acute'].includes(f.urgency))&&state?.harm?.desire==='no'&&state?.harm?.intent==='no')legacy.action='noneTriggered';
legacy.acute.push(...relatedFindings.filter(f=>f.urgency==='acute'));legacy.prompt.push(...relatedFindings.filter(f=>f.urgency!=='acute'));
return legacy;};
})(globalThis.GlobalSafety=globalThis.GlobalSafety||{});
