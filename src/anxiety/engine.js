(function(A){'use strict';
const get=Assessment.get,known=v=>v!==undefined&&v!=='unknown',yes=v=>v==='yes',count=o=>Object.values(o||{}).filter(yes).length;
A.scoreGAD7=function(s){const applicable=s.intro?.age==='adult'&&s.intro?.respondent==='self';const r=Assessment.score(applicable?s.gad7:{},7);return {...r,applicable,band:r.total===null?null:r.total<5?0:r.total<10?1:r.total<15?2:3,functionalImpact:applicable?s.gad7?.impact:null};};
A.bands=[[...I18n.pair("platform.m_92dd367e2c88")],[...I18n.pair("platform.m_893c7b7eb4b4")],[...I18n.pair("platform.m_6be2c565fac5")],[...I18n.pair("platform.m_00d0f4fdd3bc")]];
A.moodContext=function(s,moodState){const included=!!(s.intro.age==='adult'&&s.context?.useMood==='yes'&&moodState?.revision>0);const r=included?Mood.assess(moodState):null;return {requested:s.context?.useMood==='yes',included,revision:included?moodState.revision:null,complete:included?r.missing.length===0:false,depression:yes(s.context?.depression)||!!r?.episode,bipolar:yes(s.context?.activation)||!!r?.mania?.bipolarConcern,onlyMood:yes(s.context?.onlyMood),result:r};};
A.safety=(s,moodState)=>GlobalSafety.moduleSafety('anxiety',s,{mood:moodState});
A.assess=function(s,moodState){const safety=A.safety(s,moodState),screening=A.scoreGAD7(s),mood=A.moodContext(s,moodState),missing=A.missing(s);const functional=Object.fromEntries(A.sections.find(x=>x.id==='function').questions.map(q=>[q.id.split('.')[1],get(s,q.id)]));const vals=Object.values(functional).filter(v=>['0','1','2','3'].includes(v));const functionalMax=vals.length?Math.max(...vals.map(Number)):null;
const medKnown=count(s.medical.conditions)>0,medTiming=yes(s.medical.temporal),exposed=count(s.substance.exposures)>0,subTiming=['start','change','withdrawal'].includes(s.substance.temporal),substance=exposed&&subTiming;
const future=['ocd','ptsd','adhd','psychosis'].filter(k=>yes(s.context[k]));
const rulesUnknown=['medical','substance','context'].flatMap(id=>A.sections.find(s=>s.id===id).questions).filter(q=>!known(get(s,q.id))).map(q=>q.id);
const competing=medKnown||medTiming||substance||mood.depression||mood.bipolar||mood.onlyMood||future.length>0||rulesUnknown.length>0;
const directions=A.disorders.map(d=>({...d,level:0,support:[],against:[],unresolved:[],duration:null,impact:null,pattern:false}));
const add=(arr,key,z,e)=>arr.push({key,text:[z,e]});
function check(d,key,ok,z,e){const value=get(s,key);if(!known(value)){add(d.unresolved,key,z,e);return false;}add(ok?d.support:d.against,key,z,e);return ok;}
function yn(d,key,z,e){return check(d,key,yes(get(s,key)),z,e);}
function group(d,prefix,rows,min,z,e){const n=rows.filter(r=>get(s,prefix+'.'+r[0])==='yes').length;for(const [id,zh,en] of rows){const v=get(s,prefix+'.'+id);add(v==='yes'?d.support:v==='no'?d.against:d.unresolved,prefix+'.'+id,zh,en);}if(n<min)add(d.against,prefix+'.count',...I18n.formatPair('explanations.group',{label:[z,e],count:n,minimum:min}));else add(d.support,prefix+'.count',...I18n.formatPair('explanations.group',{label:[z,e],count:n,minimum:min}));return n>=min;}
for(const d of directions.filter(d=>A.branches.some(b=>b[0]===d.id))){const id=d.id,gate=s.clusters[id];if(gate==='no'){d.level=1;add(d.against,'cluster',...I18n.pair("platform.m_df8ac2e9631f"));continue;}if(gate===undefined){add(d.unresolved,'cluster',...I18n.pair("platform.m_7442b8be9106"));continue;}
const checks=[];
if(id==='gad'){checks.push(yn(d,'gad.multiple',...I18n.pair("platform.m_2b81c4b67889")),yn(d,'gad.excessive',...I18n.pair("platform.m_bf99a93c6c8a")),yn(d,'gad.control',...I18n.pair("platform.m_0f1315293003")),yn(d,'gad.mostDays',...I18n.pair("platform.m_9f99a2d8450f")),group(d,'gad.symptoms',A.gadSymptoms,s.intro.age==='adult'?3:1,...I18n.pair("platform.m_4a05038eaec9")));}
if(id==='panic'){checks.push(yn(d,'panic.abrupt',...I18n.pair("platform.m_0e68d20d3ec7")),group(d,'panic.symptoms',A.panicSymptoms,4,...I18n.pair("platform.m_13ebf06bbd05")),yn(d,'panic.recurrent',...I18n.pair("platform.m_8cdc4c37f261")),yn(d,'panic.unexpected',...I18n.pair("platform.m_5b038112ac72")));const aftermath=yes(s.panic.concern)||yes(s.panic.behavior);for(const [k,z,e]of [['concern',...I18n.pair("platform.m_471e7249909a")],['behavior',...I18n.pair("platform.m_ac777ab3caba")]])yn(d,'panic.'+k,z,e);checks.push(aftermath,yn(d,'panic.month',...I18n.pair("platform.m_349b4e6debf6")));d.duration=s.panic.month;}
if(id==='agora'){checks.push(group(d,'agora.places',A.agoraPlaces,2,...I18n.pair("platform.m_ed9adda1ca67")),yn(d,'agora.escape',...I18n.pair("platform.m_d989aed5b03d")),yn(d,'agora.usually',...I18n.pair("platform.m_fa874a013674")));}
if(id==='social'){checks.push(yn(d,'social.scrutiny',...I18n.pair("platform.m_30fce4bd7151")),yn(d,'social.negative',...I18n.pair("platform.m_97679dd6efec")),group(d,'social.places',A.socialPlaces,1,...I18n.pair("platform.m_19d47f56c4ec")),yn(d,'social.usually',...I18n.pair("platform.m_c8be179f7e39")));}
if(id==='specific'){checks.push(group(d,'specific.triggers',A.specificTriggers,1,...I18n.pair("platform.m_802f454fb95c")),yn(d,'specific.tied',...I18n.pair("platform.m_f43a848ae159")),yn(d,'specific.immediate',...I18n.pair("platform.m_d4fc8d2c074c")));}
if(['agora','social','specific'].includes(id))checks.push(yn(d,id+'.avoid',...I18n.pair("platform.m_dade015ca3ed")),yn(d,id+'.disproportion',...I18n.pair("platform.m_f77c262b19ec")));
if(id==='separation')checks.push(yn(d,'separation.excessive',...I18n.pair("platform.m_42be6ffeaa7b")),group(d,'separation.symptoms',A.separationSymptoms,3,...I18n.pair("platform.m_11892ed89119")));
if(id!=='panic'){d.duration=get(s,id+'.duration');const child=id==='separation'&&['youth','child'].includes(s.intro.age);checks.push(check(d,id+'.duration',child?['1to5m','6plus'].includes(d.duration):d.duration==='6plus',...I18n.pair(child?'common.fourWeeks':'common.sixMonths')));}
d.impact=get(s,id+'.impact');checks.push(check(d,id+'.impact',['2','3'].includes(d.impact),...I18n.pair("platform.m_af8d960e1e1c")));
d.pattern=checks.every(Boolean);const branchMissing=A.sections.find(sec=>sec.id===id).questions.filter(q=>!known(get(s,q.id)));
d.level=d.pattern?3:d.support.length?2:0;if(!d.pattern&&!branchMissing.length)d.level=1;
if(gate==='unknown'){d.level=Math.min(d.level,2);add(d.unresolved,'gate',...I18n.pair("platform.m_aef52a282b4a"));}
if(competing&&d.level===3)d.level=2;
if(medKnown||medTiming)add(d.unresolved,'medicalExplanation',...I18n.pair("platform.m_0de3d616326a"));
if(substance)add(d.unresolved,'substanceExplanation',...I18n.pair("platform.m_645943c987b7"));
if(mood.depression||mood.bipolar||mood.onlyMood)add(d.unresolved,'moodExplanation',...I18n.pair("platform.m_212a2cee35e4"));
if(future.length)add(d.unresolved,'otherCategory',...I18n.pair("platform.m_e51711881b38"));
if(rulesUnknown.length)add(d.unresolved,'unknownExplanations',...I18n.pair("platform.m_d02a6f645f4b"));
if(branchMissing.length&&d.level===3)d.level=2;
if(s.intro.age!=='adult'&&d.level===3){d.level=2;add(d.unresolved,'development',...I18n.pair("platform.m_ded0c1018bea"));}
if(d.pattern&&functionalMax===0){d.level=Math.min(d.level,2);add(d.unresolved,'impactConflict',...I18n.pair("platform.m_6cec340a8216"));}
}
const med=directions.find(d=>d.id==='medical');med.level=medKnown||medTiming||s.clusters.medical==='yes'?2:rulesUnknown.some(k=>k.startsWith('medical.'))?0:1;
for(const [id,z,e]of A.medicalConditions){const v=get(s,'medical.conditions.'+id);add(v==='yes'?med.support:v==='no'?med.against:med.unresolved,'medical.'+id,z,e);}
check(med,'medical.temporal',medTiming,...I18n.pair("platform.m_a9af5a061a71"));add(med.unresolved,'causality',...I18n.pair("platform.m_64c7c83627eb"));
const sub=directions.find(d=>d.id==='substance');sub.level=substance||s.clusters.substance==='yes'?2:!known(s.substance.temporal)?0:1;
for(const [id,z,e]of A.exposures){const v=get(s,'substance.exposures.'+id);add(v==='yes'?sub.support:v==='no'?sub.against:sub.unresolved,'substance.'+id,z,e);}
check(sub,'substance.temporal',subTiming,...I18n.pair("platform.m_8c49247f1dfd"));if(yes(s.substance.before))add(sub.against,'preexisting',...I18n.pair("platform.m_0e62b0af0ce5"));add(sub.unresolved,'causality',...I18n.pair("platform.m_90cf085fe860"));
const eligible=s.intro.agree==='yes'&&['adult','youth','child'].includes(s.intro.age)&&(s.intro.age!=='child'||s.intro.respondent==='caregiver');
const leading=safety.action==='immediate'||!eligible?[]:directions.filter(d=>d.pattern||d.id==='substance'&&substance||d.id==='medical'&&(medKnown||medTiming)).map(d=>d.id);
const unresolved=A.plan(s).flatMap(sec=>sec.questions).filter(q=>!known(get(s,q.id))).map(q=>({key:q.id,text:q.label}));
const discrepancy=screening.total>=10&&!directions.find(d=>d.id==='gad').pattern;
return {version:A.version,revision:s.revision,assessedAt:new Date().toISOString(),screening,safety,mood:{...mood,result:undefined},functional,functionalMax,directions,leading,missing,unresolved,eligible,discrepancy,future,ruleouts:{medical:medKnown||medTiming,substance,unknown:rulesUnknown,competing:!!competing},reported:A.plan(s).flatMap(sec=>sec.questions).filter(q=>get(s,q.id)==='yes').map(q=>({key:q.id,text:q.label})),absent:A.plan(s).flatMap(sec=>sec.questions).filter(q=>get(s,q.id)==='no').map(q=>({key:q.id,text:q.label}))};
};
})(globalThis.Anxiety=globalThis.Anxiety||{});
