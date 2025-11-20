document.addEventListener('DOMContentLoaded', () => {

  // ========== Select Elements ==========
  const hero = document.getElementById('hero-lottie');
  const vyronLogo = document.getElementById('vyron-logo');

  // ========== Load Both Lottie Files ==========
  const cinematicFile = "assets/vyron_cinematic_lottie.json";
  const logoFile = "assets/vyron_logo.json";

  // --- SAFETY: Clear containers first ---
  hero.innerHTML = "";
  vyronLogo.innerHTML = "";

  // ---------- 1) Load Hero Cinematic ----------
  fetch(cinematicFile)
    .then(r => {
      if (!r.ok) throw new Error("Cinematic JSON not found");
      return r.json();
    })
    .then(data => {
      lottie.loadAnimation({
        container: hero,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: data
      });
    })
    .catch(() => {
      hero.innerHTML = `
        <div style="width:260px;height:260px;display:flex;align-items:center;justify-content:center;border-radius:18px;background:#06111a;">
          <svg width="180" height="180">
            <text x="50%" y="55%" fill="#00aaff" font-size="60" text-anchor="middle">VYRON</text>
          </svg>
        </div>
      `;
    });

  // ---------- 2) Load Logo Lottie ----------
  fetch(logoFile)
    .then(r => {
      if (!r.ok) throw new Error("Logo JSON not found");
      return r.json();
    })
    .then(data => {
      lottie.loadAnimation({
        container: vyronLogo,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: data
      });
    })
    .catch(() => {
      vyronLogo.innerHTML = `
        <div style="
          width:42px;height:42px;
          background:linear-gradient(90deg,#00aaff,#8B3DFF);
          border-radius:8px;">
        </div>
      `;
    });



  // ========== DEMO FORM ==========
  const demoForm = document.getElementById("demoForm");

  demoForm.addEventListener("submit", (e) => {
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

  document.getElementById("closeModal").addEventListener("click", () => {
    document.getElementById("modal").classList.add("hidden");
  });

  const openDemo = document.getElementById("openDemo");
  openDemo.addEventListener("click", () => {
    document.getElementById("prompt").scrollIntoView({ behavior: "smooth" });
  });

});
