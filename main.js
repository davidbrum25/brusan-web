/* ==========================================================================
   BRUSAN · Interactive UI Logic
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Portfolio Category Tabs Switching
  const tabBtns = document.querySelectorAll(".tab-btn");
  const showcaseItems = document.querySelectorAll(".showcase-item");
  const accordionCards = document.querySelectorAll(".accordion-card");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all tabs
      tabBtns.forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");

      // Filter animation / state for showcase items
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

      // Filter animation / state for accordion grid items
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

  // 3. Smooth Scroll Links (e.g. Header button "nos queres contactar?" -> #quienes-somos)
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

  // 4. Subtle Interactivity for Typographic Manifesto Matrix ("Hacer pie con lo propio")
  const manifestoWords = document.querySelectorAll(".manifesto-word");
  let currentWordIdx = 0;

  // Pulse animation through matrix words
  setInterval(() => {
    manifestoWords.forEach((word) => {
      // Keep static highlight classes untouched if defined in HTML, otherwise add subtle glow cycle
      if (word.classList.contains("highlight-blue") || word.classList.contains("highlight-gold")) {
        return;
      }
    });
  }, 2000);
});
