// Synthetic, test-server-only controls. Never included by src/index.html.
(function(){const bar=document.createElement('section');bar.setAttribute('aria-label','Synthetic Profile fixture');
const add=(label,run)=>{const b=document.createElement('button');b.textContent=label;b.onclick=run;bar.appendChild(b);};
add('Load synthetic Mood result',()=>{GlobalSafety.reset();for(const p of GlobalSafety.paths)GlobalSafety.answer(p,false);Mood.store.state=DifferentialFixtures.mood();Mood.store.result=Mood.assess(Mood.store.state);Mood.store.step=11;GlobalSafety.acknowledge();navigate('screen');});
add('Load synthetic acute Safety',()=>{GlobalSafety.answer('suicide.intent',true);GlobalSafety.answer('suicide.plan',true);navigate('screen');});
document.body.appendChild(bar);})();
