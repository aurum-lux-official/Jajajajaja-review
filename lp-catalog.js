(function(){
  "use strict";
  var key=(location.pathname.match(/\/([^/]+)\.html$/i)||[])[1];
  var catalog={
    andrew:{product:"ARANY",graph:"ehlers-cycle-3d.html",graphName:"EHLERS CYCLE SPECTRUM",systems:["Axiom Flow","Vector Pulse","Atlas Grid"]},
    aurelia:{product:"ORO",graph:"wavelet-3d.html",graphName:"WAVELET SCALOGRAM",systems:["Luminous Flow","Rosé Pulse","Ivory Lattice"]},
    johnny:{product:"CHRYSOS",graph:"fourier-epicycles-3d-gold.html",graphName:"FOURIER EPICYCLES",systems:["Redline Flow","Ignition Pulse","Autobahn Grid"]},
    maden:{product:"ALTIN",graph:"hilbert-3d.html",graphName:"HILBERT TRANSFORM",systems:["Deepwave Flow","Teal Signal","Forge Grid"]},
    makoto:{product:"KOGANE",graph:"adaptive-envelope.html",graphName:"ADAPTIVE ENVELOPE",systems:["Kintsugi Flow","Hayate Pulse","Seigai Grid"]},
    mark:{product:"GULD",graph:"liquidity-vector.html",graphName:"LIQUIDITY VECTOR",systems:["Compass Flow","Nordic Pulse","Ledger Grid"]},
    nova:{product:"ZOLOTO",graph:"spectral-resonance.html",graphName:"SPECTRAL RESONANCE",systems:["Quantum Flow","Nebula Pulse","Cosmos Grid"]},
    pal:{product:"SONA",graph:"market-topology.html",graphName:"MARKET TOPOLOGY",systems:["Friendly Flow","Sunny Pulse","Harbor Grid"]},
    victor:{product:"ZAHAV",graph:"vwap-reversion-3d.html",graphName:"VWAP REVERSION",systems:["Sovereign Flow","Rouge Pulse","Citadel Grid"]}
  };
  var item=catalog[key]; if(!item)return;
  document.documentElement.dataset.product=item.product;
  document.title=item.product+" — "+document.title;
  var brand=document.querySelector(".nav .brand");
  if(brand){brand.textContent=item.product;brand.setAttribute("aria-label",item.product+" トップへ");}
  var nav=document.querySelector(".nav"),menu=document.getElementById("nav-menu"),burger=document.getElementById("nav-burger"),apply=nav&&nav.querySelector(':scope > .btn');
  if(apply)apply.textContent="EA申請";
  if(menu){
    menu.innerHTML='<a href="#system">SYSTEM</a><a href="#performance">PERFORMANCE</a><a href="#ranking">RESULTS</a><a href="#systems3">LINEUP</a><a href="#pricing">PRICING</a><a href="#risk">RISK</a><a href="#guide">SUPPORT</a><a href="#faq">FAQ</a><a class="nav-calendar" href="#calendar">EA稼働危険日カレンダー</a>';
    menu.setAttribute("aria-label","メインメニュー");
  }
  if(burger){burger.setAttribute("aria-controls","nav-menu");burger.textContent="メニュー";}
  var main=document.querySelector(".hero-main");
  if(main){var mark=document.createElement("p");mark.className="product-mark";mark.textContent=item.product;main.insertBefore(mark,main.querySelector(".kicker"));}
  document.querySelectorAll(".sys3-name").forEach(function(el,i){if(!item.systems[i])return;var tag=el.querySelector(".sys3-tag");el.textContent=item.systems[i];if(tag)el.appendChild(tag);});
  document.querySelectorAll('.sysopt input[name="System"]').forEach(function(input,i){
    if(!item.systems[i])return;var span=input.nextElementSibling;var tag=span&&span.querySelector("em");if(span){span.textContent=item.systems[i];if(tag)span.appendChild(tag);}input.value=item.systems[i];input.dataset.displayName=item.systems[i];
  });
  document.querySelectorAll("#rk-body tr").forEach(function(row,i){var cell=row.children[2];if(cell)cell.textContent=item.systems[i%3];});
  var screens=document.querySelector(".sec--screens .wrap");
  if(screens){
    var lead=screens.querySelector(".sec-lead");if(lead)lead.textContent=item.product+"の分析思想を、価格・周期・流動性の関係として立体表示します。";
    var old=screens.querySelector(".shots-soon");
    var viz=document.createElement("div");viz.className="logic-viz reveal";
    viz.innerHTML='<iframe src="./graphs/'+item.graph+'?v=3" title="'+item.product+' '+item.graphName+' ロジック概念可視化" loading="lazy" referrerpolicy="no-referrer"></iframe><div class="logic-viz-meta"><b>'+item.product+' / '+item.graphName+'</b><span>ロジックの考え方を説明する概念可視化です。実際の取引履歴・収益・将来の成果を示すものではありません。</span></div>';
    if(old)old.replaceWith(viz);else screens.appendChild(viz);
  }
  var calendar=document.getElementById("calendar");
  if(calendar){
    var view=document.createElement("div");view.className="calendar-view";view.id="calendar-view";view.hidden=true;view.setAttribute("role","dialog");view.setAttribute("aria-modal","true");view.setAttribute("aria-labelledby","calendar-view-title");
    var head=document.createElement("div");head.className="calendar-view-head";head.innerHTML='<button class="calendar-view-close" type="button">← LPへ戻る</button><p class="calendar-view-title" id="calendar-view-title">EA稼働危険日カレンダー</p>';
    view.appendChild(head);view.appendChild(calendar);document.body.appendChild(view);
    var close=view.querySelector(".calendar-view-close");
    function closeMenu(){if(menu)menu.classList.remove("open");if(burger)burger.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open");}
    function openCalendar(event){if(event)event.preventDefault();closeMenu();view.hidden=false;document.body.classList.add("calendar-open");view.scrollTop=0;close.focus();}
    function closeCalendar(){view.hidden=true;document.body.classList.remove("calendar-open");if(burger)burger.focus();}
    if(menu)menu.addEventListener("click",function(event){var link=event.target.closest("a");if(!link)return;if(link.classList.contains("nav-calendar"))openCalendar(event);else closeMenu();});
    if(burger)burger.addEventListener("click",function(){setTimeout(function(){document.body.classList.toggle("menu-open",menu&&menu.classList.contains("open"));},0);});
    close.addEventListener("click",closeCalendar);
    view.addEventListener("click",function(event){if(event.target===view)closeCalendar();});
    document.addEventListener("keydown",function(event){if(event.key==="Escape"&&!view.hidden)closeCalendar();});
  }
})();
