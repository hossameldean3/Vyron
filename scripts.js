// --- Configuration: اضبط هذا على اسم المستخدم والريبو الصحيح ---
const GITHUB_USER = "hossameldean3";   // غيّر لو مختلف
const REPO_NAME   = "Vyron";          // غيّر لو مختلف
const GITHUB_BASE = `https://${GITHUB_USER}.github.io/${REPO_NAME}`;

// Paths داخل الريبو
const LOGO_JSON = `${GITHUB_BASE}/assets/vyron_logo.json`;
const HERO_JSON = `${GITHUB_BASE}/assets/vyron_cinematic_lottie.json`;

// Ensure DOM loaded
document.addEventListener("DOMContentLoaded", () => {

  const hero      = document.getElementById("hero-lottie");
  const vyronLogo = document.getElementById("vyron-logo");

  // Load logo by path (Lottie supports path)
  function tryLoadPath(path, container, opts = {}) {
    return fetch(path, {cache: "no-cache"})
      .then(r => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then(data => {
        lottie.loadAnimation(Object.assign({
          container,
          renderer: "svg",
          loop: opts.loop !== undefined ? opts.loop : true,
          autoplay: opts.autoplay !== undefined ? opts.autoplay : true,
          animationData: data
        }, opts));
        return true;
      })
      .catch(err => {
        console.warn("Lottie fetch failed for", path, err);
        return false;
      });
  }

  // 1) Try load logo JSON, else fallback simple gradient box
  tryLoadPath(LOGO_JSON, vyronLogo, { loop: true, autoplay: true })
    .then(ok => {
      if (!ok) {
        vyronLogo.innerHTML = `<div style="width:48px;height:48px;border-radius:8px;background:linear-gradient(90deg,#00aaff,#8B3DFF);display:flex;align-items:center;justify-content:center;font-weight:700;color:#001">V</div>`;
      }
    });

  // 2) Load hero animation JSON (bigger)
  tryLoadPath(HERO_JSON, hero, { loop: false, autoplay: true })
    .then(ok => {
      if (!ok) {
        // fallback visual placeholder if animation missing
        hero.innerHTML = `
          <div style="width:320px;height:320px;display:flex;align-items:center;justify-content:center;border-radius:18px;background:#06111a;color:#00aaff;font-size:20px;">
            VYRON
          </div>`;
      }
    });

  // ===== Demo form handling (MVP) =====
  const demoForm = document.getElementById("demoForm");
  const generateBtn = document.getElementById("generateBtn");

  demoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const prompt = document.getElementById("prompt").value.trim();
    const email  = document.getElementById("email").value.trim();

    if (!prompt || !email) {
      alert("Please enter prompt and email.");
      return;
    }

    // Save locally to localStorage (MVP)
    const jobs = JSON.parse(localStorage.getItem("vy_jobs") || "[]");
    jobs.push({
      id: Date.now(),
      prompt,
      email,
      status: "pending"
    });
    localStorage.setItem("vy_jobs", JSON.stringify(jobs));

    // UI feedback
    generateBtn.textContent = "Saved — Thanks";
    setTimeout(() => generateBtn.textContent = "Generate", 1500);
    alert("Demo request saved. We'll process manually and contact you.");
  });

  // Smooth scroll
  document.getElementById("openDemo").addEventListener("click", () => {
    document.getElementById("prompt").scrollIntoView({ behavior: "smooth" });
  });

});
