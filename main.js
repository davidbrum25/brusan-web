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
    "tab.all": "todos",
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
    "work.section.product": "Product Showcase",
    "work.section.branding": "Branding",
    "work.section.outdoor": "Outdoor",
    "work.qjmotor.tag": "CGI · Cartelería",
    "work.qjmotor.title": "QJ Motor",
    "work.qjmotor.desc": "Visualización de producto y vía pública para Fort 350.",
    "work.totem.tag": "Cartelería · Hardware",
    "work.totem.title": "Totem Publicitario",
    "work.totem.desc": "Diseño, armado y programación de tótems con pantalla para publicidad en locación.",
    "work.boxbike.tag": "3D Model",
    "work.boxbike.title": "Box Bike",
    "work.boxbike.desc": "Modelado y showcase 3D.",
    "work.bgclip.tag": "CGI · Clip",
    "work.bgclip.title": "2Veinte",
    "work.bgclip.desc": "Fondo 3D animado para clip publicitario.",
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
    "contact.form.name": "Nombre",
    "contact.form.email": "Email",
    "contact.form.phone": "Teléfono <em>(opcional)</em>",
    "contact.form.message": "Mensaje",
    "contact.form.name_ph": "Tu nombre",
    "contact.form.email_ph": "diana.k@example.org",
    "contact.form.phone_ph": "+54 9 …",
    "contact.form.message_ph": "Contanos qué necesitás",
    "contact.form.submit": "Enviar consulta",
    "contact.form.sending": "Enviando…",
    "contact.form.success": "Listo. Te respondemos a la brevedad.",
    "contact.form.error": "No se pudo enviar. Escribinos por mail o WhatsApp.",
    "contact.form.invalid": "Completá nombre, email y un mensaje de al menos 10 caracteres.",
    "contact.form.offline": "En local no se envía mail. Eso corre en Cloudflare, en brusan.ar.",
    "contact.form.spam": "No pudimos verificar el envío. Probá de nuevo.",
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
    "work.section.product": "Product Showcase",
    "work.section.branding": "Branding",
    "work.section.outdoor": "Outdoor",
    "work.qjmotor.tag": "CGI · Urban media",
    "work.qjmotor.title": "QJ Motor",
    "work.qjmotor.desc": "Product visualization and outdoor media for Fort 350.",
    "work.totem.tag": "Signage · Hardware",
    "work.totem.title": "Advertising Totem",
    "work.totem.desc": "Design, assembly and programming of screen totems for on-site advertising.",
    "work.boxbike.tag": "3D Model",
    "work.boxbike.title": "Box Bike",
    "work.boxbike.desc": "3D modeling and showcase.",
    "work.bgclip.tag": "CGI · Clip",
    "work.bgclip.title": "2Veinte",
    "work.bgclip.desc": "Animated 3D background for an advertising clip.",
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
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.phone": "Phone <em>(optional)</em>",
    "contact.form.message": "Message",
    "contact.form.name_ph": "Your name",
    "contact.form.email_ph": "you@studio.com",
    "contact.form.phone_ph": "+54 9 …",
    "contact.form.message_ph": "Tell us what you need",
    "contact.form.submit": "Send inquiry",
    "contact.form.sending": "Sending…",
    "contact.form.success": "Done. We'll get back to you shortly.",
    "contact.form.error": "Couldn't send. Reach us by email or WhatsApp.",
    "contact.form.invalid": "Please fill in name, email and a message of at least 10 characters.",
    "contact.form.offline": "Mail isn't sent on this local preview. It goes out on Cloudflare, at brusan.ar.",
    "contact.form.spam": "We couldn't verify this send. Please try again.",
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

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getDictionary(lang) {
  const base = translations[lang] || translations.es;
  const extra = (window.workCaseTranslations && window.workCaseTranslations[lang]) || {};
  return Object.assign({}, base, extra);
}

