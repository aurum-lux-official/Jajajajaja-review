(function () {
  "use strict";
  var match = location.pathname.match(/\/([^/]+)\.html$/i);
  var character = match ? match[1].toLowerCase() : "";
  var characters = ["andrew", "aurelia", "johnny", "maden", "makoto", "mark", "nova", "pal", "victor"];
  if (characters.indexOf(character) === -1) return;

  document.documentElement.setAttribute("data-character", character);
  var hero = document.querySelector(".hero");
  if (!hero) return;

  var depth = document.createElement("div");
  depth.className = "hero-depth";
  depth.setAttribute("aria-hidden", "true");
  depth.innerHTML = "<span></span><span></span><span></span>";
  hero.insertBefore(depth, hero.querySelector(".hero-in"));

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  var fine = window.matchMedia("(hover: hover) and (pointer: fine)");
  if (reduce.matches || !fine.matches) return;

  var frame = 0;
  var nextX = 0;
  var nextY = 0;
  function paint() {
    frame = 0;
    hero.style.setProperty("--od-rx", (-nextY * 5).toFixed(2) + "deg");
    hero.style.setProperty("--od-ry", (nextX * 7).toFixed(2) + "deg");
    hero.style.setProperty("--od-px", (nextX * 10).toFixed(1) + "px");
    hero.style.setProperty("--od-py", (nextY * 8).toFixed(1) + "px");
  }
  hero.addEventListener("pointermove", function (event) {
    var box = hero.getBoundingClientRect();
    nextX = ((event.clientX - box.left) / box.width - .5) * 2;
    nextY = ((event.clientY - box.top) / box.height - .5) * 2;
    if (!frame) frame = requestAnimationFrame(paint);
  }, { passive: true });
  hero.addEventListener("pointerleave", function () {
    nextX = 0;
    nextY = 0;
    if (!frame) frame = requestAnimationFrame(paint);
  }, { passive: true });
})();
