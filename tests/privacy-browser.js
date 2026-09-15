// Development-only synthetic fixtures. Never included in src or dist.
(function(){
 const panel=document.createElement('aside');panel.style='position:fixed;bottom:0;right:0;background:white;z-index:30;padding:8px';
 for(const mode of ['mood','anxiety','acute','flow']){const button=document.createElement('button');button.textContent='Synthetic privacy '+mode;button.onclick=()=>{
  if(mode==='flow'){
   if(!SymptomRouter.store.profile)throw Error('Run the visible symptom form first');
   for(const path of GlobalSafety.paths)GlobalSafety.answer(path,false);
   GlobalSafety.acknowledge();
   Mood.store.state=DifferentialFixtures.mood();Mood.store.result=Mood.assess(Mood.store.state);
   Differential.open();DifferentialV2.current();Adaptive.start();
   if(!Adaptive.submit('childhood_onset','no'))throw Error('Expected adaptive answer');
   navigate('adaptive');return;
  }
  PrivacyGovernance.deleteData({scope:'current_session',purpose:'user_requested_deletion',subject:'current_browser_session',storageTarget:'memory'});
  for(const path of GlobalSafety.paths)GlobalSafety.put(GlobalSafety.store.signals,path,false);
  if(mode==='mood'){Mood.store.state=DifferentialFixtures.mood();Mood.store.step=11;Mood.store.maxStep=11;navigate('screen');}
  if(mode==='anxiety'){Anxiety.store.state=DifferentialFixtures.gad();Anxiety.store.step='results';navigate('anxiety');}
  if(mode==='acute'){GlobalSafety.store.signals.medical.lossOfConsciousness=true;navigate('privacy');}
 };panel.appendChild(button);}document.body.appendChild(panel);
})();
