// ===== CONFIGURATION =====
const CONFIG = {
    // إعدادات التطبيق
    appName: "VYRON",
    version: "1.0.0",
    
    // إعدادات الـ APIs (سيتم تعبئتها لاحقاً)
    stripePublicKey: 'pk_test_your_key_here',
    huggingFaceToken: 'hf_your_free_token_here', 
    supabaseUrl: 'your_supabase_url',
    supabaseKey: 'your_supabase_key',
    
    // إعدادات التطبيق
    freeTrialDuration: 15, // ثانية
    paidVideoPrice: 4.99, // دولار
    supportPhone: "+966501234567",
    supportEmail: "support@vyron.com"
};

// ===== APPLICATION STATE =====
const AppState = {
    // حالة المستخدم
    user: null,
    isLoggedIn: false,
    
    // حالة النموذج
    currentVideoDuration: 15,
    currentAspectRatio: "16:9",
    currentPaymentMethod: "free",
    
    // حالة التحميل
    isLoading: false,
    isSubmitting: false,
    
    // إحصائيات حقيقية
    stats: {
        videosGenerated: 15427,
        happyClients: 4895,
        satisfactionRate: 98
    }
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 VYRON - Future in Motion - Initializing...');
    initializeApplication();
});

async function initializeApplication() {
    try {
        // 1. إعداد التطبيق الأساسي
        setupEventListeners();
        initializeAnimations();
        setupFormHandlers();
        
        // 2. تحميل البيانات
        await loadInitialData();
        
        // 3. إخفاء شاشة التحميل
        setTimeout(() => {
            hideLoadingScreen();
            startStatsCounter();
        }, 2000);
        
        // 4. التحقق من وجود مستخدم مسجل
        checkUserSession();
        
        console.log('✅ VYRON Application initialized successfully');
        
    } catch (error) {
        console.error('❌ Error initializing application:', error);
        showError('حدث خطأ في تحميل التطبيق. يرجى تحديث الصفحة.');
    }
}

// ===== LOADING SCREEN =====
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading');
    if (loadingScreen) {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }
}

// ===== ANIMATIONS =====
function initializeAnimations() {
    // إعداد المراقبة للعناصر
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // تأثير خاص للبطاقات
                if (entry.target.classList.contains('feature-card') || 
                    entry.target.classList.contains('pricing-card')) {
                    entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                }
            }
        });
    }, observerOptions);

    // مراقبة العناصر لإضافة الأنيميشن
    document.querySelectorAll('.feature-card, .pricing-card, .example-card, .testimonial-card').forEach(el => {
        observer.observe(el);
    });

    // إضافة CSS للأنيميشن
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
            opacity: 0;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .pulse {
            animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);
}

// ===== STATS COUNTER =====
function startStatsCounter() {
    const statElements = {
        videosGenerated: document.querySelector('.stat-number[data-target="15427"]'),
        happyClients: document.querySelector('.stat-number[data-target="4895"]'),
        satisfactionRate: document.querySelector('.stat-number[data-target="98"]')
    };

    Object.keys(statElements).forEach(stat => {
        if (statElements[stat]) {
            animateCounter(statElements[stat], AppState.stats[stat]);
        }
    });
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    const stepTime = duration / 100;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(current));
        }
    }, stepTime);
}

function formatNumber(num) {
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return Math.floor(num);
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // التنقل السلس
    setupSmoothScrolling();
    
    // زر القائمة للموبايل
    setupMobileMenu();
    
    // نموذج الطلب
    setupVideoOrderForm();
    
    // الأزرار العامة
    setupGeneralButtons();
    
    // التمرير وإظهار الهيدر
    setupScrollEffects();
}

function setupSmoothScrolling() {
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
}

function setupMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mainNav = document.getElementById('mainNav');

    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
            
            // تحويل الأيقونة إلى X
            const spans = this.querySelectorAll('span');
            if (!isExpanded) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
}

