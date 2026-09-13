// Synthetic acceptance statements only. No real user information.
const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');const c={};vm.createContext(c);
for(const f of ['schema','rules','engine','extraction'])vm.runInContext(fs.readFileSync('dist/safety/'+f+'.js','utf8'),c);
const G=c.GlobalSafety;
const cases=[
 ['explicit plan','I am depressed and I plan to kill myself tonight.',true],
 ['life ending plan','I currently plan to end my life.',true],
 ['negated plan','I do not plan to kill myself.',false],
 ['hypothetical plan','If I plan to kill myself, I would seek help.',false],
 ['historical plan','Years ago I plan to kill myself was something I wrote.',false],
 ['feared plan','I am terrified that I plan to kill myself.',false],
 ['Chinese plan','我已经有自杀计划。',true],
 ['Chinese plan denial','我没有自杀计划。',false]
];
for(const [name,text,positive]of cases){const e=G.extract(text);if(positive){assert.equal(e.signals.suicide.plan,true);assert.equal(G.evaluate(e.signals).urgency,'acute');}else assert.notEqual(e.signals.suicide.plan,true);console.log('PASS Router safety extraction '+name);}
const a=G.extract('I already have a suicide plan.'),b=G.extract('我已经有自杀计划。');assert.deepEqual(JSON.parse(JSON.stringify(a.signals)),JSON.parse(JSON.stringify(b.signals)));console.log('PASS Router safety extraction explicit-plan bilingual structured parity');
const harm=G.extract("I am terrified by intrusive thoughts of stabbing someone, but I don't want to hurt anyone and I keep avoiding knives.");assert.equal(harm.signals.harmToOthers.violentThoughts,true);assert.equal(harm.signals.harmToOthers.thoughtsUnwanted,true);assert.equal(harm.signals.harmToOthers.actualDesire,false);assert.notEqual(harm.signals.harmToOthers.intent,true);const hr=G.evaluate(harm.signals);assert.notEqual(hr.urgency,'acute');assert(hr.followup.includes('harmToOthers.intent'));console.log('PASS Router safety extraction intrusive stabbing triggers harm clarification without intent inference');
