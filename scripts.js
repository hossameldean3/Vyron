/**********************************************************
 * VYRON — Ultra Professional Script (Final)
 * Fixed for GitHub Pages, optimized Lottie loader + MVP logic
 **********************************************************/

// ==========================
// CONFIG (تأكد أن اسم الريبو صحيح هنا)
// ==========================
const REPO_BASE = "/Vyron"; // إذا اسم الريبو مختلف غيّره هنا بنفس الأحرف
const BASE_PATH = REPO_BASE + "/assets/";
const CINEMATIC_FILE = BASE_PATH + "vyron_cinematic_lottie.json";
const LOGO_FILE = BASE_PATH + "vyron_logo.json";

// ==========================
// UTILS
// ==========================
function safeEl(id) {
  return document.getElementById(id) || null;
}

function loadLottieAnimation(container, animationData, opts = {}) {
  const settings = {
    container,
    renderer: "svg",
    loop: opts.loop === undefined ? true : !!opts.loop,
    autoplay: opts.autoplay === undefined ? true : !!opts.autoplay,
    animationData
  };
  try {
    return lottie.loadAnimation(settings);
  } catch (err) {
    console.warn("Lottie load error:", err);
    return null;
  }
}

// ==========================
// LOTTIE INIT
// ==========================
async function initLottie() {
  const heroContainer = safeEl("hero-lottie");
  const logoContainer = safeEl("vyron-logo");

  if (!heroContainer || !logoContainer) {
    console.warn("Lottie containers missing");
    return;
  }

  // تنظيف الحاويات للتأكّد
  heroContainer.innerHTML = "";
  logoContainer.innerHTML = "";

  // محاولة تحميل الملفات بالتوازي
  try {
    const [cinRes, logoRes] = await Promise.all([
      fetch(CINEMATIC_FILE),
      fetch(LOGO_FILE)
    ]);

    if (!cinRes.ok) throw new Error("Cinematic JSON not found");
    if (!logoRes.ok) throw new Error("Logo JSON not found");

    const [cinJSON, logoJSON] = await Promise.all([cinRes.json(), logoRes.json()]);

    // شغّل السينمائي (loop=false عادة لintro، لكن نضبط هنا false ثم يمكن تغييره)
    loadLottieAnimation(heroContainer, cinJSON, { loop: false, autoplay: true });

    // شغّل اللوجو كحلقة مستمرة
    loadLottieAnimation(logoContainer, logoJSON, { loop: true, autoplay: true });

  } catch (err) {
    console.warn("Lottie fallback active:", err);

    // Fallback Hero
    heroContainer.innerHTML = `
      <div style="width:320px;height:320px;display:flex;align-items:center;justify-content:center;border-radius:18px;background:#06111a;">
        <svg width="180" height="180" viewBox="0 0 1024 1024">
          <text x="50%" y="55%" fill="#00aaff" font-size="80" text-anchor="middle" font-family="Inter, Arial, sans-serif">VYRON</text>
        </svg>
      </div>
    `;

    // Fallback Logo
    logoContainer.innerHTML = `
      <div style="width:48px;height:48px;background:linear-gradient(90deg,#00aaff,#8B3DFF);border-radius:8px;box-shadow:0 6px 18px rgba(0,168,255,0.08)"></div>
    `;
  }
}

// ==========================
// DEMO FORM HANDLER
// ==========================
function initDemoForm() {
  const form = safeEl("demoForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const prompt = (safeEl("prompt") && safeEl("prompt").value || "").trim();
    const email = (safeEl("email") && safeEl("email").value || "").trim();

    if (!prompt || !email) {
      alert("Please enter prompt and email.");
      return;
    }

    const jobs = JSON.parse(localStorage.getItem("vy_jobs") || "[]");

    jobs.push({
      id: Date.now(),
      prompt,
      email,
      status: "pending"
    });

    localStorage.setItem("vy_jobs", JSON.stringify(jobs));

    const modal = safeEl("modal");
    if (modal) modal.classList.remove("hidden");
  });
}

// ==========================
// MODAL & UI HELPERS
// ==========================
function initModal() {
  const closeBtn = safeEl("closeModal");
  if (!closeBtn) return;

  closeBtn.addEventListener("click", () => {
    const modal = safeEl("modal");
    if (modal) modal.classList.add("hidden");
  });
}

function initSmoothScroll() {
  const openDemo = safeEl("openDemo");
  if (!openDemo) return;

  openDemo.addEventListener("click", () => {
    const prompt = safeEl("prompt");
    if (prompt) prompt.scrollIntoView({ behavior: "smooth", block: "center" });
  });
}

// ==========================
// BOOT
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  // تأخير بسيط للسماح للـ resources بالبدء (يحسن التجربة على GitHub Pages)
  setTimeout(() => {
    initLottie();
  }, 120);

  initDemoForm();
  initModal();
  initSmoothScroll();
});
