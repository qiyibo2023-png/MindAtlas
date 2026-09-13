(function(R){'use strict';
const rule=(id,domain,relevance,explanationKey,when)=>({id,domain,relevance,explanationKey,when,version:R.version,reviewStatus:'unreviewed'});
const count=(p,domain)=>R.fields[domain].filter(f=>p[domain][f]===true).length;
const any=(p,paths)=>paths.some(path=>R.get(p,path)===true);
const rituals=p=>any(p,['ocd.checking','ocd.washingCleaning','ocd.mentalCompulsions','ocd.reassuranceSeeking','ocd.neutralization','ocd.symmetryExactness','ocd.avoidance']);
R.rules=[
 rule('ROUTER_OCD_INTRUSION_RITUAL_001','ocd','high','router.reasonOcdSpecific',p=>(p.ocd.intrusiveThoughts===true||p.ocd.recurrentDoubt===true)&&rituals(p)),
 rule('ROUTER_OCD_REPETITION_002','ocd','moderate','router.reasonOcdRitual',p=>rituals(p)&&!(p.ocd.avoidance===true&&count(p,'ocd')===1)),
 rule('ROUTER_OCD_UNWANTED_003','ocd','moderate','router.reasonOcdThought',p=>p.ocd.intrusiveThoughts===true&&p.ocd.thoughtsUnwanted===true),
 rule('ROUTER_MOOD_COMBINATION_001','mood','moderate','router.reasonMood',p=>any(p,['mood.depressedMood','mood.anhedonia'])&&count(p,'mood')>=2),
 rule('ROUTER_MOOD_PERSISTENCE_002','mood','moderate','router.reasonMoodCourse',p=>any(p,['mood.depressedMood','mood.anhedonia'])&&(p.course.frequency==='repeated'||p.course.duration==='persistent'||p.general.functionalImpact===true)),
 rule('ROUTER_MOOD_CLUSTER_003','mood','high','router.reasonMood',p=>any(p,['mood.depressedMood','mood.anhedonia'])&&count(p,'mood')>=3),
 rule('ROUTER_ANXIETY_WORRY_001','anxiety','moderate','router.reasonWorry',p=>p.anxiety.excessiveWorry===true),
 rule('ROUTER_ANXIETY_PATTERN_002','anxiety','moderate','router.reasonFear',p=>any(p,['anxiety.panicLikeEpisodes','anxiety.panicConcern','anxiety.socialEvaluationFear','anxiety.specificFear','anxiety.situationalAvoidance'])),
 rule('ROUTER_ANXIETY_CLUSTER_003','anxiety','high','router.reasonWorry',p=>count(p,'anxiety')>=3)
];
})(globalThis.SymptomRouter);
