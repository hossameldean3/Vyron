// تأثير التمرير السلس للروابط
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// تأثير الظهور عند التمرير
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// تطبيق تأثيرات الظهور على العناصر
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// تأثير شريط التنقل
window.addEventListener('scroll', function() {
    const nav = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// التحكم في الفيديو
const videoContainer = document.querySelector('.video-container');
const video = document.querySelector('.demo-video');
const playButton = document.querySelector('.play-button');
const videoOverlay = document.querySelector('.video-overlay');

if (video && playButton) {
    // تشغيل/إيقاف الفيديو
    playButton.addEventListener('click', function(e) {
        e.stopPropagation();
        if (video.paused) {
            video.play();
            videoOverlay.style.opacity = '0';
        } else {
            video.pause();
        }
    });

    // إظهار زر التشغيل عند التوقيف
    video.addEventListener('pause', function() {
        videoOverlay.style.opacity = '1';
    });

    // إخفاء زر التشغيل عند التشغيل
    video.addEventListener('play', function() {
        videoOverlay.style.opacity = '0';
    });

    // إعادة إظهار الزر عند انتهاء الفيديو
    video.addEventListener('ended', function() {
        videoOverlay.style.opacity = '1';
    });
}

// معالجة نموذج التجربة
const demoForm = document.querySelector('.demo-form');
if (demoForm) {
    const textarea = demoForm.querySelector('textarea');
    const email = demoForm.querySelector('input[type="email"]');
    const button = demoForm.querySelector('button');
    
    button.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (textarea.value.trim() && email.value.trim()) {
            // محاكاة إرسال النموذج
            const originalText = button.textContent;
            
            button.textContent = 'جاري المعالجة...';
            button.disabled = true;
            
            setTimeout(() => {
                button.textContent = 'تم الإرسال!';
                button.style.background = 'var(--success)';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    textarea.value = '';
                    email.value = '';
                }, 2000);
            }, 1500);
        } else {
            alert('يرجى ملء جميع الحقول المطلوبة');
        }
    });
}

// تأثيرات إضافية للبطاقات
document.querySelectorAll('.pricing-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// تأثيرات الأزرار
document.querySelectorAll('.btn-primary, .btn-secondary, .btn-outline').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });
    
    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // جعل العناصر المرئية تظهر فوراً
    setTimeout(() => {
        document.querySelectorAll('.fade-in').forEach(el => {
            if (el.getBoundingClientRect().top < window.innerHeight) {
                el.classList.add('visible');
            }
        });
    }, 100);
});
