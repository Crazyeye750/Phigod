/* jacquimelman.com — nav, scroll effects, gallery filter, lightbox */

(function () {
  "use strict";

  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Header shadow on scroll
  var header = document.querySelector(".site-header");
  var onScroll = function () {
    header.classList.toggle("scrolled", window.scrollY > 20);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Full-screen mobile navigation
  var toggle = document.querySelector(".nav-toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Scroll-reveal animations
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  // Gallery filtering
  var filterButtons = document.querySelectorAll(".filter-btn");
  var works = Array.prototype.slice.call(document.querySelectorAll(".work"));
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

  // Lightbox with prev/next
  var lightbox = document.getElementById("lightbox");
  if (lightbox && works.length) {
    var lbImg = lightbox.querySelector("img");
    var lbCaption = lightbox.querySelector(".lightbox-caption");
    var current = 0;

    var visibleWorks = function () {
      return works.filter(function (w) { return !w.classList.contains("hidden"); });
    };

    var show = function (index) {
      var list = visibleWorks();
      if (!list.length) return;
      current = (index + list.length) % list.length;
      var work = list[current];
      var img = work.querySelector("img");
      lbImg.src = img.src;
      lbImg.alt = img.alt;
      var title = work.querySelector(".work-title");
      var meta = work.querySelector(".work-meta");
      lbCaption.innerHTML =
        "<strong>" + (title ? title.textContent : "") + "</strong>" +
        (meta ? meta.textContent : "") +
        " &nbsp;·&nbsp; " + (current + 1) + " / " + list.length;
      lightbox.classList.add("open");
    };

    var close = function () {
      lightbox.classList.remove("open");
      lbImg.src = "";
    };

    works.forEach(function (work) {
      var open = function () { show(visibleWorks().indexOf(work)); };
      work.addEventListener("click", open);
      work.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); }
      });
    });

    lightbox.querySelector(".lightbox-close").addEventListener("click", close);
    lightbox.querySelector(".lightbox-prev").addEventListener("click", function (e) { e.stopPropagation(); show(current - 1); });
    lightbox.querySelector(".lightbox-next").addEventListener("click", function (e) { e.stopPropagation(); show(current + 1); });
    lightbox.addEventListener("click", function (e) { if (e.target === lightbox) close(); });
    document.addEventListener("keydown", function (e) {
      if (!lightbox.classList.contains("open")) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(current - 1);
      if (e.key === "ArrowRight") show(current + 1);
    });
  }

  // Contact form: until a real endpoint is wired up, open the visitor's
  // mail client with the message prefilled.
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
      window.location.href =
        "mailto:dbjcompany@mac.com" +
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
