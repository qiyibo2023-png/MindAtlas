// Dependency-free bilingual recovery copy, intentionally available if i18n fails.
(function(){'use strict';
 const translationFailure=/Missing translation|Incomplete translation|Invalid bilingual message|Unsupported locale|Translation placeholder|Missing message argument|Duplicate translation/;
 function recover(){
  const app=document.getElementById('app');if(!app||app.querySelector('[data-translation-failure]'))return;
  app.innerHTML='<main data-translation-failure tabindex="-1" role="alert"><h1>暂时无法显示完整页面 / We could not display the full page</h1><p lang="zh-CN">部分语言信息未能加载，评估暂时无法继续。这不表示你已被判断为处于危险中。</p><p lang="en">Some language information could not load, so the assessment cannot continue. This does not mean you have been assessed as being in danger.</p><p lang="zh-CN">若你现在有即刻危险或严重身体症状，请联系当地急救或前往急诊。此页面无人实时监看，不能派出救援。</p><p lang="en">If you are in immediate danger or have severe physical symptoms, contact local emergency services or emergency care. Nobody monitors this page; it cannot dispatch help.</p><p lang="zh-CN">重新加载会清除当前页面答案。</p><p lang="en">Reloading clears answers held in this page.</p><button type="button" data-reload>刷新并重新开始 / Reload and start again</button></main>';
  app.querySelector('[data-reload]').onclick=()=>location.reload();app.querySelector('main').focus();
 }
 globalThis.MindAtlasTranslationRecovery={recover};
 globalThis.addEventListener?.('error',event=>{if(translationFailure.test(event.message||event.error?.message||''))recover();});
 globalThis.addEventListener?.('unhandledrejection',event=>{if(translationFailure.test(String(event.reason?.message||event.reason||'')))recover();});
})();
