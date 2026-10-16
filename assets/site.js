(function () {
  var btn = document.querySelector("[data-menu]");
  var nav = document.querySelector("[data-nav]");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("is-open");
        btn.setAttribute("aria-expanded", "false");
      });
    });
  }

  var bar = document.querySelector("[data-callbar]");
  var dismiss = document.querySelector("[data-dismiss-bar]");
  if (bar && dismiss) {
    try {
      if (sessionStorage.getItem("hideCallBar") === "1") {
        bar.hidden = true;
        document.body.classList.add("bar-hidden");
      }
    } catch (err) {}
    dismiss.addEventListener("click", function () {
      bar.hidden = true;
      document.body.classList.add("bar-hidden");
      try {
        sessionStorage.setItem("hideCallBar", "1");
      } catch (err) {}
    });
  }
})();
