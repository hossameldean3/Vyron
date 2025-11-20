/**********************************************************
 * VYRON — Ultra Professional Script
 * Fixed for GitHub Pages
 * Optimized Lottie Loader + MVP Demo Logic
 **********************************************************/

// ==========================
// CONFIG
// ==========================
const BASE_PATH = "/Vyron/assets/";  
const CINEMATIC_FILE = BASE_PATH + "vyron_cinematic_lottie.json";
const LOGO_FILE = BASE_PATH + "vyron_logo.json";


// ==========================
// LOAD LOTTIE ANIMATIONS
// ==========================
function loadLottieAnimation(container, animationData, loop = true, autoplay = true) {
  return lottie.loadAnimation({
    container,
    renderer: "svg",
    loop,
    autoplay,
    animationData
  });
}

async function initLottie() {
  const heroContainer = document.getElementById("hero-lottie");
  const logoContainer = document.getElementById("vyron-logo");

  try {
    // Load cinematic main animation
    const cinematicResponse = await fetch(CINEMATIC_FILE);
    if (!cinematicResponse.ok) throw new Error("Cinematic Lottie missing");
    const cinematicJSON = await cinematicResponse.json();

    // Load logo animation
    const logoResponse = await fetch(LOGO_FILE);
    if (!logoResponse.ok) throw new Error("Logo Lottie missing");
    const logoJSON = await logoResponse.json();

    // PLAY ANIMATIONS
    loadLottieAnimation(heroContainer, cinematicJSON, false, true);
    loadLottieAnimation(logoContainer, logoJSON, true, true);

  } catch (err) {
    console.warn("Lottie failed, using fallback:", err);

    heroContainer.innerHTML = `
      <div style="width:320px;height:320px;display:flex;align-items:center;justify-content:center;border-radius:18px;background:#06111a;">
        <svg width="180" height="180" viewBox="0 0 1024 1024">
          <text x="50%" y="55%" fill="#00aaff" font-size="80" text-anchor="middle">VYRON</text>
        </svg>
      </div>
    `;

    logoContainer.innerHTML = `
      <div style="width:48px;height:48px;background:linear-gradient(90deg,#00aaff,#8B3DFF);border-radius:8px"></div>
    `;
  }
}


// ==========================
// WAIT FOR DOM READY
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  initLottie();
  initDemoForm();
  initModal();
  initSmoothScroll();
});


// ==========================
// MVP DEMO FORM HANDLER
// ==========================
function initDemoForm() {
  const form = document.getElementById("demoForm");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const prompt = document.getElementById("prompt").value.trim();
    const email = document.getElementById("email").value.trim();

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

    document.getElementById("modal").classList.remove("hidden");
  });
}


// ==========================
// MODAL HANDLER
// ==========================
function initModal() {
  const closeBtn = document.getElementById("closeModal");
  if (!closeBtn) return;

  closeBtn.addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
  });
}


// ==========================
// SMOOTH SCROLL
// ==========================
function initSmoothScroll() {
  const openDemo = document.getElementById("openDemo");
  if (!openDemo) return;

  openDemo.addEventListener("click", () => {
    document.getElementById("prompt").scrollIntoView({ behavior: "smooth" });
  });
}
