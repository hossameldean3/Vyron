const translations = {
  en: {
    features: "Features",
    pricing: "Pricing",
    demo: "Demo",

    hero_title: "VYRON — Future in Motion",
    hero_sub: "Create stunning AI videos in seconds.",
    get_started: "Get Started",
    join_waitlist: "Join Waitlist",

    t1: "Zero setup • Instant samples",
    t2: "Pay-per-use pricing",
    t3: "Designed for creators & brands",

    features_title: "What VYRON Can Do",
    f1_title: "Text → Video",
    f1_desc: "Turn text into professional videos.",
    f2_title: "AI Presenter",
    f2_desc: "Realistic avatars that speak your script.",
    f3_title: "Upscale & Enhance",
    f3_desc: "Enhance video quality up to 4K.",

    pricing_title: "Pricing",

    demo_title: "Try a demo (fast)",
    prompt_label: "Enter a short prompt (10–30 words)",
    generate: "Generate",
    mvp_note: "We process demo requests manually during MVP phase.",

    modal_title: "Demo request sent",
    modal_body: "We received your request. Expect an email when your video is ready."
  },

  ar: {
    features: "المميزات",
    pricing: "الأسعار",
    demo: "تجربة",

    hero_title: "VYRON — المستقبل يتحرك",
    hero_sub: "أنشئ فيديوهات ذكاء اصطناعي مذهلة في ثوانٍ.",
    get_started: "ابدأ الآن",
    join_waitlist: "انضم للقائمة",

    t1: "بدون إعداد • نتائج فورية",
    t2: "الدفع حسب الاستخدام",
    t3: "مُصمّم لصناع المحتوى والعلامات التجارية",

    features_title: "ماذا يقدّم VYRON؟",
    f1_title: "نص → فيديو",
    f1_desc: "حوّل النصوص إلى فيديو احترافي.",
    f2_title: "مقدّم ذكاء اصطناعي",
    f2_desc: "أفاتار واقعي يتحدث بنصّك.",
    f3_title: "رفع الجودة",
    f3_desc: "تحسين جودة الفيديو حتى 4K.",

    pricing_title: "الأسعار",

    demo_title: "جرّب الديمو",
    prompt_label: "أدخل وصفًا قصيرًا (10–30 كلمة)",
    generate: "توليد",
    mvp_note: "نقوم بمعالجة طلبات الديمو يدويًا خلال مرحلة MVP.",

    modal_title: "تم إرسال طلب الديمو",
    modal_body: "استلمنا طلبك. سيتم إرسال الفيديو إلى بريدك عند الانتهاء."
  }
};


function setLanguage(lang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[lang] && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('enBtn').addEventListener('click', () => setLanguage('en'));
  document.getElementById('arBtn').addEventListener('click', () => setLanguage('ar'));

  // Default
  setLanguage('en');
});