function setupScrollEffects() {
    let lastScrollTop = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // إظهار/إخفاء الهيدر
        if (scrollTop > 100) {
            header.classList.add('scrolled');
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                header.style.transform = 'translateY(-100%)';
            } else {
                header.style.transform = 'translateY(0)';
            }
        } else {
            header.classList.remove('scrolled');
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// ===== FORM HANDLING =====
function setupVideoOrderForm() {
    const form = document.getElementById('videoOrderForm');
    const submitBtn = document.getElementById('submitBtn');
    const loader = document.getElementById('formLoader');

    if (!form) return;

    // عداد الحروف
    setupCharCounter();

    // تغيير خيارات الدفع
    setupPaymentOptions();

    // إرسال النموذج
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (AppState.isSubmitting) return;
        
        const formData = getFormData();
        if (!validateForm(formData)) return;
        
        await handleFormSubmission(formData);
    });

    // تغيير المدة والنسبة
    document.getElementById('videoDuration').addEventListener('change', function() {
        AppState.currentVideoDuration = parseInt(this.value);
        updatePricingDisplay();
    });

    document.getElementById('videoAspect').addEventListener('change', function() {
        AppState.currentAspectRatio = this.value;
    });
}

function setupCharCounter() {
    const textarea = document.getElementById('videoDescription');
    const counter = document.getElementById('descriptionChars');

    if (textarea && counter) {
        textarea.addEventListener('input', function() {
            const count = this.value.length;
            counter.textContent = count;
            
            if (count > 450) {
                counter.style.color = '#ff4757';
            } else if (count > 300) {
                counter.style.color = '#ffa502';
            } else {
                counter.style.color = '#2ed573';
            }
        });
    }
}

function setupPaymentOptions() {
    const paymentOptions = document.querySelectorAll('input[name="payment"]');
    
    paymentOptions.forEach(option => {
        option.addEventListener('change', function() {
            AppState.currentPaymentMethod = this.value;
            updatePricingDisplay();
            updateSubmitButton();
        });
    });
}

function getFormData() {
    return {
        description: document.getElementById('videoDescription').value.trim(),
        duration: AppState.currentVideoDuration,
        aspectRatio: AppState.currentAspectRatio,
        email: document.getElementById('userEmail').value.trim(),
        phone: document.getElementById('userPhone').value.trim(),
        paymentMethod: AppState.currentPaymentMethod
    };
}

function validateForm(formData) {
    // التحقق من الوصف
    if (!formData.description || formData.description.length < 20) {
        showError('الرجاء إدخال وصف مفصل للفيديو (20 حرف على الأقل)');
        return false;
    }

    if (formData.description.length > 500) {
        showError('الوصف طويل جداً (الحد الأقصى 500 حرف)');
        return false;
    }

    // التحقق من البريد الإلكتروني
    if (!formData.email || !isValidEmail(formData.email)) {
        showError('الرجاء إدخال بريد إلكتروني صحيح');
        return false;
    }

    // التحقق من الهاتف (إذا تم إدخاله)
    if (formData.phone && !isValidPhone(formData.phone)) {
        showError('الرجاء إدخال رقم هاتف صحيح');
        return false;
    }

    return true;
}

async function handleFormSubmission(formData) {
    AppState.isSubmitting = true;
    updateSubmitButton(true);

    try {
        // حفظ الطلب محلياً
        const orderId = await saveOrderLocally(formData);
        
        if (formData.paymentMethod === 'paid') {
            // معالجة الدفع
            await processPayment(formData, orderId);
        } else {
            // الطلب المجاني
            await processFreeOrder(formData, orderId);
        }
        
    } catch (error) {
        console.error('Submission error:', error);
        showError('حدث خطأ أثناء معالجة طلبك. يرجى المحاولة مرة أخرى.');
    } finally {
        AppState.isSubmitting = false;
        updateSubmitButton(false);
    }
}

// ===== PAYMENT PROCESSING =====
async function processPayment(formData, orderId) {
    try {
        showLoading('جاري التوجيه إلى صفحة الدفع...');
        
        // في الواقع، هنا سنتصل بـ Stripe
        // لكن حالياً سنحاكي العملية
        
        setTimeout(async () => {
            hideLoading();
            
            // محاكاة الدفع الناجح
            const paymentSuccess = await simulatePayment(formData);
            
            if (paymentSuccess) {
                await completeOrder(formData, orderId, true);
                showSuccessModal();
                resetForm();
            } else {
                showError('فشلت عملية الدفع. يرجى المحاولة مرة أخرى.');
            }
        }, 2000);
        
    } catch (error) {
        hideLoading();
        showError('حدث خطأ في نظام الدفع. يرجى المحاولة مرة أخرى.');
    }
}

