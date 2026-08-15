/* ==========================================================================
   BRUSAN · Interactive UI & Translation Engine (i18n)
   - Zero-reload instant language switching (ES <-> EN)
   - Category filtering for portfolio showcases & accordion grid
   - Smooth anchor scrolling & Lucide icon initialization
   ========================================================================== */

const translations = {
  es: {
    "lang.toggle": "EN",
    "hero.badge": "Social Content, Development, Web/app design",
    "hero.tagline": "Conectamos tu <strong>producto</strong> con su audiencia",
    "hero.btn.portfolio": "mira nuestro portfolio",
    "hero.btn.contact": "nos queres contactar?",
    "portfolio.title": "nuestro <strong>portfolio</strong>",
    "tab.reels": "reels",
    "tab.carteleria": "cartelería",
    "tab.web": "web",
    "tab.integral": "integral",
    "showcase.tag.1": "Cartelería Urbana",
    "showcase.title.1": "QJ Motor Gerli — Outdoor Street Poster",
    "showcase.tag.2": "Totem Digital",
    "showcase.title.2": "QJ Motor — GERLI FORT 350",
    "showcase.tag.3": "Pantalla Costanera",
    "showcase.title.3": "QJ Motor — Riverside Display",
    "accordion.1.desc": "Visualización CGI de faros frontales y óptica de alta precisión.",
    "accordion.2.label": "Estudio CGI / Reels",
    "accordion.2.desc": "Render de estudio con iluminación de contraste para redes sociales.",
    "accordion.3.label": "Identidad & Emblem",
    "accordion.3.desc": "Detalle de marca y relieves metálicos en 3D.",
    "accordion.4.label": "Campaña Integral",
    "accordion.4.desc": "Producción técnica de llanta y sistema de frenado.",
    "accordion.5.label": "Social Reels",
    "accordion.5.desc": "Animación y cinematografía técnica nocturna.",
    "accordion.6.label": "Kiosco Urbano",
    "accordion.6.desc": "Integración visual en escenarios de lluvia.",
    "accordion.7.label": "Desarrollo Web",
    "accordion.7.desc": "Landing pages dinámicas de alto impacto.",
    "accordion.8.label": "Cartelería Exterior",
    "accordion.8.desc": "Presencia física en vía pública para comercios.",
    "accordion.9.label": "Contenido de Producto",
    "accordion.9.desc": "Modelado y renderización foto-realista.",
    "about.title": "quienes <strong>somos</strong>",
    "team.role.david": "Founder & Visual / Tech Lead",
    "team.role.daniel": "Co-Founder & Creative Director / Sales",
    "slogan.text": "ACOMPAÑAMOS EL CAMINO DE TU NEGOCIO CON CONTENIDO QUE IMPONE RESPETO",
    "manifesto.subline": "Le damos presencia visual al trabajo que mueve la zona todos los días.",
    "footer.watermark.line1": "DESARROLLO",
    "footer.watermark.line2": "VISUAL",
    "footer.slogan": "- desarrollo visual",
    "footer.nav.home": "Inicio",
    "footer.nav.portfolio": "Portfolio",
    "footer.nav.about": "Quienes Somos",
    "footer.nav.contact": "Contacto"
  },
  en: {
    "lang.toggle": "ES",
    "hero.badge": "Social Content, Development, Web/app design",
    "hero.tagline": "We connect your <strong>product</strong> with its audience",
    "hero.btn.portfolio": "explore our portfolio",
    "hero.btn.contact": "want to contact us?",
    "portfolio.title": "our <strong>portfolio</strong>",
    "tab.reels": "reels",
    "tab.carteleria": "signage",
    "tab.web": "web",
    "tab.integral": "full-suite",
    "showcase.tag.1": "Urban Signage",
    "showcase.title.1": "QJ Motor Gerli — Outdoor Street Poster",
    "showcase.tag.2": "Digital Totem",
    "showcase.title.2": "QJ Motor — GERLI FORT 350",
    "showcase.tag.3": "Riverside Display",
    "showcase.title.3": "QJ Motor — Riverside Display",
    "accordion.1.desc": "CGI visualization of front headlights and high-precision optics.",
    "accordion.2.label": "CGI Studio / Reels",
    "accordion.2.desc": "High-contrast studio rendering tailored for social media.",
    "accordion.3.label": "Identity & Emblem",
    "accordion.3.desc": "Brand detailing and 3D metallic embossing.",
    "accordion.4.label": "Full-Suite Campaign",
    "accordion.4.desc": "Technical engineering visualization of rim and braking system.",
    "accordion.5.label": "Social Reels",
    "accordion.5.desc": "Nighttime technical cinematography and motion visuals.",
    "accordion.6.label": "Urban Kiosk",
    "accordion.6.desc": "Photorealistic outdoor integration under rainy atmospheric conditions.",
    "accordion.7.label": "Web Development",
    "accordion.7.desc": "Dynamic, high-impact interactive landing pages.",
    "accordion.8.label": "Outdoor Signage",
    "accordion.8.desc": "Physical storefront and outdoor presence for businesses.",
    "accordion.9.label": "Product Content",
    "accordion.9.desc": "Precision 3D modeling and photorealistic rendering.",
    "about.title": "about <strong>us</strong>",
    "team.role.david": "Founder & Visual / Tech Lead",
    "team.role.daniel": "Co-Founder & Creative Director / Sales",
    "slogan.text": "WE EMPOWER YOUR BUSINESS JOURNEY WITH CONTENT THAT COMMANDS RESPECT",
    "manifesto.subline": "We give visual presence to the work that powers the region every single day.",
    "footer.watermark.line1": "VISUAL",
    "footer.watermark.line2": "DEVELOPMENT",
    "footer.slogan": "- visual development",
    "footer.nav.home": "Home",
    "footer.nav.portfolio": "Portfolio",
    "footer.nav.about": "About Us",
    "footer.nav.contact": "Contact"
  }
};

