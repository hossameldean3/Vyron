document.addEventListener("DOMContentLoaded", () => {

  // ---- Correct absolute GitHub Pages paths ----
  const BASE = "https://hossameldean3.github.io/Vyron";

  const LOGO_PATH  = `${BASE}/assets/vyron_logo.json`;
  const HERO_PATH  = `${BASE}/assets/vyron_cinematic_lottie.json`;

  const hero      = document.getElementById("hero-lottie");
  const vyronLogo = document.getElementById("vyron-logo");

  // ---- Load Logo Animation ----
  lottie.loadAnimation({
    container: vyronLogo,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: LOGO_PATH
  });

  // ---- Load Hero Animation ----
  fetch(HERO_PATH)
    .then(r => r.json())
    .then(data => {
      lottie.loadAnimation({
        container: hero,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: data
      });
    })
    .catch(err => {
      console.error("Lottie failed to load", err);
      hero.innerHTML = `
        <div style="width:320px;height:320px;display:flex;align-items:center;justify-content:center;border-radius:18px;background:#06111a;color:#00aaff;font-size:28px;">
          VYRON
        </div>`;
    });

  // ---- Handle Demo Form ----
  const demoForm = document.getElementById("demoForm");
  demoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const prompt = document.getElementById("prompt").value.trim();
    const email  = document.getElementById("email").value.trim();

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

  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
  });

  document.getElementById("openDemo").addEventListener("click", () => {
    document.getElementById("prompt").scrollIntoView({ behavior: "smooth" });
  });

});