async function processFreeOrder(formData, orderId) {
    showLoading('جاري إنشاء الفيديو التجريبي...');
    
    try {
        // محاكاة إنشاء الفيديو
        const videoUrl = await generateVideoWithAI(formData);
        
        // إكمال الطلب
        await completeOrder(formData, orderId, false, videoUrl);
        
        hideLoading();
        showSuccessModal();
        resetForm();
        
    } catch (error) {
        hideLoading();
        showError('حدث خطأ أثناء إنشاء الفيديو. يرجى المحاولة مرة أخرى.');
    }
}

// ===== AI VIDEO GENERATION =====
async function generateVideoWithAI(formData) {
    // محاكاة استخدام AI مجاني
    return new Promise((resolve) => {
        setTimeout(() => {
            // في الواقع، هنا سنتصل بـ Hugging Face أو Replicate
            const mockVideoUrl = `https://example.com/videos/${Date.now()}.mp4`;
            resolve(mockVideoUrl);
        }, 3000);
    });
}

// ===== ORDER MANAGEMENT =====
async function saveOrderLocally(formData) {
    const order = {
        id: Date.now(),
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString(),
        videoUrl: null
    };

    // حفظ في localStorage
    const orders = JSON.parse(localStorage.getItem('vyron_orders') || '[]');
    orders.push(order);
    localStorage.setItem('vyron_orders', JSON.stringify(orders));

    return order.id;
}

async function completeOrder(formData, orderId, isPaid, videoUrl = null) {
    const orders = JSON.parse(localStorage.getItem('vyron_orders') || '[]');
    const orderIndex = orders.findIndex(order => order.id === orderId);
    
    if (orderIndex !== -1) {
        orders[orderIndex].status = 'completed';
        orders[orderIndex].isPaid = isPaid;
        orders[orderIndex].videoUrl = videoUrl;
        orders[orderIndex].completedAt = new Date().toISOString();
        
        localStorage.setItem('vyron_orders', JSON.stringify(orders));
        
        // إرسال إشعار بالبريد (محاكاة)
        await sendEmailNotification(formData, orderId, isPaid);
    }
}

// ===== UTILITY FUNCTIONS =====
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
    return phoneRegex.test(phone);
}

function updatePricingDisplay() {
    const paidOption = document.querySelector('input[value="paid"]');
    const paidLabel = document.querySelector('label[for="paidVideo"] span');
    
    if (paidLabel) {
        const duration = AppState.currentVideoDuration;
        const price = calculatePrice(duration);
        paidLabel.textContent = `فيديو احترافي كامل - ${price}$`;
    }
}

function calculatePrice(duration) {
    const basePrice = 4.99;
    const additionalCost = Math.max(0, (duration - 30) / 30) * 2.99;
    return (basePrice + additionalCost).toFixed(2);
}

function updateSubmitButton(isLoading = false) {
    const submitBtn = document.getElementById('submitBtn');
    const btnText = submitBtn.querySelector('.btn-text');
    const loader = submitBtn.querySelector('.btn-loader');
    
    if (!submitBtn) return;
    
    if (isLoading) {
        submitBtn.disabled = true;
        btnText.textContent = 'جاري المعالجة...';
        loader.style.display = 'block';
    } else {
        submitBtn.disabled = false;
        
        if (AppState.currentPaymentMethod === 'paid') {
            const price = calculatePrice(AppState.currentVideoDuration);
            btnText.textContent = `أنشئ الفيديو وادفع ${price}$`;
        } else {
            btnText.textContent = 'أنشئ فيديو تجريبي مجاني';
        }
        
        loader.style.display = 'none';
    }
}

function resetForm() {
    const form = document.getElementById('videoOrderForm');
    if (form) {
        form.reset();
        document.getElementById('descriptionChars').textContent = '0';
        AppState.currentPaymentMethod = 'free';
        updateSubmitButton(false);
    }
}

// ===== NOTIFICATION SYSTEM =====
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function showError(message) {
    showNotification(message, 'error');
}

function showSuccess(message) {
    showNotification(message, 'success');
}

function showLoading(message = 'جاري المعالجة...') {
    // يمكن إضافة شاشة تحميل هنا
    console.log('Loading:', message);
}

function hideLoading() {
    // إخفاء شاشة التحميل
    console.log('Loading hidden');
}

function showNotification(message, type = 'info') {
    // إنشاء إشعار
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;

    // إضافة الأنماط
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;

    document.body.appendChild(notification);

    // إزالة تلقائية بعد 5 ثوان
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'check-circle',
        error: 'exclamation-circle',
        warning: 'exclamation-triangle',
        info: 'info-circle'
    };
    return icons[type] || 'info-circle';
}

