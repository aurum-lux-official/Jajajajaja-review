(function(){
  var root=document.documentElement,body=document.body,a=body.dataset.a||"#c5a059",b=body.dataset.b||"#66b8d1",bg=body.dataset.bg||"#05070b",panel=body.dataset.panel||bg;
  root.style.setProperty("--graph-a",a);root.style.setProperty("--graph-b",b);root.style.setProperty("--graph-bg",bg);root.style.setProperty("--graph-panel",panel);
  function rgb(hex){hex=hex.replace("#","");if(hex.length===3)hex=hex.split("").map(function(v){return v+v}).join("");return [parseInt(hex.slice(0,2),16),parseInt(hex.slice(2,4),16),parseInt(hex.slice(4,6),16)]}
  function rgba(hex,alpha){var v=rgb(hex);return "rgba("+v[0]+","+v[1]+","+v[2]+","+alpha+")"}
  var c=document.querySelector("canvas"),x=c.getContext("2d"),mode=body.dataset.mode||"spectral",t=0,reduce=matchMedia("(prefers-reduced-motion: reduce)").matches;
  function size(){var d=Math.min(devicePixelRatio||1,2);c.width=innerWidth*d;c.height=innerHeight*d;x.setTransform(d,0,0,d,0,0)}addEventListener("resize",size);size();
  function project(px,py,pz,w,h){var s=Math.min(w,h)*.32/(1+pz*.002);return [w*.53+(px-pz*.34)*s/100,h*.58+(py+pz*.18)*s/100]}
  function draw(){var w=innerWidth,h=innerHeight;x.clearRect(0,0,w,h);x.fillStyle=bg;x.fillRect(0,0,w,h);x.lineWidth=.65;
    for(var g=-5;g<=5;g++){x.strokeStyle=rgba(a,.10);x.beginPath();var p1=project(-110,g*20,80,w,h),p2=project(110,g*20,-80,w,h);x.moveTo(p1[0],p1[1]);x.lineTo(p2[0],p2[1]);x.stroke();}
    for(var layer=0;layer<5;layer++){x.beginPath();for(var i=0;i<=180;i++){var u=i/180,px=(u-.5)*210,pz=(layer-2)*28;var py;
      if(mode==="envelope")py=Math.sin(u*18+t*.7)*18+(layer-2)*9+Math.cos(u*5)*8;
      else if(mode==="liquidity")py=(Math.sin(u*11+layer)*15+Math.cos(u*27+t)*7)*(1-Math.abs(u-.5)*.6)+(layer-2)*6;
      else if(mode==="topology")py=Math.sin(u*14+t*.4+layer*.7)*22+Math.sin(u*37-layer)*6;
      else py=Math.sin(u*(12+layer*2)+t+layer)*20*Math.exp(-Math.pow(u-.55,2)*2)+(layer-2)*7;
      var q=project(px,py,pz,w,h);if(i)x.lineTo(q[0],q[1]);else x.moveTo(q[0],q[1]);}
      x.strokeStyle=layer===2?rgba(a,.94):(layer%2?rgba(b,.43):rgba(a,.35));x.lineWidth=layer===2?1.8:.8;x.stroke();}
    var glow=x.createRadialGradient(w*.55,h*.55,0,w*.55,h*.55,Math.min(w,h)*.35);glow.addColorStop(0,rgba(a,.065));glow.addColorStop(1,"transparent");x.fillStyle=glow;x.fillRect(0,0,w,h);t+=.012;if(!reduce)requestAnimationFrame(draw)}draw();
})();
