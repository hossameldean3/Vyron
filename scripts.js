document.addEventListener('DOMContentLoaded', () => {

  // ========== Load Lottie Animation ==========
  const hero = document.getElementById('hero-lottie');
  const vyronLogo = document.getElementById('vyron-logo');

  const lottiePath = "assets/vyron_cinematic_lottie.json";

  fetch(lottiePath)
    .then(r => {
      if (!r.ok) throw 1;
      return r.json();
    })
    .then(data => {
      // Hero Motion
      lottie.loadAnimation({
        container: hero,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: data
      });

      // Logo Motion
      lottie.loadAnimation({
        container: vyronLogo,
        renderer: 'svg',
        loop: false,
        autoplay: true,
        animationData: data
      });
    })
    .catch(() => {
      // If Lottie not found → fallback
      hero.innerHTML = `
        <div style="width:320px;height:320px;display:flex;align-items:center;justify-content:center;border-radius:18px;background:#06111a;">
          <svg width="180" height="180" viewBox="0 0 1024 1024">
            <text x="50%" y="55%" fill="#00aaff" font-size="80" text-anchor="middle">VYRON</text>
          </svg>
        </div>
      `;

      vyronLogo.innerHTML = `
        <div style="width:48px;height:48px;background:linear-gradient(90deg,#00aaff,#8B3DFF);border-radius:8px"></div>
      `;
    });



  // ========== Demo Form Handling (MVP) ==========
  const demoForm = document.getElementById('demoForm');

  demoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const prompt = document.getElementById('prompt').value.trim();
    const email = document.getElementById('email').value.trim();

    if (!prompt || !email) {
      alert('Please enter prompt and email.');
      return;
    }

    // Save locally — MVP handling
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


  // ========== Close Modal ==========
  document.getElementById('closeModal').addEventListener('click', () => {
    document.getElementById('modal').classList.add('hidden');
  });


  // ========== Smooth Scroll to Demo ==========
  const openDemo = document.getElementById('openDemo');
  openDemo.addEventListener('click', () => {
    document.getElementById('prompt').scrollIntoView({ behavior: 'smooth' });
  });

});
