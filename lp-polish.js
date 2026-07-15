(function () {
  "use strict";
  var menu = document.getElementById("nav-menu");
  var burger = document.getElementById("nav-burger");
  var links = menu ? Array.prototype.slice.call(menu.querySelectorAll('a[href^="#"]')) : [];
  function closeMenu() {
    if (!menu || !burger) return;
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") closeMenu();
  });
  document.addEventListener("click", function (event) {
    if (!menu || !burger || !menu.classList.contains("open")) return;
    if (!menu.contains(event.target) && !burger.contains(event.target)) closeMenu();
  });
  if (!("IntersectionObserver" in window) || !links.length) return;
  var linkById = {};
  links.forEach(function (link) {
    var id = decodeURIComponent(link.getAttribute("href").slice(1));
    if (id) linkById[id] = link;
  });
  var sections = Object.keys(linkById).map(function (id) {
    return document.getElementById(id);
  }).filter(Boolean);
  function setCurrent(id) {
    links.forEach(function (link) {
      if (link === linkById[id]) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  }
  var visible = {};
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) visible[entry.target.id] = entry.boundingClientRect.top;
      else delete visible[entry.target.id];
    });
    var ids = Object.keys(visible);
    if (!ids.length) return;
    ids.sort(function (a, b) { return Math.abs(visible[a]) - Math.abs(visible[b]); });
    setCurrent(ids[0]);
  }, { rootMargin: "-20% 0px -65% 0px", threshold: 0 });
  sections.forEach(function (section) { observer.observe(section); });
})();
