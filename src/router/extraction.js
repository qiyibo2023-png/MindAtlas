(function(R){'use strict';
// Local bounded phrase extractor. No raw text or matched excerpts leave this function.
// Lexical patterns are shared across languages; they are not separate engines.
const patterns={
 'mood.depressedMood':/depress(?:ed|ion)|feel(?:ing)? (?:very )?(?:down|low)|hopeless and low|心情(?:一直|也)?(?:很|非常)?(?:差|低落)|情绪低落|抑郁/iu,
 'mood.anhedonia':/cannot enjoy|can't enjoy|lost interest|no (?:longer .{0,15})?interest|loss of interest|没兴趣|没(?:有)?兴趣|提不起兴趣|无法享受/iu,
 'mood.lowEnergy':/no energy|low energy|exhausted|没(?:有)?精力|疲惫|乏力/iu,
 'mood.guiltWorthlessness':/worthless|excessive guilt|毫无价值|一无是处|过度自责/iu,
 'mood.hopelessness':/hopeless|绝望|没有希望/iu,
 'mood.sleepChange':/cannot sleep|can't sleep|sleep too much|insomnia|失眠|睡不着|睡得太多/iu,
 'mood.appetiteChange':/lost my appetite|no appetite|appetite (?:increased|decreased)|食欲(?:下降|增加)|没胃口/iu,
 'mood.concentrationDifficulty':/cannot concentrate|can't concentrate|difficulty concentrating|无法集中注意|注意力不集中/iu,
 'mood.psychomotorChange':/moving unusually slowly|unusually restless|行动异常缓慢|异常坐立不安/iu,
 'anxiety.excessiveWorry':/worry (?:constantly|every day|about (?:work|everything))|constantly worry|worry about .{0,60}(?:money|family)|persistent anxiety|一直很焦虑|每天都担心|总是担心|担心工作/iu,
 'anxiety.difficultToControlWorry':/(?:worry|担心).{0,90}(?:cannot stop|can't stop|停不下来|无法控制)/iu,
 'anxiety.physicalTension':/muscle tension|physically tense|肌肉紧张|身体紧绷/iu,
 'anxiety.panicLikeEpisodes':/panic attacks?|panic episodes?|惊恐发作|恐慌发作/iu,
 'anxiety.panicConcern':/fear (?:of |another )?panic|afraid of another attack|害怕再次发作/iu,
 'anxiety.situationalAvoidance':/avoid (?:crowds|public transport|leaving home)|回避(?:人群|公共交通)|不敢出门/iu,
 'anxiety.socialEvaluationFear':/fear.{0,18}(?:judged|embarrass)|afraid.{0,18}judg|害怕被评价|害怕出丑/iu,
 'anxiety.specificFear':/terrified of (?:spiders|heights|flying)|害怕(?:蜘蛛|高处|飞行)/iu,
 'ocd.intrusiveThoughts':/intrusive thought|unwanted (?:harm )?thought|keep (?:getting|having|imagining).{0,35}(?:thought|images|stabbing)|脑(?:子里|海里).{0,20}(?:出现|画面)|侵入性想法|不想要的.{0,5}想法/iu,
 'ocd.thoughtsUnwanted':/unwanted|intrusive|terrifi|terrify|terrifies|根本不想|不想这么做|非常害怕|特别害怕|不想要的/iu,
 'ocd.egoDystonic':/do not want to (?:hurt|do)|don't want to (?:hurt|do)|根本不想|不想这么做/iu,
 'ocd.recurrentDoubt':/cannot (?:stop doubting|trust)|can't trust|反复怀疑|不相信.{0,8}锁/iu,
 'ocd.checking':/(?:repeatedly|keep|always|constantly) check|checking.{0,20}repeatedly|checks?.{0,35}(?:ten times|20 times|twenty times)|反复检查|一直检查|检查(?:十几|十|二十|20)次/iu,
 'ocd.washingCleaning':/wash.{0,25}(?:repeatedly|over and over)|compulsive (?:washing|cleaning)|反复洗手|反复清洗/iu,
 'ocd.mentalCompulsions':/mental rituals?|repeat.{0,30}(?:in my head|silently)|心理仪式|在脑中反复|默念/iu,
 'ocd.reassuranceSeeking':/repeatedly (?:ask|seek reassurance)|keep asking.{0,25}(?:sure|safe)|反复寻求保证|反复询问/iu,
 'ocd.neutralization':/neutraliz|undo the thought|抵消.{0,5}想法|消除.{0,5}念头/iu,
 'ocd.symmetryExactness':/repeat.{0,20}(?:just right|symmetr)|反复.{0,12}(?:对称|刚刚好)/iu,
 'ocd.avoidance':/(?:avoiding|hiding|hide|avoid) knives|回避刀|藏起刀|刀有没有收好/iu,
 'ocd.needForCertainty':/need (?:absolute |complete )?certainty|必须完全确定|需要绝对确定/iu,
 'general.functionalImpact':/cannot function|can't function|affecting my daily life|影响日常生活|无法正常生活/iu,
 'general.sleep':/cannot sleep|can't sleep|insomnia|睡不着|失眠/iu,
 'general.schoolImpact':/missing school|affect.{0,10}school|影响学业|无法上学/iu,
 'general.workImpact':/missing work|affect.{0,10}work|影响工作|无法工作/iu,
 'general.relationshipImpact':/affect.{0,10}relationship|影响关系|影响人际/iu,
 'unsupported.trauma':/flashbacks?|reliving.{0,25}(?:assault|trauma)|创伤闪回|反复重现.{0,10}(?:袭击|创伤)/iu,
 'unsupported.attention':/hyperactiv|attention deficit|lifelong distractibility|多动|注意缺陷|从小容易分心/iu,
 'unsupported.eating':/binge eat|purging|restrict.{0,20}(?:food|weight)|暴食|催吐|为减重限制进食/iu,
 'unsupported.psychotic':/hear(?:ing)? voices|being watched by spies|听到声音|被间谍监视/iu
};
R.extract=function(raw){if(typeof raw!=='string'||raw.length>4000||!raw.trim())throw Error('Invalid symptom input');const p=R.empty();
 const clauses=raw.normalize('NFKC').toLowerCase().split(/[.!?。！？;；\n]+|\bbut\b|但是|但(?=我|现在)/u).filter(s=>s.trim());
 let inheritedSubject='self',inheritedTime='current';const courseChunks=[];
 for(const clause of clauses){
  const observationStart=p.observations.length;
  const other=/\b(?:my|his|her) (?:brother|sister|girlfriend|boyfriend|friend|mother|father|partner)|\b(?:he|she|they)\b|我(?:的)?(?:哥哥|弟弟|姐姐|妹妹|女友|朋友|母亲|父亲)|他|她/u.test(clause);
  const explicitSelf=/\bi\b|\bmy (?!brother|sister|girlfriend|boyfriend|friend|mother|father|partner)|我(?!的?(?:哥哥|弟弟|姐姐|妹妹|女友|朋友|母亲|父亲))/u.test(clause);
  const subject=other&&!/^\s*(?:i |我(?:最近|现在|每天|一直|总是|感到|觉得))/u.test(clause)?'other':explicitSelf?'self':inheritedSubject;
  const hypothetical=/\bif\b|hypothetic|如果|假如/u.test(clause);
  const historical=/years ago|used to|\bi had\b|过去|年前|曾经|以前曾/u.test(clause);
  const recent=/recently|最近/u.test(clause),current=/\bnow\b|every day|constantly|\bi (?:am|feel|worry|keep|repeatedly|know|have)\b|现在|每天|一直|反复/u.test(clause);
  const temporality=hypothetical?'hypothetical':historical?'historical':recent?'recent':current?'current':inheritedTime==='historical'?'historical':inheritedTime==='hypothetical'?'hypothetical':'current';
  inheritedSubject=subject;inheritedTime=temporality;
  for(const [path,pattern]of Object.entries(patterns)){const m=pattern.exec(clause);if(!m)continue;
   const before=clause.slice(Math.max(0,m.index-35),m.index);
   const denial=/(?:\bnot|\bnever|\bno|don't|do not|不再|没有|并不|不是|不曾)\s*(?:feel(?:ing)?\s*|have\s*|experience\s*|感到)?$/u.test(before)&&!['ocd.egoDystonic','ocd.thoughtsUnwanted'].includes(path);
   const uncertain=/\bmaybe\b|\bmight\b|not sure|可能|不确定是否/u.test(clause);
   const polarity=denial?'denied':uncertain?'uncertain':'affirmed';
   // First-person journal fragments are accepted; explicit other/historical/hypothetical never are.
   const eligible=subject!=='other'&&!['historical','hypothetical'].includes(temporality);
   const value=!eligible||uncertain?'unknown':denial?false:true;
   const context={subject,temporality,polarity,uncertainty:uncertain||subject==='unclear'||temporality==='unclear'};
   if(p.observations.length>=256)throw Error('Too many symptom observations');
   p.observations.push({path,value,context});
  }
  if(p.observations.slice(observationStart).some(o=>o.value===true))courseChunks.push(clause);
 }
 for(const path of R.paths){const values=[...new Set(p.observations.filter(o=>o.path===path&&o.value!=='unknown').map(o=>o.value))];if(values.length===1)R.put(p,path,values[0]);}
 const live=p.observations.filter(o=>o.value===true);const contexts=p.observations.map(o=>o.context);
 for(const k of ['subject','temporality','polarity']){const vals=[...new Set(contexts.map(c=>c[k]))];p.context[k]=vals.length===1?vals[0]:k==='polarity'?'uncertain':'unclear';}
 p.context.uncertainty=contexts.length===0||contexts.some(c=>c.uncertainty);
 const courseText=courseChunks.join(' ');
 if(live.length){if(/every day|constantly|repeatedly|keep |been feeling|每天|反复|一直|总/u.test(courseText))p.course.frequency='repeated';if(/weeks|months|years|几周|几个月|数月/u.test(courseText))p.course.duration='persistent';if(/severely|严重/u.test(courseText))p.course.severity='marked';}
 return p;
};
})(globalThis.SymptomRouter);
