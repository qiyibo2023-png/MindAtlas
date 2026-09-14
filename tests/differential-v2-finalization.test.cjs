const assert=require('node:assert/strict'),{DifferentialV2:V,GlobalSafety:G}=require(process.cwd()+'/tests/differential-v2-harness.cjs')(),bases=require(process.cwd()+'/benchmarks/differential-v1/cases.cjs').bases;
const safe=()=>{const s=G.empty();for(const p of G.paths)G.put(s,p,false);return s;};
const run=(facts,signals=safe())=>V.evaluate(Object.entries(facts).map(([concept,value])=>V.node(concept,value)),signals);
let count=0;const test=(name,fn)=>{fn();count++;console.log('PASS Differential v2 finalization '+name);};
const scenarios=[
 ['A ADHD PTSD',{'adhd.current':true,'trauma.exposure':true},'adhd.onset'],
 ['B OCD GAD',{'ocd.intrusive':true},'ocd.response'],
 ['C psychosis sleep',{'psychosis.perception':true},'psychosis.awake'],
 ['D restriction motive',{'eating.restriction':true},'eating.weightMotive'],
 ['E compensation',{'eating.binge':true,'eating.loss':true},'eating.compRecurrent'],
 ['F concentration history',{'mood.concentration':true},'adhd.onset'],
 ['G intrusion event relationship',{'ocd.intrusive':true},'ocd.traumaMemory']
];
for(const [name,facts,concept]of scenarios){
 test(name+' unresolved',()=>{assert(run(facts).unresolvedDiscriminators.some(d=>d.conceptNeeded===concept));});
 for(const value of [true,false])test(name+' reliable '+value+' is not requested again',()=>{const r=run({...facts,[concept]:value});assert(!r.unresolvedDiscriminators.some(d=>d.conceptNeeded===concept));assert(r.alreadyCollectedEvidence.some(d=>d.concept===concept&&d.value===value));});
 test(name+' complete bilingual contract parity',()=>{const r=run(facts),en=V.adaptiveContract(r),zh=V.adaptiveContract(run(facts));assert.deepEqual(JSON.parse(JSON.stringify(en)),JSON.parse(JSON.stringify(zh)));for(const k of ['engineVersion','supportingEvidence','opposingEvidence','unresolvedRuleOuts','evidenceStateReasons'])assert(Object.hasOwn(en,k));});
}
test('insufficient saturation',()=>assert.equal(run({}).evidenceState,'insufficient'));
test('still discriminating saturation',()=>assert.equal(run({...bases.mood,...bases.ocd}).evidenceState,'still_discriminating'));
test('reasonably saturated is qualitative',()=>{const r=run(bases.mood);assert.equal(r.evidenceState,'reasonably_saturated');assert(!Object.hasOwn(r,'diagnosticProbability'));});
test('medical unknown prevents saturation',()=>assert.notEqual(run({...bases.mood,'mood.medical':'unknown'}).evidenceState,'reasonably_saturated'));
test('Safety clarification retained at top-level handoff',()=>{const r=V.evaluate(Object.entries(bases.mood).map(([k,v])=>V.node(k,v)),G.empty());assert(V.adaptiveContract(r).unresolvedRuleOuts.includes('safety_clarification'));assert.notEqual(r.evidenceState,'reasonably_saturated');});
for(const [name,facts,urgency]of [
 ['suicide',{'suicide.intent':true},'acute'],['self harm',{'selfHarm.currentUrges':true},'elevated'],
 ['violence',{'harmToOthers.intent':true},'acute'],['dangerous command',{'psychosis.commandOtherHarm':true,'harmToOthers.intent':true},'acute'],
 ['medical',{'medical.lossOfConsciousness':true},'acute'],['eating instability',{'selfCare.unableToDrink':true,'selfCare.severeFunctionalCollapse':true},'acute'],
 ['delirium',{'medical.severeConfusion':true},'acute'],['mania dyscontrol',{'mania.inabilityToControlBehavior':true,'mania.impairedJudgment':true},'acute'],
 ['self care',{'selfCare.unableToRemainSafelyAlone':true},'acute'],['withdrawal',{'substances.severeWithdrawalConcern':true},'acute']
])test('Safety authority '+name,()=>{const s=safe();for(const [k,v]of Object.entries(facts))G.put(s,k,v);const expected=G.evaluate(s),r=run(bases.mood,s);assert.equal(r.safetyState.urgency,urgency);assert.equal(r.safetyState.requiresInterruption,expected.requiresInterruption);if(expected.requiresInterruption){assert(r.blocked);assert.equal(r.candidateDirections.length,0);}});
test('every rule family is unreviewed',()=>{for(const r of [...V.extraRules,...V.processingRules,...V.contradictionRules,...V.discriminatorRegistry,...[...V.domains.values()].flatMap(d=>[...d.supportingRules,...d.opposingRules])]){assert.equal(r.reviewStatus,'unreviewed');assert.equal(r.version,V.version);}});
console.log('Differential v2 finalization: '+count+' tests passed.');
