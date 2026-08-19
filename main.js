/* ==========================================================================
   BRUSAN · Interactive UI & Translation Engine (i18n)
   - Zero-reload instant language switching (ES <-> EN)
   - Category filtering for portfolio showcases & accordion grid
   - Smooth anchor scrolling & Lucide icon initialization
   - Magnetic cursor on header + Quienes Somos buttons
   ========================================================================== */

const translations = {
  es: {
    "lang.toggle": "EN",
    "hero.badge": "Contenido, desarrollo y diseño web/app",
    "hero.tagline": "Conectamos tu <strong>producto</strong> con su audiencia",
    "hero.btn.portfolio": "mira nuestro portfolio",
    "hero.btn.contact": "nos queres contactar?",
    "portfolio.title": "nuestro <strong>portfolio</strong>",
    "tab.all": "todo",
    "tab.reels": "reels",
    "tab.cgi": "cgi",
    "tab.branding": "branding",
    "tab.foto": "foto",
    "work.back": "volver al portfolio",
    "work.prev": "anterior",
    "work.next": "siguiente",
    "work.pulpo.tag": "Reel · 3D",
    "work.pulpo.title": "El Pulpo Negro",
    "work.pulpo.desc": "Reel y piezas sociales del personaje 3D.",
    "work.alfajor.tag": "CGI · Producto",
    "work.alfajor.title": "Alfajor Argentino",
    "work.alfajor.desc": "Visualización de producto y breakdown CGI.",
    "work.cantilo.tag": "Archviz · Web",
    "work.cantilo.title": "radiocantilo.com",
    "work.cantilo.desc": "Archviz, identidad y reel de marca.",
    "work.nonpa.tag": "Reels · Tour",
    "work.nonpa.title": "Nonpalidece",
    "work.nonpa.desc": "Reels y piezas para Soy Latino Tour.",
    "work.empanada.tag": "CGI · Producto",
    "work.empanada.title": "Empanada Criolla",
    "work.empanada.desc": "Visualización de producto y breakdown CGI.",
    "work.veganis.tag": "CGI · Producto",
    "work.veganis.title": "Veganis",
    "work.veganis.desc": "Spot y stills de producto para Veganis.",
    "work.qjmotor.tag": "CGI · Cartelería",
    "work.qjmotor.title": "QJ Motor",
    "work.qjmotor.desc": "Visualización de producto y vía pública para Fort 350.",
    "work.boxbike.tag": "3D Model",
    "work.boxbike.title": "Box Bike",
    "work.boxbike.desc": "Modelado y showcase 3D.",
    "work.estelares.tag": "Music clip",
    "work.estelares.title": "Estelares — Usted",
    "work.estelares.desc": "Stills del videoclip Usted.",
    "work.sybila.tag": "Branding",
    "work.sybila.title": "sybi.la",
    "work.sybila.desc": "Identidad y exploración de marca.",
    "work.sybpro.tag": "Branding · Reel",
    "work.sybpro.title": "sybpro.tv",
    "work.sybpro.desc": "Identidad y reel de marca.",
    "work.vai.tag": "Reels",
    "work.vai.title": "Viaje a lo Inesperado",
    "work.vai.desc": "Clips y motion de marca.",
    "work.mellis.tag": "Branding",
    "work.mellis.title": "Viajes los Mellis",
    "work.mellis.desc": "Identidad — Seguimos la música.",
    "work.foto.tag": "Fotografía",
    "work.foto.title": "La Plata",
    "work.foto.desc": "Serie fotográfica urbana.",
    "services.title": "qué <strong>hacemos</strong>",
    "services.lead": "Cuatro frentes claros para dar presencia visual a tu producto y tu negocio.",
    "services.1.title": "Contenido en redes",
    "services.1.desc": "Reels, piezas estáticas y secuencias pensadas para mostrar tu producto con claridad y peso visual.",
    "services.2.title": "CGI & Visualización de producto",
    "services.2.desc": "Renders técnicos y fotorealistas para maquinaria, productos industriales y piezas que necesitan verse en detalle.",
    "services.3.title": "Cartelería urbana",
    "services.3.desc": "Diseño para vía pública, totems, pantallas y espacios físicos que acompañan la presencia de tu marca en la calle.",
    "services.4.title": "Web & Web Apps",
    "services.4.desc": "Landings y sitios modernos, rápidos y con dirección de arte clara para convertir visitas en consultas.",
    "about.title": "quienes <strong>somos</strong>",
    "about.location": "Gualeguaychú, Entre Ríos · Estudio de desarrollo visual para empresas productivas de la zona",
    "team.role.david": "Founder & Visual / Tech Lead",
    "team.role.daniel": "Co-Founder & Creative Director / Sales",
    "slogan.text": "ACOMPAÑAMOS EL CAMINO DE TU NEGOCIO CON CONTENIDO QUE IMPONE RESPETO",
    "manifesto.w1": "Hacer",
    "manifesto.w2": "pie",
    "manifesto.w3": "con lo",
    "manifesto.w4": "propio",
    "manifesto.subline": "Le damos presencia visual al trabajo que mueve la zona todos los días.",
    "contact.title": "hablemos de tu <strong>proyecto</strong>",
    "contact.lead": "Contanos qué necesitás. Respondemos rápido y sin vueltas.",
    "contact.whatsapp": "WhatsApp",
    "contact.location": "Gualeguaychú · Entre Ríos · Argentina",
    "footer.watermark.line1": "DESARROLLO",
    "footer.watermark.line2": "VISUAL",
    "footer.slogan": "- desarrollo visual",
    "footer.location": "Gualeguaychú",
    "footer.nav.home": "Inicio",
    "footer.nav.portfolio": "Portfolio",
    "footer.nav.services": "Qué hacemos",
    "footer.nav.about": "Quienes Somos",
    "footer.nav.contact": "Contacto",
    "doc.title": "BRUSAN · Desarrollo Visual | Gualeguaychú"
  },
  en: {
    "lang.toggle": "ES",
    "hero.badge": "Social Content, Development, Web/app design",
    "hero.tagline": "We connect your <strong>product</strong> with its audience",
    "hero.btn.portfolio": "explore our portfolio",
    "hero.btn.contact": "want to contact us?",
    "portfolio.title": "our <strong>portfolio</strong>",
    "tab.all": "all",
    "tab.reels": "reels",
    "tab.cgi": "cgi",
    "tab.branding": "branding",
    "tab.foto": "photo",
    "work.back": "back to portfolio",
    "work.prev": "previous",
    "work.next": "next",
    "work.pulpo.tag": "Reel · 3D",
    "work.pulpo.title": "El Pulpo Negro",
    "work.pulpo.desc": "Reel and social pieces for the 3D character.",
    "work.alfajor.tag": "CGI · Product",
    "work.alfajor.title": "Alfajor Argentino",
    "work.alfajor.desc": "Product visualization and CGI breakdown.",
    "work.cantilo.tag": "Archviz · Web",
    "work.cantilo.title": "radiocantilo.com",
    "work.cantilo.desc": "Archviz, identity and brand reel.",
    "work.nonpa.tag": "Reels · Tour",
    "work.nonpa.title": "Nonpalidece",
    "work.nonpa.desc": "Reels and pieces for Soy Latino Tour.",
    "work.empanada.tag": "CGI · Product",
    "work.empanada.title": "Empanada Criolla",
    "work.empanada.desc": "Product visualization and CGI breakdown.",
    "work.veganis.tag": "CGI · Product",
    "work.veganis.title": "Veganis",
    "work.veganis.desc": "Product spot and stills for Veganis.",
    "work.qjmotor.tag": "CGI · Urban media",
    "work.qjmotor.title": "QJ Motor",
    "work.qjmotor.desc": "Product visualization and outdoor media for Fort 350.",
    "work.boxbike.tag": "3D Model",
    "work.boxbike.title": "Box Bike",
    "work.boxbike.desc": "3D modeling and showcase.",
    "work.estelares.tag": "Music clip",
    "work.estelares.title": "Estelares — Usted",
    "work.estelares.desc": "Stills from the Usted music video.",
    "work.sybila.tag": "Branding",
    "work.sybila.title": "sybi.la",
    "work.sybila.desc": "Identity and brand exploration.",
    "work.sybpro.tag": "Branding · Reel",
    "work.sybpro.title": "sybpro.tv",
    "work.sybpro.desc": "Identity and brand reel.",
    "work.vai.tag": "Reels",
    "work.vai.title": "Viaje a lo Inesperado",
    "work.vai.desc": "Brand clips and motion.",
    "work.mellis.tag": "Branding",
    "work.mellis.title": "Viajes los Mellis",
    "work.mellis.desc": "Identity — We follow the music.",
    "work.foto.tag": "Photography",
    "work.foto.title": "La Plata",
    "work.foto.desc": "Urban photography series.",
    "services.title": "what we <strong>do</strong>",
    "services.lead": "Four clear fronts to give visual presence to your product and business.",
    "services.1.title": "Social content",
    "services.1.desc": "Reels, static pieces and sequences designed to show your product with clarity and visual weight.",
    "services.2.title": "CGI & Product visualization",
    "services.2.desc": "Technical and photorealistic renders for machinery, industrial products and pieces that need to be seen in detail.",
    "services.3.title": "Urban signage",
    "services.3.desc": "Design for public spaces, totems, screens and physical environments that support your brand presence on the street.",
    "services.4.title": "Web & Web Apps",
    "services.4.desc": "Modern, fast landings and sites with clear art direction built to turn visits into inquiries.",
    "about.title": "about <strong>us</strong>",
    "about.location": "Gualeguaychú, Entre Ríos · Visual development studio for productive businesses in the region",
    "team.role.david": "Founder & Visual / Tech Lead",
    "team.role.daniel": "Co-Founder & Creative Director / Sales",
    "slogan.text": "WE EMPOWER YOUR BUSINESS JOURNEY WITH CONTENT THAT COMMANDS RESPECT",
    "manifesto.w1": "Stand",
    "manifesto.w2": "firm",
    "manifesto.w3": "on your",
    "manifesto.w4": "own",
    "manifesto.subline": "We give visual presence to the work that powers the region every single day.",
    "contact.title": "let's talk about your <strong>project</strong>",
    "contact.lead": "Tell us what you need. We reply fast and straight to the point.",
    "contact.whatsapp": "WhatsApp",
    "contact.location": "Gualeguaychú · Entre Ríos · Argentina",
    "footer.watermark.line1": "VISUAL",
    "footer.watermark.line2": "DEVELOPMENT",
    "footer.slogan": "- visual development",
    "footer.location": "Gualeguaychú",
    "footer.nav.home": "Home",
    "footer.nav.portfolio": "Portfolio",
    "footer.nav.services": "What we do",
    "footer.nav.about": "About Us",
    "footer.nav.contact": "Contact",
    "doc.title": "BRUSAN · Visual Development | Gualeguaychú"
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

  const workKey = document.body && document.body.dataset.workKey;
  if (workKey && dict["work." + workKey + ".title"]) {
    document.title = dict["work." + workKey + ".title"] + " · BRUSAN";
  } else if (dict["doc.title"]) {
    document.title = dict["doc.title"];
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }

  const langToggleBtn = document.getElementById("lang-toggle-btn");
  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", () => {
      const nextLang = currentLanguage === "es" ? "en" : "es";
      applyLanguage(nextLang, true);
    });
  }

  if (currentLanguage !== "es") {
    applyLanguage(currentLanguage, false);
  }

  const tabBtns = document.querySelectorAll(".tab-btn");
  const portfolioItems = document.querySelectorAll(".showcase-item, .accordion-card");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      portfolioItems.forEach((item) => {
        const itemCat = item.getAttribute("data-category");
        const show = category === "all" || itemCat === category;
        item.classList.toggle("is-hidden", !show);
        if (!show) {
          item.querySelectorAll("video").forEach((video) => {
            video.pause();
            video.currentTime = 0;
          });
        }
      });
    });
  });

  document.querySelectorAll(".showcase-item video, .accordion-card video").forEach((video) => {
    const parent = video.closest(".showcase-item, .accordion-card");
    if (!parent) return;
    parent.addEventListener("mouseenter", () => {
      video.play().catch(() => {});
    });
    parent.addEventListener("mouseleave", () => {
      video.pause();
      video.currentTime = 0;
    });
  });

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

  initMagneticCursor();
  initWorkLightbox();
});

