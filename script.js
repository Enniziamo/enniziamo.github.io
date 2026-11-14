
"use strict";

// Mobile navigation
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("active");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Close navigation" : "Open navigation"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Close menu after navigation
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
  });
});

// Automatic copyright year
document.querySelector("#year").textContent =
  new Date().getFullYear();

// Highlight active navigation section
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(
  '.nav-links a[href^="#"]'
);

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      navigationLinks.forEach(link => {
        const active = link.getAttribute("href") ===
          `#${entry.target.id}`;

        if (active) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  }, {
    rootMargin: "-25% 0px -65% 0px"
  });

  sections.forEach(section => observer.observe(section));
}
