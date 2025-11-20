document.addEventListener('DOMContentLoaded', () => {

  const hero = document.getElementById('hero-lottie');
  const vyronLogo = document.getElementById('vyron-logo');

  // ==========================
  // Load Cinematic Hero Motion
  // ==========================
  fetch("assets/vyron_cinematic_lottie.json")
    .then(r => {
      if (!r.ok) throw new Error("Cinematic not found");
      return r.json();
    })
    .then(cinematicData => {
      lottie.loadAnimation({
        container: hero,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: cinematicData
      });
    })
    .catch(() => {
      hero.innerHTML = `
        <div style="width:320px;height:320px;display:flex;align-items:center;justify-content:center;border-radius:18px;background:#06111a;">
          <svg width="180" height="180" viewBox="0 0 1024 1024">
            <text x="50%" y="55%" fill="#00aaff" font-size="80" text-anchor="middle">VYRON</text>
          </svg>
        </div>
      `;
    });

  // ==========================
  // Load Logo Motion (Loop)
  // ==========================
  lottie.loadAnimation({
    container: vyronLogo,
    renderer: 'svg',
    loop: true,
    autoplay: true,
    path: "assets/vyron_logo.json"
  });

  // ==========================
  // Demo Form (MVP)
  // ==========================
  const demoForm = document.getElementById('demoForm');

  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const prompt = document.getElementById('prompt').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!prompt || !email) {
      alert('Please enter prompt and email.');
      return;
    }

    const jobs = JSON.parse(localStorage.getItem('vy_jobs') || '[]');

    jobs.push({
      id: Date.now(),
      prompt,
      email,
      status: 'pending'
    });

    localStorage.setItem('vy_jobs', JSON.stringify(jobs));

    document.getElementById('modal').classList.remove('hidden');
  });

  // ==========================
  // Close Modal
  // ==========================
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
  });

  // ==========================
  // Smooth Scroll to Demo
  // ==========================
  const openDemo = document.getElementById('openDemo');
  openDemo.addEventListener('click', () => {
    document.getElementById('prompt').scrollIntoView({ behavior: 'smooth' });
  });

});
