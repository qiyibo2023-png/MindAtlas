(function(V,R,X){'use strict';
// Transient text is never retained in the structured profile or evidence records.
V.extract=function(raw){if(typeof raw!=='string'||!raw.trim()||raw.length>4000)throw Error('Invalid symptom input');const p=V.empty();let asked=[],previousSubject='self';
for(const c of X.segments(raw)){const old=V.legacy.extract(c.text),paths=new Map(old.observations.map(o=>[o.path,o.value]));
for(const path of R.paths)if(R.get(old,path)!=='unknown')paths.set(path,R.get(old,path));
for(const [path,pattern]of Object.entries(V.patterns))if(pattern.test(c.text))paths.set(path,true);
for(const oldFlag of ['unsupported.trauma','unsupported.attention','unsupported.eating','unsupported.psychotic'])paths.delete(oldFlag);
if(![...paths.keys()].some(k=>k!=='adhd.crossSetting'&&(k.startsWith('adhd.')||k==='general.attention')))paths.delete('adhd.crossSetting');
if(/on the (?:telephone|phone)|\u5728\u7535\u8bdd\u91cc|inner voice|\u5185\u5fc3\u7684\u58f0\u97f3/.test(c.text)&&!/no (?:phone|telephone)|\u6ca1\u6709\u7535\u8bdd/.test(c.text))for(const path of paths.keys())if(path.startsWith('psychosis.'))paths.set(path,'unknown');
const reply=/^\s*(?:i (?:said|answered) no|\u6211(?:\u8bf4|\u56de\u7b54)(?:\u6ca1\u6709|\u4e0d))/.test(c.text);
if(reply)for(const path of asked)paths.set(path,false);
const subject=reply?'self':c.subject==='unclear'?previousSubject:c.subject;
if(/^\s*i (?:do not|don't) experience (?:this|these)\s*:/.test(c.text))c.polarity='denied';
if(/\b(?:maybe i|i might have|i am not sure (?:if|whether))\b|\u6211\u4e0d\u786e\u5b9a\u662f\u5426/.test(c.text))c.polarity='uncertain';
const eligible=subject==='self'&&c.temporality==='current'&&!c.question&&!c.quoted;
if(c.question)asked=[...paths.keys()];
for(const [path,original]of paths){const exposure=path==='trauma.exposure'&&subject==='self'&&c.temporality==='historical'&&!c.question&&!c.quoted;const value=reply?false:(!eligible&&!exposure)||c.polarity==='uncertain'?'unknown':c.polarity==='denied'?false:original;p.evidence.push({id:'e'+p.evidence.length,path,value,source:'extraction',context:{subject,temporality:c.temporality,polarity:reply?'denied':c.polarity,quotationStatus:c.question?'clinician_question':c.quoted?'quoted_speech':subject==='other'?'reported_speech':'direct_self_report',certainty:value==='unknown'?'uncertain':'reported'}});}
if(eligible)for(const [k,v]of Object.entries(old.course))if(v!=='unknown')p.course[k]=v;
previousSubject=subject;
}if(p.evidence.length>500)throw Error('Too many observations');return V.normalize(p);};
V.patterns={
 'trauma.exposure':/assault|traumatic event|\u88ad\u51fb|\u521b\u4f24\u4e8b\u4ef6/,
 'trauma.reliving':/reliving|flashback|\u91cd\u73b0|\u95ea\u56de/,
'eating.loss':/(?:binge|eating).{0,30}(?:lose|loss of) control|\u66b4\u98df.{0,8}\u5931\u53bb\u63a7\u5236/,
'mood.episodicElevation':/distinct (?:episodes|periods).{0,35}(?:energ|elevat)|\u9636\u6bb5\u6027.{0,12}\u7cbe\u529b\u65fa\u76db/,
'mood.reducedNeedForSleep':/little sleep.{0,30}(?:not tired|without tired)|\u7761\u5f97\u5f88\u5c11.{0,12}\u4e0d\u7d2f/,
'adhd.crossSetting':/both (?:school|home|work).{0,25}(?:school|home|work)|\u5b66\u6821\u548c\u5bb6|\u5de5\u4f5c\u548c\u5bb6/,
'general.attention':/cannot concentrate|can't concentrate|trouble focusing|\u65e0\u6cd5\u96c6\u4e2d\u6ce8\u610f|\u6ce8\u610f\u529b\u4e0d\u96c6\u4e2d/,
'general.onsetRecent':/only (?:started|began) recently|\u6700\u8fd1\u624d\u5f00\u59cb/,
'general.suddenCognition':/sudden.{0,20}(?:memory|cognitive)|\u7a81\u7136.{0,12}(?:\u8bb0\u5fc6|\u8ba4\u77e5)/,
'general.memory':/memory (?:loss|problems)|\u8bb0\u5fc6\u95ee\u9898/,
'psychosis.disorganization':/speech (?:is |has become )?disorganized|\u8a00\u8bed\u7d0a\u4e71/,
'psychosis.realityDifficulty':/cannot distinguish.{0,20}real|\u65e0\u6cd5\u5206\u8fa8.{0,10}\u771f\u5b9e/,
'trauma.dissociation':/detached from myself|surroundings.{0,12}unreal|\u4e0e\u81ea\u5df1\u5206\u79bb|\u5468\u56f4.{0,6}\u4e0d\u771f\u5b9e/,
'trauma.nightmares':/trauma.{0,15}nightmares|\u521b\u4f24.{0,8}\u5669\u68a6/,
'eating.lowInterest':/little interest in (?:food|eating)|\u5bf9\u98df\u7269\u6ca1\u5174\u8da3/,
'eating.contamination':/food.{0,20}contaminat|\u98df\u7269.{0,8}\u6c61\u67d3/,
'unsupported.autism':/autism|autistic|\u81ea\u95ed\u75c7|\u5b64\u72ec\u75c7/,
'unsupported.substance':/addict|substance use|drug use|\u6210\u763e|\u7269\u8d28\u4f7f\u7528/,
'unsupported.sleep':/sleep apnea|sleepwalking|\u7761\u7720\u547c\u5438\u6682\u505c|\u68a6\u6e38/,
'unsupported.somatic':/somatic symptoms|\u8eaf\u4f53\u75c7\u72b6/,
'unsupported.personality':/personality pattern|personality disorder|\u4eba\u683c\u6a21\u5f0f|\u4eba\u683c\u969c\u788d/,
'unsupported.cognitive':/memory (?:loss|problems)|cognitive decline|\u8bb0\u5fc6\u95ee\u9898|\u8ba4\u77e5\u4e0b\u964d/,
'unsupported.grief':/bereavement|grieving|grief|\u4e27\u4eb2|\u54c0\u4f24/,
'unsupported.bdd':/body dysmorph|\u8eaf\u4f53\u53d8\u5f62/,
'unsupported.hoarding':/hoarding|\u56e4\u79ef/};
})(globalThis.RouterV2,globalThis.SymptomRouter,globalThis.ExperienceContext);