function initWorkLightbox() {
  const box = document.querySelector(".work-lightbox");
  if (!box) return;

  const img = box.querySelector("img");
  const closeBtn = box.querySelector(".work-lightbox-close");
  const thumbs = Array.from(document.querySelectorAll(".work-gallery img"));
  if (!img || !closeBtn || !thumbs.length) return;

  let index = 0;

  function ensureControl(selector, className, label, icon) {
    let el = box.querySelector(selector);
    if (!el) {
      el = document.createElement("button");
      el.type = "button";
      el.className = className;
      el.setAttribute("aria-label", label);
      el.innerHTML = '<i data-lucide="' + icon + '"></i>';
      box.appendChild(el);
    }
    return el;
  }

  const prevBtn = ensureControl(".work-lightbox-prev", "work-lightbox-nav work-lightbox-prev", "Imagen anterior / Previous image", "chevron-left");
  const nextBtn = ensureControl(".work-lightbox-next", "work-lightbox-nav work-lightbox-next", "Imagen siguiente / Next image", "chevron-right");

  let countEl = box.querySelector(".work-lightbox-count");
  if (!countEl) {
    countEl = document.createElement("p");
    countEl.className = "work-lightbox-count";
    countEl.setAttribute("aria-live", "polite");
    box.appendChild(countEl);
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }

  function show(i) {
    index = (i + thumbs.length) % thumbs.length;
    const thumb = thumbs[index];
    img.src = thumb.currentSrc || thumb.src;
    img.alt = thumb.alt || "";
    countEl.textContent = (index + 1) + " / " + thumbs.length;
    const multi = thumbs.length > 1;
    prevBtn.hidden = !multi;
    nextBtn.hidden = !multi;
    countEl.hidden = !multi;
    box.hidden = false;
  }

  function close() {
    box.hidden = true;
    img.removeAttribute("src");
  }

  thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => show(i));
  });

  prevBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    show(index - 1);
  });
  nextBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    show(index + 1);
  });
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    close();
  });
  box.addEventListener("click", (e) => {
    if (e.target === box) close();
  });
  document.addEventListener("keydown", (e) => {
    if (box.hidden) return;
    if (e.key === "Escape") {
      close();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      show(index - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      show(index + 1);
    }
  });
}

