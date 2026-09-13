(function(G){'use strict';
G.evidence={
violence:{title:['暴力与攻击行为：专业评估与处置','Violence and aggression: professional assessment and management'],url:'https://www.nice.org.uk/guidance/ng10/chapter/recommendations'},
suicide:{title:['自杀安全评估：专业人员指南','Suicide safety assessment: clinician guide'],url:'https://www.nimh.nih.gov/research/research-conducted-at-nimh/asq-toolkit-materials/adult-outpatient/adult-outpatient-brief-suicide-safety-assessment-guide'},
selfharm:{title:['自伤：不使用风险分层预测','Self-harm: no predictive risk stratification'],url:'https://www.nice.org.uk/guidance/ng225/chapter/recommendations'},
ocd:{title:['OCD：侵入性想法与风险的区别','OCD: distinguishing intrusive thoughts from risk'],url:'https://www.nice.org.uk/guidance/cg31/chapter/recommendations'},
psychosis:{title:['幻觉与紧急求助','Hallucinations and urgent help'],url:'https://www.nhs.uk/mental-health/feelings-symptoms-behaviours/feelings-and-symptoms/hallucinations-hearing-voices/'},
mania:{title:['双相障碍与危机照护','Bipolar disorder and crisis care'],url:'https://www.nhs.uk/mental-health/conditions/bipolar-disorder/'},
medical:{title:['何时呼叫急救','When to call emergency services'],url:'https://www.nhs.uk/nhs-services/urgent-and-emergency-care-services/when-to-call-999/'},
poison:{title:['中毒与过量紧急处理','Poisoning and overdose emergencies'],url:'https://www.nhs.uk/conditions/poisoning/'},
withdrawal:{title:['酒精戒断医疗管理指南','Clinical alcohol withdrawal guidance'],url:'https://www.rdash.nhs.uk/policies/alcohol-detoxification-inpatients-policy/'},
selfcare:{title:['脱水及紧急症状','Dehydration and urgent symptoms'],url:'https://www.nhs.uk/conditions/dehydration/'}};
// Declarative conditions: any / all / none. No UI, model prompt or external lookup participates.
G.rules=[];
function rule(id,domain,title,urgency,conditions,evidenceSources,extra={}){G.rules.push({id,domain,title,description:title,conditions,urgency,action:urgency==='acute'?'immediate_emergency_support':urgency==='elevated'?'urgent_professional_support':'focused_clarification',evidenceSources,version:G.version,lastReviewed:G.reviewed,reviewStatus:'author_review_only_requires_clinician',...extra});}
const any=paths=>({any:paths.split(' ')}),all=paths=>({all:paths.split(' ')});
rule('MEDICAL_RED_FLAG','medical',['急性身体症状需即时医疗帮助','Acute physical symptoms need emergency medical help'],'acute',any(G.schema.medical.map(k=>'medical.'+k).join(' ')),['medical','poison']);
rule('SUBSTANCE_MEDICAL','substance',['过量、中毒、严重戒断或意识／呼吸异常','Overdose, severe withdrawal or altered consciousness / breathing'],'acute',any('substances.overdoseConcern substances.severeWithdrawalConcern substances.impairedConsciousness substances.seizureRisk substances.respiratorySuppression'),['poison','withdrawal'],{alsoDomains:['medical']});
rule('INTOXICATION_SEVERE','substance',['严重醉酒／物质影响或极度激越','Severe intoxication or extreme agitation'],'acute',any('substances.severeIntoxication substances.severeAgitation'),['poison','withdrawal'],{alsoDomains:['medical']});
rule('SUICIDE_ACTION','suicide',['当前意图、计划、准备、近期尝试或无法保持安全','Current intent, plan, preparation, recent attempt or inability to remain safe'],'acute',any('suicide.intent suicide.plan suicide.preparation suicide.recentAttempt suicide.unableToStaySafe suicide.currentIdeation'),['suicide']);
rule('SUICIDE_MEANS','suicide',['自杀相关线索与可接触物品并存','Suicide-related signals alongside access to concerning means'],'acute',{all:['suicide.accessToMeans'],any:['suicide.suicidalIdeation','suicide.passiveDeathWish','suicide.desireToDie','screen.positiveUnspecified']},['suicide']);
rule('SUICIDE_IDEATION','suicide',['自杀想法或死亡愿望需单独跟进','Suicidal thoughts or a wish to die need separate follow-up'],'elevated',any('suicide.suicidalIdeation suicide.desireToDie suicide.escalatingRisk'),['suicide']);
rule('PASSIVE_DEATH','suicide',['死亡愿望需澄清当前意图与安全','A passive death wish needs clarification of current intent and safety'],'attention',any('suicide.passiveDeathWish'),['suicide']);
rule('SELF_HARM','self_harm',['自伤冲动、行为或升级需专业支持','Self-harm urges, behavior or escalation need professional support'],'elevated',any('selfHarm.currentUrges selfHarm.recentBehavior selfHarm.escalatingFrequency'),['selfharm']);
rule('SELF_HARM_INJURY','self_harm',['自伤可能造成需医疗处理的伤害','Self-harm may have caused an injury needing medical care'],'acute',any('selfHarm.medicalInjuryConcern'),['selfharm','medical'],{alsoDomains:['medical']});
rule('SELF_HARM_INTENT','suicide',['自伤伴自杀意图','Self-harm with suicidal intent'],'acute',any('selfHarm.suicidalIntentAssociated'),['suicide','selfharm'],{alsoDomains:['self_harm']});
rule('VIOLENCE_INTENT','harm_to_others',['伤害他人的意图、计划或准备','Intent, plan or preparation to harm another person'],'acute',any('harmToOthers.intent harmToOthers.plan harmToOthers.preparation'),['violence']);
rule('VIOLENCE_IMMINENCE','harm_to_others',['伤害愿望与即刻性或行为失控并存','Desire to harm with imminence or impaired control'],'acute',{all:['harmToOthers.actualDesire'],any:['harmToOthers.imminence','harmToOthers.accessToMeans','harmToOthers.impairedBehavioralControl']},['violence']);
rule('VIOLENCE_DESIRE','harm_to_others',['实际伤害愿望需尽快评估','Actual desire to harm needs urgent assessment'],'elevated',any('harmToOthers.actualDesire'),['violence']);
rule('VIOLENCE_THOUGHT','harm_to_others',['伤害想法需区分不想要的念头与意图','Distinguish unwanted harm thoughts from intent'],'attention',any('harmToOthers.violentThoughts'),['ocd']);
rule('COMMAND_SELF','psychosis',['声音要求伤害自己','Voices directing self-harm'],'acute',any('psychosis.commandSelfHarm'),['psychosis'],{alsoDomains:['suicide']});
rule('COMMAND_OTHER','psychosis',['声音要求伤害他人','Voices directing harm to others'],'acute',any('psychosis.commandOtherHarm'),['psychosis'],{alsoDomains:['harm_to_others']});
rule('PSYCHOSIS_CONSEQUENCE','psychosis',['现实判断困难伴危险行为或严重混乱','Reality-testing difficulties with dangerous behavior or severe disorganization'],'acute',any('psychosis.dangerousBehaviorFromBeliefs psychosis.severeDisorganization'),['psychosis']);
rule('PSYCHOSIS_CARE','psychosis',['精神病性体验影响基本自我照护','Psychotic experiences affecting basic self-care'],'elevated',any('psychosis.inabilityToCareForSelf'),['psychosis'],{alsoDomains:['self_care']});
rule('PSYCHOSIS_REVIEW','psychosis',['幻觉或现实判断困难需专业评估','Hallucinations or impaired reality testing need professional assessment'],'elevated',any('psychosis.hallucinations psychosis.commandHallucinations psychosis.impairedRealityTesting psychosis.severeParanoia'),['psychosis']);
rule('BELIEF_CLARIFY','psychosis',['异常信念需要结合功能和行为澄清','Unusual beliefs need clarification of functioning and behavior'],'attention',any('psychosis.bizarreBeliefs psychosis.persecutoryBeliefs'),['psychosis']);
rule('MANIA_DANGER','mania',['严重兴奋伴危险行为／无法控制','Severe activation with dangerous behavior / loss of control'],'acute',{any:['mania.recklessDriving','mania.aggression','mania.inabilityToControlBehavior'],all:['mania.impairedJudgment']},['mania']);
rule('MANIA_PSYCHOSIS','mania',['异常兴奋与精神病性体验并存','Activation with psychotic experiences'],'acute',{all:['mania.markedlyIncreasedEnergy','mania.psychoticFeatures']},['mania','psychosis']);
rule('MANIA_CLUSTER','mania',['严重少睡不困与异常兴奋／冲动并存','Severely reduced need for sleep with activation / impulsivity'],'elevated',{all:['mania.severelyReducedNeedForSleep'],any:['mania.markedlyIncreasedEnergy','mania.grandiosity','mania.extremeImpulsivity','mania.dangerousSpending']},['mania']);
rule('MANIA_JUDGMENT','mania',['严重冲动或判断受损','Severe impulsivity or impaired judgment'],'elevated',any('mania.extremeImpulsivity mania.dangerousSpending mania.sexualRisk mania.impairedJudgment'),['mania']);
rule('HYDRATION_COLLAPSE','self_care',['无法饮水与基本功能崩溃','Unable to drink with collapse of basic functioning'],'acute',all('selfCare.unableToDrink selfCare.severeFunctionalCollapse'),['selfcare'],{alsoDomains:['medical']});
rule('SELF_CARE_ALONE','self_care',['无法安全独处','Unable to remain safely alone'],'acute',any('selfCare.unableToRemainSafelyAlone'),['selfcare','suicide']);
rule('SELF_CARE_NEEDS','self_care',['无法维持基本生活需要','Unable to maintain basic needs'],'elevated',any('selfCare.unableToEat selfCare.unableToDrink selfCare.unableToMaintainShelter selfCare.unableToManageEssentialMedication selfCare.severeSelfNeglect selfCare.severeFunctionalCollapse'),['selfcare']);
rule('UNSPECIFIED_HARM_ACTION','other',['实际伤害意图、计划或准备；对象待澄清','Actual harm intent, plan or preparation; target unresolved'],'acute',any('other.harmAction'),['suicide']);
rule('UNSPECIFIED_HARM_DESIRE','other',['实际伤害愿望需要专业支持','Actual desire to harm needs professional support'],'elevated',any('other.harmDesire'),['suicide']);
rule('MEANS_FOLLOWUP','suicide',['接触令人担忧的物品，需要澄清','Access to concerning means needs clarification'],'attention',any('suicide.accessToMeans'),['suicide']);
rule('OTHER_DANGER','other',['报告其他即刻危险','Other immediate danger reported'],'acute',any('other.immediateDanger'),['medical']);
rule('SCREEN_FOLLOWUP','self_harm',['筛查线索需要单独澄清，不能推断意图','A screening signal needs separate clarification; intent cannot be inferred'],'attention',any('screen.positiveUnspecified screen.ambiguousDistress suicide.intrusiveThought'),['suicide','ocd']);
})(globalThis.GlobalSafety=globalThis.GlobalSafety||{});