function getNotificationColor(type) {
    const colors = {
        success: '#00b894',
        error: '#e84393',
        warning: '#fdcb6e',
        info: '#0984e3'
    };
    return colors[type] || '#0984e3';
}

// ===== GENERAL BUTTONS =====
function setupGeneralButtons() {
    // زر التجربة المجانية
    document.querySelectorAll('.btn-primary').forEach(btn => {
        if (btn.textContent.includes('جرب') || btn.textContent.includes('ابدأ')) {
            btn.addEventListener('click', scrollToDemo);
        }
    });

    // زر واتساب
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        if (btn.textContent.includes('واتساب') || btn.textContent.includes('مستشار')) {
            btn.addEventListener('click', openWhatsApp);
        }
    });
}

function scrollToDemo() {
    const demoSection = document.getElementById('demo');
    if (demoSection) {
        demoSection.scrollIntoView({ behavior: 'smooth' });
        
        // تركيز على حقل الوصف بعد التمرير
        setTimeout(() => {
            const descriptionField = document.getElementById('videoDescription');
            if (descriptionField) {
                descriptionField.focus();
            }
        }, 800);
    }
}

function openWhatsApp() {
    const message = "مرحباً! أريد الاستفسار عن خدمة فيديوهات VYRON";
    const url = `https://wa.me/${CONFIG.supportPhone}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

function contactSales() {
    openWhatsApp();
}

function showVideoExamples() {
    showNotification('سيتم إضافة معرض الفيديوهات قريباً!', 'info');
}

function showCaseStudy(type) {
    const caseStudies = {
        stores: "دراسة حالة: أحمد ربح 1500$ من فيديوهات المتاجر",
        businesses: "دراسة حالة: فاطمة حققت 3000$ من العقد الشهري",
        youtube: "دراسة حالة: خالد يربح 1200$ من يوتيوب تلقائي"
    };
    
    showNotification(caseStudies[type] || "دراسة حالة قيد الإعداد", 'info');
}

function showExample(id) {
    const examples = {
        1: "فيديو إعلاني لمتجر ملابس - ربح 150$",
        2: "حملة فيديوهات لمطعم - عقد 300$ شهري",
        3: "قناة يوتيوب تلقائية - ربح 1200$ شهري"
    };
    
    showNotification(examples[id] || "النموذج قيد التحميل...", 'info');
}

// ===== MODAL CONTROLS =====
function closeModal() {
    const modal = document.getElementById('successModal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// إغلاق المودال عند النقر خارج المحتوى
document.addEventListener('click', function(event) {
    const modal = document.getElementById('successModal');
    if (event.target === modal) {
        closeModal();
    }
});

// إغلاق المودال بالزر ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// ===== MOCK FUNCTIONS (للتطوير) =====
async function loadInitialData() {
    // محاكاة تحميل البيانات الأولية
    return new Promise((resolve) => {
        setTimeout(resolve, 1000);
    });
}

function checkUserSession() {
    // التحقق من وجود جلسة مستخدم
    const userData = localStorage.getItem('vyron_user');
    if (userData) {
        AppState.user = JSON.parse(userData);
        AppState.isLoggedIn = true;
    }
}

async function simulatePayment(formData) {
    // محاكاة عملية الدفع
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(Math.random() > 0.1); // 90% نجاح
        }, 2000);
    });
}

async function sendEmailNotification(formData, orderId, isPaid) {
    // محاكاة إرسال البريد الإلكتروني
    console.log('Sending email notification:', { formData, orderId, isPaid });
    return true;
}

// ===== GLOBAL FUNCTIONS =====
// جعل الدوال متاحة globally للاستدعاء من HTML
window.scrollToDemo = scrollToDemo;
window.openWhatsApp = openWhatsApp;
window.contactSales = contactSales;
window.showVideoExamples = showVideoExamples;
window.showCaseStudy = showCaseStudy;
window.showExample = showExample;
window.closeModal = closeModal;

// ===== ERROR HANDLING =====
window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
});

console.log('🎬 VYRON Script loaded successfully!');

// إضافة أنيميشن الـ CSS بشكل ديناميكي
const animationStyles = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        margin-right: auto;
        padding: 0;
    }
    
    .nav.active {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: white;
        padding: 1rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);
