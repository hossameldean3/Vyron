// Configuration: Adjust to your GitHub username and repo
const GITHUB_USER = "hossameldean3"; // Update if different
const REPO_NAME = "Vyron"; // Update if different
const GITHUB_BASE = `https://\( {GITHUB_USER}.github.io/ \){REPO_NAME}`;

// Asset paths within the repo
const LOGO_JSON = `${GITHUB_BASE}/assets/vyron_logo.json`;
const HERO_JSON = `${GITHUB_BASE}/assets/vyron_cinematic_lottie.json`;

// DOM ready event
document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("hero-lottie");
  const vyronLogo = document.getElementById("vyron-logo");
  const demoForm = document.getElementById("demoForm");
  const generateBtn = document.getElementById("generateBtn");
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const closeModal = document.getElementById("closeModal");
  const enBtn = document.getElementById("enBtn");
  const arBtn = document.getElementById("arBtn");

  // Function to load Lottie animation with fallback and error handling
  async function loadLottie(path, container, options = {}) {
    try {
      const response = await fetch(path, { cache: "no-cache" });
      if (!response.ok) throw new Error(`Failed to fetch \( {path}: \){response.status}`);
      const data = await response.json();
      lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: options.loop ?? true,
        autoplay: options.autoplay ?? true,
        animationData: data,
        ...options,
      });
      return true;
    } catch (error) {
      console.warn(`Lottie load failed for ${path}:`, error);
      return false;
    }
  }

  // Load logo with fallback
  loadLottie(LOGO_JSON, vyronLogo, { loop: true, autoplay: true }).then((success) => {
    if (!success) {
      vyronLogo.innerHTML = `
        <div style="width: 3rem; height: 3rem; border-radius: 0.5rem; background: linear-gradient(90deg, #00aaff, #8B3DFF); display: flex; align-items: center; justify-content: center; font-weight: 700; color: #001;">
          V
        </div>`;
    }
  });

  // Load hero animation with fallback
  loadLottie(HERO_JSON, hero, { loop: false, autoplay: true }).then((success) => {
    if (!success) {
      hero.innerHTML = `
        <div style="width: 20rem; height: 20rem; display: flex; align-items: center; justify-content: center; border-radius: 1.125rem; background: #06111a; color: #00aaff; font-size: 1.25rem;">
          VYRON
        </div>`;
    }
  });

  // Language switcher logic (basic toggle, extend with actual translation if needed)
  function switchLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    enBtn.classList.toggle("active", lang === "en");
    arBtn.classList.toggle("active", lang === "ar");
    enBtn.setAttribute("aria-pressed", lang === "en");
    arBtn.setAttribute("aria-pressed", lang === "ar");
    // TODO: Load translations or adjust content dynamically if multi-language support is implemented
  }

  enBtn.addEventListener("click", () => switchLanguage("en"));
  arBtn.addEventListener("click", () => switchLanguage("ar"));

  // Demo form handling (MVP with validation and modal feedback)
  demoForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const prompt = document.getElementById("prompt").value.trim();
    const email = document.getElementById("email").value.trim();

    if (!prompt || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showModal("Please enter a valid prompt and email.");
      return;
    }

    generateBtn.disabled = true;
    generateBtn.textContent = "Processing...";

    try {
      // Replace with real backend API (e.g., Formspree, Netlify Functions, or your server)
      const response = await fetch("https://formspree.io/f/your-form-id", { // Replace with actual endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, email }),
      });

      if (!response.ok) throw new Error("Submission failed");

      showModal("Demo request submitted successfully! We'll process it manually and email you the result.");
      demoForm.reset();
    } catch (error) {
      console.error("Form submission error:", error);
      showModal("Error submitting request. Please try again later.");
    } finally {
      generateBtn.disabled = false;
      generateBtn.textContent = "Generate";
    }
  });

  // Modal functions
  function showModal(message) {
    modalMessage.textContent = message;
    modal.classList.remove("hidden");
    modal.focus();
  }

  closeModal.addEventListener("click", () => modal.classList.add("hidden"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.add("hidden");
  });

  // Smooth scroll to demo
  document.getElementById("openDemo").addEventListener("click", () => {
    document.getElementById("demo").scrollIntoView({ behavior: "smooth" });
  });

  // Join waitlist (example, extend as needed)
  document.getElementById("joinWaitlist").addEventListener("click", () => {
    showModal("Joined waitlist! We'll notify you when ready.");
  });
});
