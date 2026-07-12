/* jacquimelman.com — shared behavior: nav toggle, gallery filter, lightbox */

(function () {
  "use strict";

  // Footer year
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Mobile navigation toggle
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Gallery filtering
  var filterButtons = document.querySelectorAll(".filter-btn");
  var works = document.querySelectorAll(".work");
  filterButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      filterButtons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");
      var filter = btn.dataset.filter;
      works.forEach(function (work) {
        var show = filter === "all" || work.dataset.category === filter;
        work.classList.toggle("hidden", !show);
      });
    });
  });

  // Lightbox
  var lightbox = document.getElementById("lightbox");
  if (lightbox) {
    var lbImg = lightbox.querySelector("img");
    var lbCaption = lightbox.querySelector(".lightbox-caption");
    var lbClose = lightbox.querySelector(".lightbox-close");

    var openLightbox = function (work) {
      var img = work.querySelector("img");
      var title = work.querySelector(".work-title");
      var meta = work.querySelector(".work-meta");
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      lbCaption.innerHTML =
        "<strong>" + (title ? title.textContent : "") + "</strong><br>" +
        (meta ? meta.textContent : "");
      lightbox.classList.add("open");
      lbClose.focus();
    };

    var closeLightbox = function () {
      lightbox.classList.remove("open");
      lbImg.src = "";
    };

    works.forEach(function (work) {
      work.addEventListener("click", function () { openLightbox(work); });
      work.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openLightbox(work);
        }
      });
    });

    lbClose.addEventListener("click", closeLightbox);
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
    });
  }

  // Contact form placeholder handler: until a real endpoint is wired up,
  // fall back to opening the visitor's mail client with the message prefilled.
  var form = document.querySelector("form[data-form-placeholder]");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var note = form.querySelector("[data-form-note]");
      var name = form.querySelector("#name").value;
      var email = form.querySelector("#email").value;
      var topic = form.querySelector("#topic");
      var topicText = topic.options[topic.selectedIndex].text;
      var message = form.querySelector("#message").value;
      var body =
        "Name: " + name + "\nEmail: " + email + "\nTopic: " + topicText + "\n\n" + message;
      // TODO: replace with the studio's real email address.
      window.location.href =
        "mailto:hello@jacquimelman.com" +
        "?subject=" + encodeURIComponent("Website inquiry: " + topicText) +
        "&body=" + encodeURIComponent(body);
      if (note) {
        note.hidden = false;
        note.textContent =
          "Your email app should open with the message prefilled. If it doesn't, please email the studio directly.";
      }
    });
  }
})();
