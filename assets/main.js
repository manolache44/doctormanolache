function getConfig() {
  return window.SITE_CONFIG || {};
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (!el) return;
  el.textContent = text;
}

function setHref(selector, href) {
  document.querySelectorAll(selector).forEach((el) => {
    el.setAttribute("href", href);
  });
}

function setActiveNav() {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll('[data-nav]').forEach((a) => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    const isActive = href === path || (path === "" && href === "index.html");
    if (isActive) a.classList.add("active");
  });
}

function buildWhatsAppLink(e164) {
  const digits = (e164 || "").replace(/[^\d]/g, "");
  // WhatsApp expects digits only, with country code (no +)
  return "https://wa.me/" + digits;
}

function init() {
  const cfg = getConfig();

  setText("doctorName", cfg.DOCTOR_NAME || "Cabinet stomatologic");
  setText("doctorName2", cfg.DOCTOR_NAME || "Cabinet stomatologic");
  setText("doctorName3", cfg.DOCTOR_NAME || "Cabinet stomatologic");
  setText("tagline", cfg.TAGLINE || "");
  setText("addressLine", cfg.ADDRESS_LINE || "");
  setText("addressLine2", cfg.ADDRESS_LINE || "");
  setText("addressLine3", cfg.ADDRESS_LINE || "");
  setText("phoneDisplay", cfg.PHONE_DISPLAY || "");
  setText("phoneDisplay2", cfg.PHONE_DISPLAY || "");
  setText("phoneDisplay3", cfg.PHONE_DISPLAY || "");

  if (cfg.PHONE_E164) {
    setHref('[data-phone-link]', "tel:" + cfg.PHONE_E164);
  }
  if (cfg.WHATSAPP_E164) {
    setHref('[data-wa-link]', buildWhatsAppLink(cfg.WHATSAPP_E164));
  }
  if (cfg.EMAIL_TO) {
    setHref('[data-email-link]', "mailto:" + cfg.EMAIL_TO);
  }
  if (cfg.MAP_QUERY) {
    setHref('[data-maps-link]', "https://www.google.com/maps?q=" + cfg.MAP_QUERY);
    const iframe = document.getElementById("mapFrame");
    if (iframe) {
      iframe.setAttribute(
        "src",
        "https://www.google.com/maps?q=" + cfg.MAP_QUERY + "&output=embed"
      );
    }
  }

  setActiveNav();

  // Open Graph: completează og:url și og:image (pentru partajare pe Facebook/WhatsApp)
  const base = (cfg.SITE_URL || location.origin).replace(/\/$/, "");
  const path = location.pathname || "/index.html";
  document.querySelectorAll('meta[property="og:url"]').forEach((m) => m.setAttribute("content", base + path));
  document.querySelectorAll('meta[property="og:image"]').forEach((m) => m.setAttribute("content", base + "/assets/logo.png"));

  // Banner cookies
  const cookieBanner = document.getElementById("cookieBanner");
  if (cookieBanner) {
    const hideBanner = () => {
      cookieBanner.style.display = "none";
    };
    const showBanner = () => {
      cookieBanner.style.display = "block";
    };

    const btn = cookieBanner.querySelector('[data-cookie-accept]');

    try {
      if (localStorage.getItem("cookie-consent") === "1") {
        hideBanner();
      } else {
        showBanner();
        if (btn) {
          btn.addEventListener("click", () => {
            try {
              localStorage.setItem("cookie-consent", "1");
            } catch (e) {
              // dacă localStorage nu e disponibil, doar ascundem bannerul
            }
            hideBanner();
          });
        }
      }
    } catch (e) {
      // dacă localStorage nu e disponibil (mod privat, blocat etc.),
      // lăsăm bannerul să poată fi închis în sesiunea curentă
      showBanner();
      if (btn) {
        btn.addEventListener("click", hideBanner);
      }
    }
  }

  const form = document.getElementById("appointmentForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get("name") || "").trim();
      const phone = String(fd.get("phone") || "").trim();
      const when = String(fd.get("when") || "").trim();
      const service = String(fd.get("service") || "").trim();
      const message = String(fd.get("message") || "").trim();

      const subject = encodeURIComponent("Programare – " + (cfg.DOCTOR_NAME || "Cabinet"));
      const body = encodeURIComponent(
        [
          "Nume: " + name,
          "Telefon: " + phone,
          "Când: " + when,
          "Serviciu: " + service,
          "",
          "Mesaj:",
          message,
          "",
          "Trimis de pe site.",
        ].join("\n")
      );

      const fallbackMail = cfg.EMAIL_TO
        ? "mailto:" + cfg.EMAIL_TO + "?subject=" + subject + "&body=" + body
        : "mailto:?subject=" + subject + "&body=" + body;

      window.location.href = fallbackMail;
    });
  }
}

document.addEventListener("DOMContentLoaded", init);

