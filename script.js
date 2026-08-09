// AVENS CONSEIL — comportements partagés

document.addEventListener("DOMContentLoaded", () => {
  // Menu mobile
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      toggle.classList.toggle("open");
      nav.classList.toggle("open");
      toggle.setAttribute(
        "aria-expanded",
        nav.classList.contains("open") ? "true" : "false"
      );
    });
    nav.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        toggle.classList.remove("open");
        nav.classList.remove("open");
      })
    );
  }

  // Révélation au scroll
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("in"));
  }

  // Année dans le footer
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Formulaire de contact -> ouverture d'un e-mail pré-rempli (mailto)
  const form = document.getElementById("contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const nom = (data.get("nom") || "").toString().trim();
      const email = (data.get("email") || "").toString().trim();
      const societe = (data.get("societe") || "").toString().trim();
      const sujet = (data.get("sujet") || "").toString().trim();
      const message = (data.get("message") || "").toString().trim();

      const subjectLine = `[Site web] ${sujet || "Prise de contact"} — ${nom || "Nouveau contact"}`;
      const bodyLines = [
        `Nom : ${nom}`,
        `E-mail : ${email}`,
        `Société : ${societe}`,
        `Sujet : ${sujet}`,
        "",
        "Message :",
        message,
      ];

      const mailto = `mailto:contact@avens-conseil.fr?subject=${encodeURIComponent(
        subjectLine
      )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

      window.location.href = mailto;
    });
  }
});
