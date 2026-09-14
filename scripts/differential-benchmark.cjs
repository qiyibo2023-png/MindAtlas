const fs=require('node:fs'),path=require('node:path'),{isDeepStrictEqual}=require('node:util');
const root=path.resolve(__dirname,'..'),cases=require(root+'/benchmarks/differential-v1/cases.cjs'),c=require(root+'/tests/differential-v2-harness.cjs')(),{DifferentialV2:V,GlobalSafety:G}=c;
const clone=x=>JSON.parse(JSON.stringify(x)),unique=xs=>[...new Set(xs)],metrics=Object.fromEntries(['primaryAgreement','acceptableDirectionCoverage','cooccurrenceRetention','safetyPriority','contradictionDetection','missingCriticalEvidence','ruleoutRetention','unresolvedDiscriminators','statusAgreement','unsupportedRetention'].map(k=>[k,{passed:0,total:0}]));
const errors=[],results=[],interactions={};let falseSingleWinner=0,multiExpected=0;
function check(metric,ok,enabled=true){if(enabled){metrics[metric].total++;if(ok)metrics[metric].passed++;}return !enabled||ok;}
for(const row of cases){
 const safety=G.empty();for(const p of G.paths)G.put(safety,p,false);for(const [p,v]of Object.entries(row.safety||{}))G.put(safety,p,v);
 const nodes=row.structuredEvidence.map((e,i)=>V.node(e.concept,e.value,{...e,id:e.id||'benchmark:'+i,source:e.source||(V.domainIds.includes(e.concept.split('.')[0])?e.concept.split('.')[0]:'clarification')}));
 const r=V.evaluate(nodes,safety),primary=unique(r.candidateDirections.filter(d=>r.primaryDirections.includes(d.id)).map(d=>d.domain)),supported=unique(r.candidateDirections.filter(d=>d.level>=2).map(d=>d.domain)),actual=unique(r.candidateDirections.filter(d=>d.level>0).map(d=>d.domain));
 const failures=[];const record=(name,ok,enabled=true)=>{if(!check(name,ok,enabled))failures.push(name);};
 record('primaryAgreement',row.expectedPrimaryDirections.every(d=>primary.includes(d))&&(!row.expectedNoPrimary||!primary.length));
 record('acceptableDirectionCoverage',row.expectedPrimaryDirections.every(d=>supported.includes(d))&&actual.every(d=>[...row.expectedPrimaryDirections,...row.acceptableCooccurringDirections,...row.acceptableAlternatives].includes(d)||r.candidateDirections.filter(c=>c.domain===d).every(c=>c.level<2)));
 // Acceptable is a permissible outcome, not mandatory positive evidence.
 // Retention is scored where the fixture independently supports multiple domains.
 record('cooccurrenceRetention',row.expectedPrimaryDirections.every(d=>supported.includes(d)),row.expectedPrimaryDirections.length>1);
 record('safetyPriority',r.safetyState.urgency===row.expectedSafetyState&&(row.expectedSafetyState!=='acute'||r.blocked&&!r.candidateDirections.length));
 record('contradictionDetection',r.contradictions.some(x=>x.concept===row.expectedContradiction&&x.evidenceIds.length>=2&&x.resolved===!!row.expectedResolved),!!row.expectedContradiction);
 record('missingCriticalEvidence',row.expectedMissingEvidence.every(k=>r.missingEvidence.includes(k)),row.expectedMissingEvidence.length>0);
 record('ruleoutRetention',row.expectedUnresolvedRuleOuts.every(k=>r.unresolvedRuleOuts.includes(k)),row.expectedUnresolvedRuleOuts.length>0);
 record('unresolvedDiscriminators',row.expectedUnresolvedDiscriminators.every(k=>r.unresolvedDiscriminators.some(d=>d.conceptNeeded===k)),row.expectedUnresolvedDiscriminators.length>0);
 record('statusAgreement',row.expectedDifferentialStatus.includes(r.differentialStatus));
 record('unsupportedRetention',r.unsupportedAlternatives.includes(row.expectedUnsupported),!!row.expectedUnsupported);
 if(row.expectedOpposingEvidence.some(k=>!r.candidateDirections.some(d=>d.opposingEvidence.some(x=>x.concepts.includes(k)))))failures.push('opposingEvidence');
 if(row.expectedPrimaryDirections.length>1){multiExpected++;if(supported.length<2)falseSingleWinner++;}
 for(const expected of row.expectedPrimaryDirections)for(const observed of supported){const key=expected+' → '+observed;interactions[key]=(interactions[key]||0)+1;}
 if(failures.length)errors.push({id:row.id,tags:row.tags,failures,expected:row,actual:{primary,supported,status:r.differentialStatus},relevantEvidenceNodes:r.evidenceGraph?.nodes,candidates:r.candidateDirections,contradictions:r.contradictions,missingEvidence:r.missingEvidence,unresolvedDiscriminators:r.unresolvedDiscriminators,matchedRules:r.matchedRules,classification:'unresolved_pending_review'});
 results.push({id:row.id,pairId:row.pairId,language:row.language,result:r});
}
let bilingualPassed=0;const english=results.filter(r=>r.language==='en');for(const en of english){const zh=results.find(r=>r.pairId===en.pairId&&r.language==='zh-CN');if(zh&&isDeepStrictEqual(clone(en.result),clone(zh.result)))bilingualPassed++;}
const report={benchmarkVersion:'mindatlas-differential-benchmark-v1.0.0',engineVersion:V.version,reviewStatus:'unreviewed',caseCount:cases.length,independentScenarioCount:english.length,metrics,bilingualParity:{passed:bilingualPassed,total:english.length},falseSingleWinner:{count:falseSingleWinner,eligible:multiExpected},interactionSummary:interactions,errors:errors.map(e=>({id:e.id,failures:e.failures,classification:e.classification})),limitations:['Synthetic structured scenarios, not clinical validation.','Bilingual pairs share stable facts and are not independent patients.','Combinatorial cases test multilabel retention; the interaction table is not a single-diagnosis confusion matrix.','Failed cases require documented review; labels are not adjusted automatically.']};
const tagged=tag=>cases.filter(c=>c.tags.includes(tag)).length;
report.categoryDistribution={languages:Object.fromEntries(['en','zh-CN'].map(l=>[l,cases.filter(c=>c.language===l).length])),bilingualPairs:english.length,pureDomain:tagged('pure'),pairwise:tagged('pairwise'),multiDomain:tagged('three-domain'),contradiction:cases.filter(c=>c.expectedContradiction).length,missingEvidence:tagged('missing'),unknownEvidence:tagged('unknown'),safety:tagged('safety'),medical:tagged('medical'),medication:tagged('medication'),substance:tagged('substance'),sleep:tagged('sleep'),hardBoundary:tagged('hard')};
report.categoryDefinition='Counts are localized cases; tags overlap. Contradiction includes resolved precedence disagreements. Bilingual pairs are not independent patients.';
fs.mkdirSync(root+'/work',{recursive:true});fs.writeFileSync(root+'/work/differential-benchmark-v1.json',JSON.stringify(report,null,2));fs.writeFileSync(root+'/work/differential-benchmark-errors.json',JSON.stringify(errors,null,2));
console.log(JSON.stringify(report,null,2));
module.exports={report,errors};
