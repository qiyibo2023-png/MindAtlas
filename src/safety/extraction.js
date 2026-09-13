(function(G){'use strict';
// Local, bounded bilingual pattern extraction. It is not a general language model or validated screener.
// Negative statements do not erase positive statements from another clause. Raw text is never returned.
G.extract=function(raw){if(typeof raw!=='string'||raw.length>4000)return {status:'failed',signals:G.empty()};const s=G.empty(),t=raw.normalize('NFKC').toLowerCase().replace(/[’‘]/g,"'");if(!t.trim())return {status:'failed',signals:s};
const clauses=t.split(/[.!?。！？;；\n]|\bbut\b|\bhowever\b|但是|但我/).filter(Boolean);
const mark=(p,v=true)=>{const old=G.get(s,p);G.put(s,p,old===true?true:v);};
const match=(re,negative)=>clauses.some(c=>re.test(c)&&!(negative&&negative.test(c)));
const notSelf=/(?:don't|do not|never|not)\s+(?:actually\s+)?(?:want|intend|plan)(?:\s+to)?\s+(?:die\b|(?:kill|hurt) myself\b|end my life\b)|不想死|不想自杀|没有自杀意图|不打算自杀|不打算结束(?:自己|我)的生命/;
const notOther=/(?:don't|do not|never)\s+(?:actually\s+)?(?:want|intend|plan)\s+to\s+(?:hurt|kill|stab) (?:him|her|them|my partner|my baby|someone|anyone|others)\b|不想伤害(?:他|她|别人|宝宝|伴侣)|没有伤害(?:他|她|别人).*意图|不打算伤害(?:他|她|别人)/;
const feared=/afraid|terrified|fear(?:ed|ing)?|what if|害怕|担心/;
const intrusive=/ocd|obsess|intrusive|keep imagin|images of|强迫|侵入|脑(?:海|子里).*画面/.test(t)&&/terrif|scared|unwanted|frighten|\bfear\b|害怕|恐惧|不受欢迎/.test(t);
if(/never wake up|not wake up|不再醒来|不要醒来|一睡不醒/.test(t)){mark('suicide.passiveDeathWish');}
if(match(/\b(?:want|wish) to die\b|想死|希望死/,notSelf))mark('suicide.desireToDie');
if(match(/(?:thinking|think) about (?:(?:killing|hurting) myself|suicide\b)|自杀想法|想自杀/,new RegExp(notSelf.source+'|(?:not|never) (?:thinking|think) about (?:suicide|killing myself|hurting myself)|没有自杀想法|不在想自杀'))&&!intrusive)mark('suicide.suicidalIdeation');
if(s.suicide.suicidalIdeation===true&&/right now|currently|此刻|现在/.test(t))mark('suicide.currentIdeation');
if(match(/(?:going to|intend to|will) (?:kill myself|end my life)|打算(?:自杀|结束(?:自己|我)的生命)|准备自杀|今晚.*自杀|要自杀/,new RegExp(notSelf.source+'|'+feared.source)))mark('suicide.intent');
if(match(/(?:already (?:have|made)|have a|specific) (?:suicide )?plan|已经.*计划|自杀计划/,/no .*plan|no plan|don't have|do not have|没有.*计划|无自杀计划|afraid|terrified|害怕|担心/)&&/myself|suicid|end my life|自杀|结束(?:自己|我)?的?生命/.test(t))mark('suicide.plan');
if(match(/(?:prepared|preparing|preparation)|已经准备/,/not prepared|no preparation|没有.*准备|afraid|terrified|害怕|担心/)&&/myself|suicid|自杀/.test(t))mark('suicide.preparation');
if(/already planned how to do it|已经计划好怎么做/.test(t))mark('screen.ambiguousDistress');
if(/(?:can't|cannot|unable to) (?:stay|keep myself) safe|无法保证.*安全|不能保证.*安全/.test(t))mark('suicide.unableToStaySafe');
if(/attempted suicide (?:today|yesterday|recently)|昨天.*自杀未遂|近期自杀未遂/.test(t))mark('suicide.recentAttempt');
if(notSelf.test(t)){mark('suicide.desireToDie',false);if(/no (?:suicidal )?intent|没有自杀意图|不打算自杀/.test(t))mark('suicide.intent',false);}
if(intrusive&&/suicid|self.harm|myself|自杀|自伤|自己/.test(t)){mark('suicide.intrusiveThought');mark('suicide.thoughtsUnwanted');}
if(/imagining stabbing|images of (?:stabbing|hurting)|thoughts of (?:hurting|harming|killing)|伤害.*(?:侵入性想法|画面)|伤人.*念头/.test(t)){mark('harmToOthers.violentThoughts');if(intrusive){mark('harmToOthers.thoughtsUnwanted');mark('harmToOthers.distress');}}
if(/hide knives|avoid.*kniv|藏.*刀|回避.*刀/.test(t))mark('harmToOthers.avoidance');
if(match(/(?:want to|intend to|going to|will) (?:kill|stab|hurt) (?:him|her|them|my partner|my baby|someone)|想杀他|要杀他|想伤害他|打算伤害他/,new RegExp(notOther.source+'|'+feared.source))){mark('harmToOthers.actualDesire');mark('harmToOthers.violentThoughts');if(/tonight|now|马上|今晚|现在/.test(t))mark('harmToOthers.imminence');if(/decided how|plan|prepared|准备|计划/.test(t))mark('harmToOthers.plan');}
if(match(/(?:intend to|going to|will) (?:hurt|kill|stab) (?:him|her|them|someone|my partner|my baby)\b|有伤人意图|打算伤害他|打算杀他/,new RegExp(notOther.source+'|'+feared.source)))mark('harmToOthers.intent');
if(s.harmToOthers.actualDesire===true){
 if(/him|her|them|my partner|my baby|他|她/.test(t))mark('harmToOthers.targetIdentified');
 if(match(/already prepared|have prepared|已经准备/,/not prepared|没有.*准备/))mark('harmToOthers.preparation');
 if(/prepared.*(?:knife|weapon)|准备.*(?:刀|武器)/.test(t))mark('harmToOthers.accessToMeans');
}
if(notOther.test(t)){mark('harmToOthers.actualDesire',false);if(/no intent|没有.*意图/.test(t))mark('harmToOthers.intent',false);}
if(match(/voices?.*(?:tell|telling|command)|声音.*(?:叫|让|命令)/, /don't hear|do not hear|no voices|没有声音|没听到声音/)){mark('psychosis.hallucinations');mark('psychosis.commandHallucinations');if(/jump|kill myself|hurt myself|跳|自杀|伤害自己/.test(t))mark('psychosis.commandSelfHarm');if(/kill him|hurt them|杀他|伤害他人/.test(t))mark('psychosis.commandOtherHarm');}
if(/people.*kill me|有人.*杀我|被迫害/.test(t)){mark('psychosis.persecutoryBeliefs');if(/weapon|armed|拿.*刀|拿.*枪|武器/.test(t))mark('psychosis.dangerousBehaviorFromBeliefs');}
if(/strange belief|unusual belief|奇怪.*信念/.test(t))mark('psychosis.bizarreBeliefs');
if(/haven't slept for (?:six|[3-9]) days|没睡.*[三四五六七八九3-9]天|[三四五六七八九3-9]天.*没睡/.test(t))mark('mania.severelyReducedNeedForSleep');
if(/chosen by god|invincible|上帝选中|无敌/.test(t))mark('mania.grandiosity');
if(/driving 180|开.*180|危险驾驶/.test(t)){mark('mania.recklessDriving');mark('mania.impairedJudgment');}
if(/spending all my (?:money|savings)|花光.*(?:钱|积蓄)/.test(t)){mark('mania.dangerousSpending');mark('mania.impairedJudgment');}
if(/cut myself (?:yesterday|today)|最近自伤|昨天.*割.*自己|昨天割伤自己/.test(t))mark('selfHarm.recentBehavior');
if(/wasn't trying to die|不是为了死|没有自杀意图/.test(t))mark('selfHarm.suicidalIntentAssociated',false);
if(/bleeding.*(?:won't stop|heavily)|流血不止|伤口很深/.test(t))mark('selfHarm.medicalInjuryConcern');
const negMedical=/no (?:chest pain|breathing difficulty)|don't have|do not have|没有胸痛|没有胸口.*(?:剧痛|剧烈疼痛)|没有呼吸困难/;
if(match(/chest.*(?:severe|badly|suddenly)|severe.*chest|严重胸痛|胸口.*(?:剧痛|剧烈疼痛|很痛)/,negMedical))mark('medical.severeChestPain');
if(match(/can't breathe|cannot breathe|severe breathing|无法呼吸|喘不过气|严重呼吸困难/,negMedical))mark('medical.severeBreathingDifficulty');
if(match(/(?:almost )?passed out|lost consciousness|昏过去|失去意识|晕倒|晕过去/,/never|没有/))mark('medical.lossOfConsciousness');
if(match(/(?:having|had) a seizure|正在抽搐|癫痫发作/,/not|没有/))mark('medical.seizure');
if(/face.*droop|one.side.*weak|口角歪斜|单侧无力|突然.*说不清/.test(t))mark('medical.strokeLikeSymptoms');
if(/suddenly confused|don't know where i am|突然意识混乱|不知道自己在哪/.test(t))mark('medical.severeConfusion');
if(/severe head injury|严重头部受伤/.test(t))mark('medical.severeHeadInjury');
if(/throat.*swelling|severe allergic reaction|喉咙.*肿|严重过敏/.test(t))mark('medical.severeAllergicReaction');
if(match(/took (?:way )?too many pills|overdose|吃了太多药|服药过量/,/no overdose|没有过量|没有服药过量|did not take|didn't take/)){mark('medical.suspectedOverdose');mark('substances.overdoseConcern');}
if(/drank poison|swallowed poison|喝了毒|误服毒/.test(t))mark('medical.suspectedPoisoning');
if(/severe withdrawal|严重戒断|戒酒.*(?:抽搐|幻觉|混乱)/.test(t))mark('substances.severeWithdrawalConcern');
if(/too drunk to wake|unconscious.*(?:drinking|drugs)|醉.*不醒/.test(t)){mark('substances.severeIntoxication');mark('substances.impairedConsciousness');}
if(/haven't eaten or drunk anything for two days|两天.*没.*(?:吃|喝)|两天没吃没喝/.test(t)){mark('selfCare.unableToEat');mark('selfCare.unableToDrink');if(/can't get out of bed|无法下床|起不了床/.test(t))mark('selfCare.severeFunctionalCollapse');}
if(/stopped eating.*poisoned|不吃.*(?:有毒|下毒)/.test(t)){mark('selfCare.unableToEat');mark('psychosis.inabilityToCareForSelf');mark('psychosis.persecutoryBeliefs');}
if(/don't know how much longer i can do this|撑不下去|坚持不下去/.test(t))mark('screen.ambiguousDistress');
return {status:'partial',signals:s};};
})(globalThis.GlobalSafety=globalThis.GlobalSafety||{});
