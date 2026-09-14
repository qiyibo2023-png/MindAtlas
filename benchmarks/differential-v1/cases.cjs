// Synthetic structured benchmark. Expected domains are authored independently of
// engine output. Each bilingual pair represents the same facts, not two patients.
// Combinatorial multi-domain rows test distinct domain interactions, not rewordings.
const bases={
 mood:{'mood.low':true,'mood.interest':true,'mood.energy':true,'mood.duration':true,'mood.together':true,'mood.impact':true,'mood.bipolarKnown':true,'mood.medical':false,'mood.substance':false,'mood.stressor':false},
 anxiety:{'anxiety.broad':true,'anxiety.excessive':true,'anxiety.control':true,'anxiety.mostDays':true,'anxiety.duration':true,'anxiety.impact':true,'anxiety.medical':false,'anxiety.substance':false},
 ocd:{'ocd.intrusive':true,'ocd.ego':true,'ocd.rituals':true,'ocd.relief':true,'ocd.response':true,'ocd.timeKnown':true,'ocd.impact':true,'ocd.medical':false,'ocd.substance':false},
 trauma:{'trauma.exposure':true,'trauma.intrusion':true,'trauma.avoidance':true,'trauma.negative':true,'trauma.arousal':true,'trauma.duration':true,'trauma.current':true,'trauma.impairment':true,'trauma.medical':false,'trauma.substance':false},
 adhd:{'adhd.current':true,'adhd.developmental':true,'adhd.onset':true,'adhd.crossSetting':true,'adhd.impairment':true,'adhd.persistent':true,'adhd.independent':true,'adhd.sleepClear':true,'adhd.medical':false,'adhd.substance':false,'adhd.sleep':false},
 eating:{'eating.restriction':true,'eating.weightMotive':true,'eating.fear':true,'eating.overvalue':true,'eating.impact':true,'eating.persistent':true,'eating.independent':true,'eating.coherent':true,'eating.medical':false,'eating.substance':false,'eating.gi':false,'eating.medication':false},
 psychosis:{'psychosis.qualified':true,'psychosis.current':true,'psychosis.impact':true,'psychosis.independent':true,'psychosis.coherent':true,'psychosis.perception':true,'psychosis.awake':true,'psychosis.medical':false,'psychosis.substance':false,'psychosis.medication':false,'psychosis.sudden':false,'psychosis.sleep':false,'psychosis.culture':false,'psychosis.grief':false}
};
const domains=Object.keys(bases),rows=[];
const nodes=map=>Object.entries(map).map(([concept,value])=>({concept,value}));
function add(id,evidence,expected,extra={}){rows.push({pairId:id,structuredEvidence:Array.isArray(evidence)?evidence:nodes(evidence),expectedPrimaryDirections:expected,acceptableCooccurringDirections:[],acceptableAlternatives:[],expectedOpposingEvidence:[],expectedMissingEvidence:[],expectedUnresolvedRuleOuts:[],expectedUnresolvedDiscriminators:[],expectedSafetyState:'none',expectedDifferentialStatus:['sufficient','partially_sufficient'],tags:[],...extra});}
for(const domain of domains)add('pure-'+domain,bases[domain],[domain],{tags:['pure',domain]});
for(let a=0;a<domains.length;a++)for(let b=a+1;b<domains.length;b++){
 const pair=[domains[a],domains[b]];
 add('mixed-'+pair.join('-'),Object.assign({},...pair.map(d=>bases[d])),pair,{acceptableCooccurringDirections:pair,tags:['mixed','pairwise',...pair]});
 for(let c=b+1;c<domains.length;c++){
  const triple=[...pair,domains[c]];
  add('triple-'+triple.join('-'),Object.assign({},...triple.map(d=>bases[d])),triple,{acceptableCooccurringDirections:triple,tags:['mixed','three-domain',...triple]});
 }
}
const critical={mood:'mood.duration',anxiety:'anxiety.duration',ocd:'ocd.timeKnown',trauma:'trauma.duration',adhd:'adhd.onset',eating:'eating.weightMotive',psychosis:'psychosis.awake'};
const anchor={mood:'mood.low',anxiety:'anxiety.broad',ocd:'ocd.intrusive',trauma:'trauma.intrusion',adhd:'adhd.current',eating:'eating.restriction',psychosis:'psychosis.qualified'};
for(const domain of domains){
 const missing=critical[domain],medical=domain+'.medical';
 add('missing-'+domain,Object.fromEntries(Object.entries(bases[domain]).filter(([k])=>k!==missing)),[],{acceptableCooccurringDirections:[domain],acceptableAlternatives:[domain],expectedMissingEvidence:domain==='psychosis'?[]:[missing],expectedUnresolvedDiscriminators:domain==='psychosis'?['psychosis.awake']:[],expectedDifferentialStatus:['insufficient','partially_sufficient'],tags:['missing',domain]});
 add('medical-unknown-'+domain,{...bases[domain],[medical]:'unknown'},[],{acceptableCooccurringDirections:[domain],acceptableAlternatives:[domain],expectedUnresolvedRuleOuts:[medical],expectedDifferentialStatus:['partially_sufficient'],tags:['medical','rule-out',domain]});
 add('conflict-'+domain,[...nodes(bases[domain]),{concept:anchor[domain],value:false,id:'second-direct-report'}],[],{acceptableAlternatives:[domain],expectedDifferentialStatus:['conflicted'],expectedContradiction:anchor[domain],tags:['conflict','equal-priority',domain]});
 add('precedence-'+domain,[...nodes(bases[domain]),{concept:anchor[domain],value:false,id:'weak-extraction',source:'router',sourceType:'free_text_extraction'}],[domain],{expectedContradiction:anchor[domain],expectedResolved:true,tags:['provenance','precedence',domain]});
 add('history-'+domain,nodes(bases[domain]).map(n=>({...n,temporality:'history'})),[],{acceptableAlternatives:[domain],expectedNoPrimary:true,expectedDifferentialStatus:['insufficient'],tags:['historical','not-current',domain]});
 add('unknown-'+domain,Object.fromEntries(Object.keys(bases[domain]).map(k=>[k,'unknown'])),[],{expectedNoPrimary:true,expectedDifferentialStatus:['insufficient'],tags:['unknown','not-negative',domain]});
}
add('ocd-mood-rumination',{...bases.mood,'mood.rumination':true,'ocd.intrusive':true,'ocd.rituals':false},['mood'],{acceptableAlternatives:['ocd'],expectedOpposingEvidence:['ocd.rituals'],tags:['hard','rumination','mood','ocd']});
add('ocd-linked-worry',{...bases.ocd,'anxiety.broad':false,'anxiety.onlyObsessions':true},['ocd'],{expectedOpposingEvidence:['anxiety.broad'],tags:['hard','ocd','anxiety','linked-not-generalized']});
add('trauma-recent',{...bases.trauma,'trauma.duration':false},[],{acceptableAlternatives:['trauma'],expectedNoPrimary:true,expectedOpposingEvidence:['trauma.duration'],expectedDifferentialStatus:['insufficient'],tags:['hard','trauma','recent-not-established']});
add('trauma-exposure-only',{'trauma.exposure':true},[],{expectedNoPrimary:true,expectedDifferentialStatus:['insufficient'],tags:['hard','trauma','exposure-not-symptoms']});
add('adhd-only-depression',{...bases.mood,'adhd.current':true,'adhd.onlyMood':true,'adhd.onset':false},['mood'],{acceptableAlternatives:['adhd'],expectedOpposingEvidence:['adhd.onset'],tags:['hard','adhd','mood','adult-onset']});
add('adhd-developmental-trauma',{...bases.adhd,...bases.trauma,'adhd.onlyTrauma':false},['adhd','trauma'],{acceptableCooccurringDirections:['adhd','trauma'],tags:['hard','adhd','trauma','independent-development']});
add('activation-and-perception',{...bases.psychosis,'mood.activation':true,'psychosis.activation':true,'psychosis.bipolar':'unknown'},['psychosis'],{acceptableCooccurringDirections:['mood'],expectedUnresolvedDiscriminators:['psychosis.bipolar'],tags:['hard','psychosis','mood','episodic-activation']});
add('ocd-poor-insight',{...bases.ocd,'psychosis.conviction':true,'psychosis.insight':true},['ocd'],{tags:['hard','ocd','psychosis','conviction-alone']});
add('dissociation-only',{'trauma.dissociation':true,'psychosis.dissociation':true},[],{expectedNoPrimary:true,expectedDifferentialStatus:['insufficient'],tags:['hard','trauma','psychosis','dissociation-not-psychosis']});
add('sleep-transition-experience',{'psychosis.perception':true,'psychosis.awake':false,'psychosis.sleep':true,'psychosis.qualified':false},[],{acceptableAlternatives:['psychosis'],expectedNoPrimary:true,expectedUnresolvedRuleOuts:['psychosis.sleep'],expectedDifferentialStatus:['insufficient'],tags:['hard','sleep','psychosis']});
add('arfid-without-weight-motive',{'eating.restriction':true,'eating.drivers':true,'eating.notWeight':true,'eating.weightMotive':false,'eating.nutrition':true,'eating.persistent':true,'eating.independent':true,'eating.coherent':true,'eating.medical':false,'eating.substance':false,'eating.gi':false,'eating.medication':false},['eating'],{expectedOpposingEvidence:['eating.weightMotive'],tags:['hard','eating','arfid-not-weight-driven']});
add('binge-regular-compensation',{'eating.binge':true,'eating.bingeRecurrent':true,'eating.compRecurrent':true,'eating.noComp':false,'eating.overvalue':true,'eating.persistent':true,'eating.independent':true,'eating.coherent':true},['eating'],{expectedOpposingEvidence:['eating.noComp'],tags:['hard','eating','bulimia-bed']});
add('binge-no-compensation',{'eating.binge':true,'eating.bingeRecurrent':true,'eating.compRecurrent':false,'eating.noComp':true,'eating.distress':true,'eating.persistent':true,'eating.independent':true,'eating.coherent':true},['eating'],{expectedOpposingEvidence:['eating.compRecurrent'],tags:['hard','eating','bed-bulimia']});
add('medical-psychosis-context',{...bases.psychosis,'psychosis.medical':true,'psychosis.sudden':true},[],{acceptableAlternatives:['psychosis'],expectedUnresolvedRuleOuts:['psychosis.medical','psychosis.sudden'],expectedDifferentialStatus:['insufficient','partially_sufficient'],tags:['hard','medical','psychosis']});
add('medication-context',{...bases.psychosis,'psychosis.medication':true,'psychosis.substance':true},[],{acceptableAlternatives:['psychosis'],expectedUnresolvedRuleOuts:['psychosis.medication','psychosis.substance'],expectedDifferentialStatus:['insufficient','partially_sufficient'],tags:['hard','medication','psychosis']});
for(const domain of ['autism','substance','sleep','somatic','personality','cognitive','grief','bdd','hoarding'])add('unsupported-'+domain,{['unsupported.'+domain]:true},[],{expectedNoPrimary:true,expectedUnsupported:'unsupported.'+domain,expectedDifferentialStatus:['insufficient'],tags:['unsupported',domain]});
for(const [id,path]of [['suicide','suicide.intent'],['medical','medical.lossOfConsciousness'],['violence','harmToOthers.intent']])add('safety-'+id,{...bases.mood,...bases.psychosis},[],{safety:{[path]:true},expectedNoPrimary:true,expectedSafetyState:'acute',expectedDifferentialStatus:['safety_interrupted'],tags:['safety',id]});
module.exports=rows.flatMap(row=>['en','zh-CN'].map(language=>({...row,id:row.pairId+'-'+(language==='en'?'en':'zh'),language,synthetic:true})));
module.exports.bases=bases;
