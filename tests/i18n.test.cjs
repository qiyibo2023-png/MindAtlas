const fs=require('fs'),vm=require('vm'),assert=require('node:assert/strict');
let markup='';const nodes={app:{set innerHTML(s){markup=s;}},lang:{focus(){}},detail:{open:false,innerHTML:'',showModal(){this.open=true;},close(){this.open=false;}},'detail-lang':{focus(){}},'detail .close':{}};
// Freeze time so equivalent answer sequences have identical complete structures.
class FixedDate extends Date{constructor(...a){super(...(a.length?a:['2026-09-13T12:00:00.000Z']));}static now(){return new FixedDate().getTime();}}
const c={Date:FixedDate,document:{documentElement:{},querySelector:s=>nodes[s.slice(1)]||null,querySelectorAll:()=>[],getElementById:id=>nodes[id]||null},window:{scrollTo(){}}};
vm.createContext(c);
for(const m of fs.readFileSync('dist/index.html','utf8').matchAll(/<script src="([^"]+)"/g))vm.runInContext(fs.readFileSync('dist/'+m[1],'utf8'),c,{filename:m[1]});
const {Mood:M,Anxiety:A,OCD:O,GlobalSafety:G,I18n:I}=c;
const clone=x=>JSON.parse(JSON.stringify(x));
const results=[];function test(name,fn){fn();results.push(name);console.log('PASS I18N '+name);}
function locale(l){vm.runInContext('lang='+l,c);}
function moduleState(module,answers,l){let s=module.emptyState();for(const [id,value]of Object.entries(answers)){const q=module.questions.find(q=>q.id===id);assert(q,id);const option=q.options?.find(o=>o[0]===value);if(q.type==='month'){s=module.setAnswer(s,id,value);continue;}assert(option,id+': '+value);const visible=option[l+1];assert(visible.trim());const decoded=q.options.find(o=>o[l+1]===visible);assert.equal(decoded[0],value,'Translated answer maps to original ID');s=module.setAnswer(s,id,decoded[0]);}return s;}
const moodAnswers={'intro.agree':'yes','intro.age':'yes','phq.0':'2','phq.1':'2','phq.8':'0'};
const anxietyAnswers={'intro.agree':'yes','intro.age':'adult','intro.respondent':'self','clusters.gad':'yes','gad7.0':'2','gad7.1':'2'};
const ocdAnswers={'intro.agree':'yes','intro.immediate':'no','obsessions.present':'yes','obsessions.ego':'yes','themes.harm':'yes','visible.check':'yes','cycle.response':'yes','cycle.relief':'yes','impact.time':'1to3','impact.work':'2','harm.intrusive':'yes','harm.desire':'no','harm.intent':'no','harm.plan':'no'};
for(const [name,module,answers,assess]of [['Mood',M,moodAnswers,s=>M.assess(s)],['Anxiety',A,anxietyAnswers,s=>A.assess(s,{})],['OCD',O,ocdAnswers,s=>O.assess(s,{},{})]])test(name+' translated answer labels preserve complete state, scores and differential results',()=>{
 const states=[0,1].map(l=>{locale(l);return moduleState(module,answers,l);});assert.deepEqual(clone(states[0]),clone(states[1]));
 const output=states.map((s,l)=>{locale(l);return clone(assess(s));});assert.deepEqual(output[0],output[1]);
 for(const l of [0,1])assert(module.summary(states[l],output[l],l).includes(l?'Assessment Summary':'评估摘要'));
});
test('all questions, options, sections, references and differential names have two nonempty translations',()=>{
 let count=0;for(const module of [M,A,O]){for(const q of module.questions){I.text(q.label,0);I.text(q.label,1);for(const option of q.options||[]){I.text(option.slice(1),0);I.text(option.slice(1),1);}count++;}for(const section of module.sections){I.text(section.title,0);I.text(section.title,1);if(section.help){I.text(section.help,0);I.text(section.help,1);}}for(const ref of module.references){I.text(ref.title,0);I.text(ref.title,1);}}
 assert(count>300);for(const p of G.critical){assert(G.questionLabels[p],p);I.text(G.questionLabels[p],0);I.text(G.questionLabels[p],1);}
});
test('missing keys, locales, translations and mismatched placeholders fail loudly',()=>{
 assert.throws(()=>I.t('future.missing',0),/Missing translation/);assert.throws(()=>I.register('test',{missing:['中文','']}),/Incomplete translation/);assert.throws(()=>I.register('test',{bad:['你好 {name}','Hello']}),/placeholder mismatch/);assert.throws(()=>I.t('common.yes','fr'),/Unsupported locale/);assert.throws(()=>I.t('common.timeBurden',0),/Missing message argument/);
});
test('all catalog entries have both locales and equivalent interpolation contracts',()=>{assert(I.keys().length>1100);for(const key of I.keys()){const pair=I.pair(key);assert.equal(pair.length,2);assert(pair.every(x=>typeof x==='string'&&x.trim()));}});
const safetyCases=[
 ['requested life-ending intent and plan','我现在打算结束自己的生命，而且已经有计划。','I currently intend to end my life and I already have a plan.'],
 ['requested family harm images','我脑子里总出现伤害家人的画面，这让我非常害怕，但我根本不想伤害他们。','I keep getting images of hurting my family. They terrify me, but I do not want to hurt them.'],
 ['requested chest pain and near-fainting','我突然胸口剧烈疼痛，喘不过气，而且差点晕过去。','I suddenly developed severe chest pain, cannot breathe properly, and almost passed out.'],
 ['passive death wish','我希望一睡不醒，但我不想自杀。',"I wish I could go to sleep and never wake up, but I don't want to kill myself."],
 ['clarification','我在想自杀。','I am thinking about suicide.'],
 ['acute suicide','我打算自杀。','I intend to kill myself.'],
 ['medical emergency','我已经服药过量。','I have taken an overdose.'],
 ['intrusive harm without intent','我害怕伤害别人的侵入性想法，但我不想伤害别人，也没有意图或计划。','I fear intrusive thoughts of harming others, but I do not want to hurt anyone and have no intent or plan.']
];
for(const [name,zh,en]of safetyCases)test(name+' equivalent Chinese/English free text preserves urgency and structured findings',()=>{
 const a=G.fromExtraction(G.extract(zh)),b=G.fromExtraction(G.extract(en));
 assert.deepEqual(clone(a),clone(b));
 for(const l of [0,1]){locale(l);const before=clone(a.result);const html=G.panel(a.result);assert(html.includes('data-assessment-status="'+a.result.assessmentStatus+'"'));assert.deepEqual(clone(a.result),before);}
});
test('translated clarification choices write identical clinical fields including unknown',()=>{
 const responses=[];for(const l of [0,1]){locale(l);G.reset();for(const [field,value]of [['suicide.intent',false],['suicide.plan','unknown'],['suicide.preparation',false]]){assert(I.text(G.questionLabels[field],l));G.answer(field,value);}responses.push(clone(G.store.signals));}assert.deepEqual(responses[0],responses[1]);
});
test('intrusive thoughts and actual intent remain distinct in both languages',()=>{
 for(const l of [0,1]){locale(l);const intrusion=G.evaluate({harmToOthers:{violentThoughts:true,thoughtsUnwanted:true,actualDesire:false,intent:false,plan:false}}),intent=G.evaluate({harmToOthers:{violentThoughts:true,intent:true}});assert(!intrusion.requiresInterruption);assert(intent.requiresInterruption);assert(!G.panel(intrusion).includes('role="alert"'));assert(G.panel(intent).includes('role="alert"'));}
});
test('extraction parity fixes preserve negation and actual intent overrides intrusive context',()=>{
 for(const text of ['I am not thinking about suicide.','我没有自杀想法。','I never think about suicide.','我不在想自杀。'])assert.notEqual(G.extract(text).signals.suicide.suicidalIdeation,true,text);
 for(const text of ['I fear intrusive thoughts of harming others, but I intend to hurt him.','我害怕伤害别人的侵入性想法，但我打算伤害他。'])assert(G.fromExtraction(G.extract(text)).result.requiresInterruption,text);
 for(const text of ['I am not thinking about suicide, but I intend to kill myself.','我没有自杀想法，但我打算自杀。'])assert(G.fromExtraction(G.extract(text)).result.requiresInterruption,text);
});
function stores(){return clone([M.store,A.store,O.store,G.store]);}
for(const [route,module,answers,step]of [['screen',M,moodAnswers,1],['anxiety',A,anxietyAnswers,'gad7'],['ocd',O,ocdAnswers,'obsessions']]){
 test('switching language during '+route+' retains answers, step, route and safety state',()=>{G.reset();module.store.state=moduleState(module,answers,0);module.store.step=step;G.acknowledge();locale(0);vm.runInContext('navigate('+JSON.stringify(route)+')',c);const before=stores();nodes.lang.onclick();assert.deepEqual(stores(),before);assert.equal(vm.runInContext('view',c),route);assert.equal(c.document.documentElement.lang,'en');nodes.lang.onclick();assert.deepEqual(stores(),before);});
 test('switching language on '+route+' results preserves result object identity and summaries',()=>{G.reset();module.store.state=moduleState(module,answers,0);module.store.step=module===M?11:'results';G.acknowledge();locale(0);vm.runInContext('navigate('+JSON.stringify(route)+')',c);const before=stores(),result=module.store.result;assert(result);nodes.lang.onclick();assert.deepEqual(stores(),before);assert.equal(module.store.result,result);assert(markup.includes('Assessment Summary'));assert.equal(vm.runInContext('view',c),route);});
}
test('switching during clarification retains answers, unknowns, urgency and route',()=>{G.reset();G.answer('suicide.intent',false);G.answer('suicide.plan','unknown');locale(0);vm.runInContext("navigate('safety')",c);const before=stores();assert(markup.includes('我们需要先确认'));nodes.lang.onclick();assert(markup.includes('We need to clarify'));assert.deepEqual(stores(),before);assert.equal(vm.runInContext('view',c),'safety');});
test('switching during acute suicide or medical intervention cannot restore ordinary navigation',()=>{for(const signal of [{suicide:{intent:true}},{medical:{suspectedOverdose:true}}]){G.reset();G.store.signals=G.merge([G.empty(),signal]).signals;locale(0);vm.runInContext("navigate('ocd')",c);const before=stores();nodes.lang.onclick();assert.deepEqual(stores(),before);assert(markup.includes('role="alert"'));assert(!markup.includes('data-global="continue"'));assert(!markup.includes('data-view="screen"'));}});
test('all implemented assessment pages render in both languages without missing translations or Chinese leakage in English',()=>{
 for(const module of [M,A,O])for(const l of [0,1]){G.reset();locale(l);for(let index=0;index<module.sections.length;index++){module.store.step=module===M?index:module.sections[index].id;const html=module.render();assert(!html.includes('undefined'));if(l)assert(!/[\u3400-\u9fff]/.test(html),module===M?'Mood':module===A?'Anxiety':'OCD');}}
});
test('OCD time-burden explanations and boolean summaries carry the same facts',()=>{const s=moduleState(O,ocdAnswers,0),r=O.assess(s,{},{}),time=r.support.find(x=>x.key==='time');const option=O.questions.find(q=>q.id==='impact.time').options.find(o=>o[0]==='1to3');assert(time.text[0].includes(option[1]));assert(time.text[1].includes(option[2]));for(const l of [0,1]){const text=O.summary(s,r,l);assert(!/:\s*(true|false)(?:\s*\/|\n|$)/.test(text));assert(text.includes(I.boolean(r.visible,l)));}});
test('shared library, care, evidence and every topic detail have bilingual presentation',()=>{
 for(const l of [0,1]){locale(l);G.reset();for(const route of ['library','care','evidence']){vm.runInContext('navigate('+JSON.stringify(route)+')',c);assert(!markup.includes('undefined'));if(l)assert(!/[\u3400-\u9fff]/.test(markup.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1]),route);}
  for(let n=0;n<vm.runInContext('topics.length',c);n++){vm.runInContext('detail('+n+')',c);assert(!nodes.detail.innerHTML.includes('undefined'));if(l)assert(!/[\u3400-\u9fff]/.test(nodes.detail.innerHTML.replace(/<button[^>]*id="detail-lang"[^>]*>[\s\S]*?<\/button>/,'')));nodes['detail .close'].onclick();}
 }
});
test('language switching inside a topic dialog preserves its topic, open state and route',()=>{G.reset();locale(0);vm.runInContext("navigate('library');detail(0)",c);nodes['detail-lang'].onclick();assert(nodes.detail.open);assert(nodes.detail.innerHTML.includes('Depression'));assert.equal(vm.runInContext('detailTopic',c),0);assert.equal(vm.runInContext('view',c),'library');nodes['detail .close'].onclick();});
test('evidence organizations are translated without changing reference identifiers or URLs',()=>{for(const module of [M,A,O])for(const ref of module.references){assert(ref.id&&ref.url.startsWith('https://'));I.text(ref.organization,0);I.text(ref.organization,1);}});
test('build validation rejects missing keys and newly hardcoded UI before shipping',()=>{
 const path=require('node:path'),root=fs.mkdtempSync('work/i18n-validator-');fs.mkdirSync(path.join(root,'i18n'));
 for(const name of ['runtime.js','catalog.js'])fs.copyFileSync('src/i18n/'+name,path.join(root,'i18n',name));
 const {validate}=require(path.resolve('scripts/validate-i18n.cjs'));
 for(const [code,error]of [["I18n.t('future.missing',0)",/Missing translation/],["const label='没有翻译';",/Inline Chinese/],["const html='<h1>Untranslated title</h1>';",/Untranslated literal markup/]]){fs.writeFileSync(path.join(root,'future-ui.js'),code);assert.throws(()=>validate(path.resolve(root)),error);}
});
test('clinical decision engines do not read the presentation locale',()=>{for(const file of ['mood/scoring.js','mood/engine.js','anxiety/engine.js','ocd/engine.js','safety/engine.js','safety/rules.js'])assert(!/\blang\b|I18n\.presentationOnly/.test(fs.readFileSync('src/'+file,'utf8')),file);});
test('requested examples retain the intended clinical domains and independent intent distinctions',()=>{
 const intent=G.fromExtraction(G.extract(safetyCases[0][1])),intrusion=G.fromExtraction(G.extract(safetyCases[1][1])),medical=G.fromExtraction(G.extract(safetyCases[2][1]));assert.equal(intent.result.urgency,'acute');assert.equal(intent.signals.suicide.plan,true);assert.equal(intrusion.result.requiresInterruption,false);assert.equal(intrusion.signals.harmToOthers.actualDesire,false);assert.equal(intrusion.signals.harmToOthers.thoughtsUnwanted,true);assert.equal(intrusion.signals.harmToOthers.intent,"unknown");assert.equal(medical.result.primaryDomain,'medical');assert(medical.result.requiresInterruption);
 for(const phrase of ['我不打算结束自己的生命。','I do not intend to end my life.','我没有胸口剧烈疼痛，也没有晕过去。','I do not have severe chest pain and have never passed out.'])assert(!G.fromExtraction(G.extract(phrase)).result.requiresInterruption,phrase);
});
test('midpoint steps and complete results survive both switching directions in every module',()=>{for(const [route,module,answers]of [['screen',M,moodAnswers],['anxiety',A,anxietyAnswers],['ocd',O,ocdAnswers]]){G.reset();locale(0);module.store.state=moduleState(module,answers,0);const mid=Math.floor(module.sections.length/2);module.store.step=module===M?mid:module.sections[mid].id;G.acknowledge();vm.runInContext('navigate('+JSON.stringify(route)+')',c);const before=stores();for(let n=0;n<2;n++){nodes.lang.onclick();assert.deepEqual(stores(),before);assert.equal(vm.runInContext('view',c),route);}module.store.step=module===M?11:'results';vm.runInContext('render()',c);const complete=stores(),result=module.store.result;for(let n=0;n<2;n++){nodes.lang.onclick();assert.deepEqual(stores(),complete);assert.equal(module.store.result,result);}}});
test('elevated and acute free-text-derived safety states survive bidirectional switching',()=>{for(const text of ['I am thinking about suicide.',safetyCases[0][2],safetyCases[2][2]]){G.reset();G.submitText(text);locale(0);vm.runInContext("navigate('safety')",c);const before=stores(),result=clone(G.current());for(let n=0;n<2;n++){nodes.lang.onclick();assert.deepEqual(stores(),before);assert.deepEqual(clone(G.current()),result);assert.equal(vm.runInContext('view',c),'safety');}}});
test('glossary covers all required concepts with one stable terminology identifier',()=>{assert.equal(Object.keys(I.terms).length,14);for(const id of Object.keys(I.terms)){assert(I.term(id,0));assert(I.term(id,1));assert(!/[\u3400-\u9fff]/.test(I.term(id,1)));}});
test('duplicate catalog entries are rejected before an overwritten translation can disappear',()=>{assert.throws(()=>I.register('duplicateTest',[['same',['一','One']],['same',['二','Two']]]),/Duplicate translation/);});
test('validator detects orphan translation resources',()=>{const path=require('node:path'),root=fs.mkdtempSync('work/i18n-orphan-');fs.mkdirSync(path.join(root,'i18n'));for(const name of ['runtime.js','catalog.js'])fs.copyFileSync('src/i18n/'+name,path.join(root,'i18n',name));assert.throws(()=>require(path.resolve('scripts/validate-i18n.cjs')).validate(path.resolve(root)),/Orphan translation keys/);});
test('production translation recovery is bilingual, interruptive and does not alter clinical state',()=>{const listeners={},button={},heading={focus(){this.focused=true;}},app={innerHTML:'',querySelector:s=>s==='[data-translation-failure]'?null:s==='[data-reload]'?button:heading};const state={signals:{suicide:{intent:true}}};const context={document:{getElementById:()=>app},addEventListener:(name,fn)=>listeners[name]=fn,GlobalSafety:state};vm.runInNewContext(fs.readFileSync('src/i18n/fallback.js','utf8'),context);listeners.error({message:'Missing translation: fake.key'});assert(app.innerHTML.includes('暂时无法显示完整页面'));assert(app.innerHTML.includes('We could not display the full page'));assert(!app.innerHTML.includes('data-view='));assert(app.innerHTML.includes('lang="en"'));assert(heading.focused);assert.equal(context.GlobalSafety,state);});
fs.writeFileSync('work/i18n-test-results.json',JSON.stringify({passed:results.length,tests:results},null,2));
