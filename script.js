
document.addEventListener("DOMContentLoaded", () => {
  // MENÚ PARA CELULARES
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", isOpen);
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  // CERRAR EL MENÚ AL ELEGIR UNA SECCIÓN
  navMenu.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.textContent = "☰";
    });
  });

  // ANIMACIONES AL DESPLAZARSE
  const elements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    elements.forEach(element => observer.observe(element));
  } else {
    elements.forEach(element => element.classList.add("show"));
  }

  // BOTÓN PARA VOLVER ARRIBA
  const backToTop = document.getElementById("backToTop");

  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 450);
  }, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  // AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
  document.getElementById("year").textContent =
    new Date().getFullYear();

  // PEDIDOS POR WHATSAPP
  // CAMBIA ESTE NÚMERO POR EL TUYO.
  // Formato: código de país + número, sin + ni espacios.
  const whatsappNumber = "51999999999";

  document.querySelectorAll(".order-button").forEach(button => {
    button.addEventListener("click", () => {
      const product = button.dataset.product;

      if (whatsappNumber === "51999999999") {
        alert(
          "¡Casi listo! Abre script.js y cambia whatsappNumber " +
          "por tu número real de WhatsApp antes de usar los pedidos."
        );
        return;
      }

      const message =
        `¡Hola! Quisiera consultar disponibilidad y precio para: ${product}.`;

      const url =
        "https://wa.me/" + whatsappNumber +
        "?text=" + encodeURIComponent(message);

      window.open(url, "_blank", "noopener,noreferrer");
    });
  });
});