let currentLanguage = localStorage.getItem("brusan_lang") || "es";

function applyLanguage(lang, smooth = false) {
  currentLanguage = lang;
  localStorage.setItem("brusan_lang", lang);
  document.documentElement.lang = lang;

  const dict = translations[lang] || translations.es;

  const elements = document.querySelectorAll("[data-i18n]");

  elements.forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key]) {
      if (smooth) {
        el.style.opacity = "0.2";
        setTimeout(() => {
          el.innerHTML = dict[key];
          el.style.opacity = "1";
        }, 120);
      } else {
        el.innerHTML = dict[key];
      }
    }
  });

  const langLabel = document.getElementById("lang-label");
  if (langLabel) {
    langLabel.textContent = dict["lang.toggle"];
  }

  // Refresh Lucide icons if any icon tags were updated
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Language Switcher Toggle
  const langToggleBtn = document.getElementById("lang-toggle-btn");
  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      const nextLang = currentLanguage === "es" ? "en" : "es";
      applyLanguage(nextLang, true);
    });
  }

  // Apply saved language on load if different from default HTML
  if (currentLanguage !== "es") {
    applyLanguage(currentLanguage, false);
  }

  // 3. Portfolio Category Tabs Switching
  const tabBtns = document.querySelectorAll(".tab-btn");
  const showcaseItems = document.querySelectorAll(".showcase-item");
  const accordionCards = document.querySelectorAll(".accordion-card");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      showcaseItems.forEach((item) => {
        const itemCat = item.getAttribute("data-category");
        if (category === "all" || category === "integral" || itemCat === category) {
          item.style.display = "block";
          item.style.opacity = "1";
        } else {
          item.style.display = "none";
          item.style.opacity = "0";
        }
      });

      accordionCards.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        if (category === "all" || category === "integral" || cardCat === category) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // 4. Smooth Scroll Links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
});