function applyLanguage(lang, smooth = false) {
  currentLanguage = lang;
  localStorage.setItem("brusan_lang", lang);
  document.documentElement.lang = lang;

  const dict = getDictionary(lang);

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

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.getAttribute("data-i18n-placeholder");
    if (dict[key]) el.setAttribute("placeholder", dict[key]);
  });

  document.querySelectorAll("[data-i18n-list]").forEach((el) => {
    const key = el.getAttribute("data-i18n-list");
    const items = dict[key];
    if (!Array.isArray(items)) return;
    const html = items.map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    if (smooth) {
      el.style.opacity = "0.2";
      setTimeout(() => {
        el.innerHTML = html;
        el.style.opacity = "1";
      }, 120);
    } else {
      el.innerHTML = html;
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
  initContactForm();
});

function initContactForm() {
  const form = document.getElementById("contact-form");
  if (!form) return;

  const status = form.querySelector(".contact-form-status");
  const submit = form.querySelector('button[type="submit"]');
  const submitLabel = submit && submit.querySelector("[data-i18n='contact.form.submit']");
  const turnstileHost = form.querySelector(".contact-turnstile");
  const startedAt = Date.now();
  let turnstileWidgetId = null;

  function dict() {
    return getDictionary(currentLanguage);
  }

  function setStatus(type, key) {
    if (!status) return;
    status.hidden = !key;
    status.classList.remove("is-success", "is-error");
    if (!key) {
      status.textContent = "";
      return;
    }
    status.classList.add(type === "success" ? "is-success" : "is-error");
    status.textContent = dict()[key] || key;
  }

  function errorKey(res, body) {
    const code = (body && body.error) || "";
    if (!res || res.status === 404 || res.status === 405 || res.status === 501) {
      return "contact.form.offline";
    }
    if (res.status === 503 || code === "email_not_configured") return "contact.form.offline";
    if (code === "invalid_name" || code === "invalid_email" || code === "invalid_message") {
      return "contact.form.invalid";
    }
    if (code === "captcha" || code === "too_fast" || code === "forbidden") return "contact.form.spam";
    return "contact.form.error";
  }

  function setStatusRaw(type, text) {
    if (!status) return;
    status.hidden = !text;
    status.classList.remove("is-success", "is-error");
    if (!text) {
      status.textContent = "";
      return;
    }
    status.classList.add(type === "success" ? "is-success" : "is-error");
    status.textContent = text;
  }

  function resetTurnstile() {
    if (turnstileWidgetId != null && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId);
    }
  }

  async function setupTurnstile() {
    if (!turnstileHost) return;
    try {
      const res = await fetch("/api/contact", { headers: { Accept: "application/json" } });
      if (!res.ok) return;
      const cfg = await res.json().catch(() => ({}));
      if (!cfg.siteKey) return;
      await loadTurnstile();
      if (!window.turnstile) return;
      turnstileWidgetId = window.turnstile.render(turnstileHost, {
        sitekey: cfg.siteKey,
        theme: "dark",
        size: "flexible",
        appearance: "interaction-only",
        action: "contact"
      });
    } catch (err) {}
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (String(data.get("website") || "").trim() || String(data.get("company") || "").trim()) {
      form.reset();
      setStatus("success", "contact.form.success");
      return;
    }

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      message: String(data.get("message") || "").trim(),
      started: startedAt,
      turnstileToken: String(data.get("cf-turnstile-response") || "")
    };

    if (
      payload.name.length < 2 ||
      !payload.email ||
      payload.message.length < 10 ||
      !form.checkValidity()
    ) {
      form.reportValidity();
      setStatus("error", "contact.form.invalid");
      return;
    }

    const originalLabel = submitLabel ? submitLabel.innerHTML : "";
    if (submit) submit.disabled = true;
    if (submitLabel) submitLabel.textContent = dict()["contact.form.sending"] || "Enviando…";
    setStatus("", "");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(payload)
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok || !body.ok) throw Object.assign(new Error(body.error || "send_failed"), { res, body });
      form.reset();
      resetTurnstile();
      setStatus("success", "contact.form.success");
    } catch (err) {
      const key = errorKey(err && err.res, err && err.body);
      const detail = err && err.body && err.body.detail;
      if (key === "contact.form.error" && detail) {
        setStatusRaw("error", (dict()[key] || "") + " (" + detail + ")");
      } else {
        setStatus("error", key);
      }
      resetTurnstile();
    } finally {
      if (submit) submit.disabled = false;
      if (submitLabel) submitLabel.innerHTML = originalLabel || dict()["contact.form.submit"];
      if (window.lucide) window.lucide.createIcons();
    }
  });

  setupTurnstile();
}

function loadTurnstile() {
  if (window.turnstile) return Promise.resolve();
  if (window.__brusanTurnstileLoader) return window.__brusanTurnstileLoader;
  window.__brusanTurnstileLoader = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
  return window.__brusanTurnstileLoader;
}

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
