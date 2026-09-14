(function(V){'use strict';
const rule=(id,rank,all,any,explanationKey,none=[])=>({id,rank,all,any,none,explanationKey,reviewStatus:'unreviewed',version:V.version});
const register=(id,discriminatingFeatures,rules,opposingFeatures=[])=>V.registerDomain({id,discriminatingFeatures,evidenceRequirements:rules.map(r=>({all:r.all,any:r.any})),rules,opposingFeatures,clarificationCandidates:[]});
register('mood',['mood.anhedonia','mood.episodicElevation','mood.reducedNeedForSleep'],[
rule('V2_MOOD_CORE',1,[],['mood.depressedMood','mood.anhedonia'],'router.reasonMood'),
rule('V2_MOOD_ASSOCIATED',2,['mood.depressedMood'],['mood.lowEnergy','mood.hopelessness','general.functionalImpact'],'router.reasonMood'),
rule('V2_MOOD_COMBINATION',3,['mood.depressedMood','mood.anhedonia'],[],'router.reasonMood'),
rule('V2_MOOD_EPISODIC',3,['mood.episodicElevation','mood.reducedNeedForSleep'],[],'rv2.reasonEpisode')]);
register('anxiety',['anxiety.excessiveWorry','anxiety.difficultToControlWorry','anxiety.panicConcern'],[
rule('V2_ANXIETY_WORRY',2,['anxiety.excessiveWorry'],[],'router.reasonWorry'),
rule('V2_ANXIETY_PATTERN',3,['anxiety.excessiveWorry'],['anxiety.difficultToControlWorry','anxiety.physicalTension'],'router.reasonWorry'),
rule('V2_ANXIETY_FEAR',2,[],['anxiety.panicLikeEpisodes','anxiety.socialEvaluationFear','anxiety.specificFear'],'router.reasonFear')]);
register('ocd',['ocd.egoDystonic','ocd.neutralization','ocd.mentalCompulsions','ocd.checking'],[
rule('V2_OCD_UNWANTED',2,['ocd.intrusiveThoughts'],['ocd.thoughtsUnwanted','ocd.egoDystonic'],'router.reasonOcdThought'),
rule('V2_OCD_RITUAL',2,[],['ocd.checking','ocd.washingCleaning','ocd.mentalCompulsions','ocd.neutralization'],'router.reasonOcdRitual'),
rule('V2_OCD_PATTERN',3,['ocd.intrusiveThoughts','ocd.thoughtsUnwanted'],['ocd.checking','ocd.mentalCompulsions','ocd.neutralization','ocd.washingCleaning'],'router.reasonOcdSpecific')]);
register('trauma',['trauma.exposure','trauma.reliving','trauma.avoidance'],[
rule('V2_TRAUMA_PATTERN',3,['trauma.exposure','trauma.reliving'],[],'rv2.reasonTrauma'),
rule('V2_TRAUMA_REMINDERS',2,['trauma.exposure'],['trauma.avoidance','trauma.alertness','trauma.nightmares'],'rv2.reasonTrauma')]);
register('adhd',['adhd.developmental','adhd.crossSetting','adhd.preMood','adhd.preTrauma'],[
rule('V2_ADHD_DEVELOPMENT',3,['adhd.developmental'],['adhd.disorganized','adhd.distractible','adhd.unfinished','adhd.impulsive'],'rv2.reasonAdhd'),
rule('V2_ADHD_CLARIFIED',2,['adhd.developmental','adhd.crossSetting','general.attention'],[],'rv2.reasonAdhd'),
rule('V2_ADHD_CONTEXT',1,[],['adhd.disorganized','adhd.distractible','adhd.unfinished','general.attention'],'rv2.reasonAttention')],['general.onsetRecent']);
register('eating',['eating.weightFear','eating.loss','eating.compensation','eating.sensory','eating.consequenceFear'],[
rule('V2_EATING_WEIGHT',3,['eating.restriction','eating.weightFear'],[],'rv2.reasonEating'),
rule('V2_EATING_BINGE',3,['eating.binge','eating.loss'],[],'rv2.reasonEating'),
rule('V2_EATING_AVOIDANCE',3,['eating.avoidance','eating.intakeImpact'],['eating.sensory','eating.consequenceFear','eating.lowInterest'],'rv2.reasonEating'),
rule('V2_EATING_CONTEXT',1,[],['eating.restriction','eating.avoidance','eating.binge'],'rv2.reasonEating')],['eating.moodAppetite']);
register('psychosis',['psychosis.awake','psychosis.conviction','psychosis.realityDifficulty','psychosis.decline'],[
rule('V2_PSYCHOSIS_PERCEPTION',1,['psychosis.perception'],[],'rv2.reasonPsychosis'),
rule('V2_PSYCHOSIS_PATTERN',3,['psychosis.perception','psychosis.awake'],['psychosis.recurrent','psychosis.decline'],'rv2.reasonPsychosis'),
rule('V2_PSYCHOSIS_BELIEF',3,['psychosis.belief','psychosis.conviction'],[],'rv2.reasonPsychosis'),
rule('V2_PSYCHOSIS_ORGANIZATION',2,['psychosis.disorganization','psychosis.decline'],[],'rv2.reasonPsychosis')],['psychosis.sleep','psychosis.culture','psychosis.traumaContext','psychosis.substanceContext']);
// Clarified relationships add explanatory discrimination only; original routing ranks are unchanged.
V.clarificationDiscriminators={mood:{path:'mood.moodCongruentRumination',explanationKey:'rv201.reasonMood'},ocd:{path:'ocd.intrusionCompulsionLink',explanationKey:'rv201.reasonOcd'}};
V.unsupported={autism:11,substance:15,sleep:14,somatic:13,personality:16,cognitive:17,grief:8,bdd:6,hoarding:6};
})(globalThis.RouterV2);
