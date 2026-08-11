/**
 * Sarvahit Seva Trust Web Portal
 * Bilingual Controller - Default Language: Hindi (हिंदी)
 * Registration No.: UP/2026/1144009
 */
document.addEventListener("DOMContentLoaded", () => {
  // Default Language: Always Hindi ('hi') unless user explicitly changed it
  let currentLang = localStorage.getItem("site_lang") || "hi";

  // Function to apply Language across the entire portal
  const applyLanguage = (lang) => {
    currentLang = lang;
    localStorage.setItem("site_lang", lang);

    if (lang === "en") {
      document.documentElement.setAttribute("lang", "en");
      document.body.classList.add("lang-en");
    } else {
      document.documentElement.setAttribute("lang", "hi");
      document.body.classList.remove("lang-en");
    }

    // Update all elements containing data-hi and data-en attributes
    document.querySelectorAll("[data-hi]").forEach((el) => {
      const hiText = el.getAttribute("data-hi");
      const enText = el.getAttribute("data-en");
      const targetText = lang === "en" ? enText : hiText;

      if (targetText !== null && targetText !== undefined) {
        if (el.tagName === "INPUT" || el.tagName === "TEXTAREA") {
          el.placeholder = targetText;
        } else {
          // If element has child elements like <i> or <svg> or <span> icons, preserve them!
          const iconChildren = Array.from(el.childNodes).filter(node => 
            node.nodeType === Node.ELEMENT_NODE && (
              node.tagName === "I" || 
              node.tagName === "SVG" || 
              node.classList.contains("bi")
            )
          );

          if (iconChildren.length > 0) {
            // Find or create a text span child
            let textSpan = el.querySelector(".js-lang-text");
            if (!textSpan) {
              textSpan = document.createElement("span");
              textSpan.className = "js-lang-text";
              
              // Get existing text node content
              let textContentNode = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
              if (textContentNode) {
                el.replaceChild(textSpan, textContentNode);
              } else {
                el.appendChild(textSpan);
              }
            }
            textSpan.textContent = targetText;
          } else {
            el.textContent = targetText;
          }
        }
      }
    });

    // Update Language Toggle Button Label
    const langBtnText = document.getElementById("lang-btn-text");
    if (langBtnText) {
      // Show destination language: "English" when in Hindi mode, "हिंदी" when in English mode
      langBtnText.textContent = lang === "hi" ? "English" : "हिंदी";
    }
  };

  // Language Toggle Button Click Event
  const langToggleBtn = document.getElementById("lang-toggle");
  if (langToggleBtn) {
    langToggleBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const nextLang = currentLang === "hi" ? "en" : "hi";
      applyLanguage(nextLang);
    });
  }

  // Force Apply Language immediately
  applyLanguage(currentLang);

  // Sticky Navbar & Scroll Observer for Back to Top Button
  const backToTopBtn = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 80) {
      document.body.classList.add("scrolled-nav");
    } else {
      document.body.classList.remove("scrolled-nav");
    }

    if (backToTopBtn) {
      if (window.scrollY > 350) {
        backToTopBtn.classList.add("show");
      } else {
        backToTopBtn.classList.remove("show");
      }
    }
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Scroll Reveal Intersection Observer (Fade-Up)
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.08
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-up").forEach((el) => {
    fadeObserver.observe(el);
  });

  // Contact Form Submission Handler
  const contactForm = document.getElementById("contact-form");
  const formSuccessAlert = document.getElementById("form-success-alert");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (formSuccessAlert) {
        formSuccessAlert.classList.remove("d-none");
        contactForm.reset();
        setTimeout(() => {
          formSuccessAlert.classList.add("d-none");
        }, 6000);
      } else {
        alert(currentLang === "hi" ? "धन्यवाद! आपका संदेश प्राप्त हुआ।" : "Thank you! Your message has been received.");
        contactForm.reset();
      }
    });
  }

  // Dark Mode Theme Controller
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  if (darkModeToggle) {
    const applyTheme = (theme) => {
      document.documentElement.setAttribute("data-bs-theme", theme);
      localStorage.setItem("theme", theme);
    };

    darkModeToggle.addEventListener("click", () => {
      const currentTheme = document.documentElement.getAttribute("data-bs-theme") || "light";
      applyTheme(currentTheme === "dark" ? "light" : "dark");
    });

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      applyTheme(savedTheme);
    }
  }

  // Gallery Lightbox Controller
  const galleryItems = document.querySelectorAll(".gallery-img-container");
  const lightboxModal = document.getElementById("lightboxModal");
  const lightboxImg = document.getElementById("lightboxImg");
  const lightboxCaption = document.getElementById("lightboxCaption");

  if (galleryItems && lightboxImg && lightboxCaption && lightboxModal) {
    const modalInstance = new bootstrap.Modal(lightboxModal);
    galleryItems.forEach((item) => {
      item.addEventListener("click", () => {
        const imgSrc = item.getAttribute("data-img");
        const titleHi = item.getAttribute("data-caption-hi");
        const titleEn = item.getAttribute("data-caption-en");
        lightboxImg.src = imgSrc;
        lightboxCaption.innerText = currentLang === "en" ? titleEn : titleHi;
        modalInstance.show();
      });
    });
  }
});