function initMagneticCursor() {
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!finePointer) return;

  const nodes = document.querySelectorAll("[data-magnetic]");
  if (!nodes.length) return;

  const STIFFNESS = 80;
  const DAMPING = 10;

  const items = Array.from(nodes, (el) => ({
    el,
    distance: Number(el.dataset.magneticDistance) || 100,
    strength: Number(el.dataset.magneticStrength) || 0.45,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    tx: 0,
    ty: 0,
    hovering: false
  }));

  let pointerX = 0;
  let pointerY = 0;
  let running = false;
  let lastT = 0;

  function updateTargets() {
    for (const item of items) {
      const rect = item.el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2 - item.x;
      const cy = rect.top + rect.height / 2 - item.y;
      const dx = pointerX - cx;
      const dy = pointerY - cy;
      const dist = Math.hypot(dx, dy);

      if (dist < item.distance) {
        const pull = Math.pow(1 - dist / item.distance, 0.5);
        item.tx = dx * pull * item.strength;
        item.ty = dy * pull * item.strength;
        if (!item.hovering) {
          item.hovering = true;
          item.el.classList.add("is-magnetic-active");
        }
      } else {
        item.tx = 0;
        item.ty = 0;
        if (item.hovering) {
          item.hovering = false;
          item.el.classList.remove("is-magnetic-active");
        }
      }
    }
  }

  function step(t) {
    if (!lastT) lastT = t;
    const dt = Math.min((t - lastT) / 1000, 0.032);
    lastT = t;

    updateTargets();

    let anyActive = false;
    for (const item of items) {
      const ax = -STIFFNESS * (item.x - item.tx) - DAMPING * item.vx;
      const ay = -STIFFNESS * (item.y - item.ty) - DAMPING * item.vy;
      item.vx += ax * dt;
      item.vy += ay * dt;
      item.x += item.vx * dt;
      item.y += item.vy * dt;

      const settled =
        item.tx === 0 &&
        item.ty === 0 &&
        Math.abs(item.x) < 0.08 &&
        Math.abs(item.y) < 0.08 &&
        Math.abs(item.vx) < 0.08 &&
        Math.abs(item.vy) < 0.08;

      if (settled) {
        item.x = 0;
        item.y = 0;
        item.vx = 0;
        item.vy = 0;
        item.el.style.transform = "";
      } else {
        anyActive = true;
        item.el.style.transform =
          "translate3d(" + item.x.toFixed(2) + "px, " + item.y.toFixed(2) + "px, 0)";
      }
    }

    if (anyActive) {
      running = true;
      requestAnimationFrame(step);
    } else {
      running = false;
      lastT = 0;
    }
  }

  function kick() {
    if (!running) {
      running = true;
      lastT = 0;
      requestAnimationFrame(step);
    }
  }

  window.addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      pointerX = e.clientX;
      pointerY = e.clientY;
      kick();
    },
    { passive: true }
  );

  window.addEventListener("blur", () => {
    pointerX = -9999;
    pointerY = -9999;
    kick();
  });
}
