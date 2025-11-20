// --- Configuration ---
const GITHUB_USER = "hossameldean3";
const REPO_NAME = "Vyron";
const GITHUB_BASE = `https://${GITHUB_USER}.github.io/${REPO_NAME}`;

// Paths داخل الريبو
const LOGO_JSON = `${GITHUB_BASE}/assets/vyron_logo.json`;
const HERO_JSON = `${GITHUB_BASE}/assets/vyron_cinematic_lottie.json`;

// Application State
const AppState = {
    currentVideoLength: 10,
    currentAspectRatio: '16:9',
    isLoading: false
};

// Ensure DOM loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeApp();
});

// Initialize Application
function initializeApp() {
    initializeLoading();
    initializeAnimations();
    initializeEventListeners();
    initializeFormValidation();
    initializeMobileMenu();
}

// Loading Screen Management
function initializeLoading() {
    const loadingScreen = document.getElementById('loading');
    
    // Simulate loading process
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 300);
    }, 1500);
}

// Animation Initialization
function initializeAnimations() {
    const hero = document.getElementById("hero-lottie");
    const vyronLogo = document.getElementById("vyron-logo");

    // Load logo animation
    loadAnimation(LOGO_JSON, vyronLogo, {
        loop: true,
        autoplay: true,
        fallback: createLogoFallback()
    });

    // Load hero animation
    loadAnimation(HERO_JSON, hero, {
        loop: false,
        autoplay: true,
        fallback: createHeroFallback()
    });

    // Initialize scroll animations
    initializeScrollAnimations();
}

// Enhanced Animation Loader
async function loadAnimation(path, container, options = {}) {
    try {
        const response = await fetch(path, {
            cache: "no-cache",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        
        const data = await response.json();
        
        return lottie.loadAnimation({
            container,
            renderer: "svg",
            loop: options.loop !== undefined ? options.loop : true,
            autoplay: options.autoplay !== undefined ? options.autoplay : true,
            animationData: data
        });
    } catch (error) {
        console.warn("Lottie animation failed to load:", path, error);
        if (options.fallback && container) {
            container.innerHTML = options.fallback;
        }
        return null;
    }
}

// Fallback Creators
function createLogoFallback() {
    return `
        <div style="width:100%;height:100%;border-radius:8px;background:linear-gradient(135deg, #00a8ff, #8B3DFF);display:flex;align-items:center;justify-content:center;font-weight:700;color:#001;font-size:18px;">
            V
        </div>
    `;
}

function createHeroFallback() {
    return `
        <div class="lottie-fallback">
            <div class="video-preview">
                <div class="video-placeholder"></div>
                <div class="play-indicator">▶</div>
            </div>
        </div>
    `;
}

// Scroll Animations
function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.feature-card, .pricing-card, .example-card').forEach(el => {
        observer.observe(el);
    });
}

// Event Listeners Initialization
function initializeEventListeners() {
    // Demo form handling
    const demoForm = document.getElementById("demoForm");
    const generateBtn = document.getElementById("generateBtn");
    
    if (demoForm) {
        demoForm.addEventListener("submit", handleDemoSubmission);
    }

    // Demo scroll button
    const openDemoBtn = document.getElementById("openDemo");
    if (openDemoBtn) {
        openDemoBtn.addEventListener("click", scrollToDemo);
    }

    // Waitlist button
    const joinWaitlistBtn = document.getElementById("joinWaitlist");
    if (joinWaitlistBtn) {
        joinWaitlistBtn.addEventListener("click", handleWaitlistJoin);
    }

    // Video options
    initializeVideoOptions();

    // Modal handling
    initializeModal();

    // Character count for textarea
    const promptTextarea = document.getElementById("prompt");
    if (promptTextarea) {
        promptTextarea.addEventListener("input", updateCharacterCount);
    }
}

// Mobile Menu Initialization
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            nav.style.display = isExpanded ? 'none' : 'flex';
            
            if (!isExpanded) {
                nav.style.flexDirection = 'column';
                nav.style.position = 'absolute';
                nav.style.top = '100%';
                nav.style.left = '0';
                nav.style.right = '0';
                nav.style.background = 'var(--bg-primary)';
                nav.style.padding = 'var(--space-4)';
                nav.style.borderTop = '1px solid var(--border-light)';
            }
        });
    }
}

// Video Options Initialization
function initializeVideoOptions() {
    // Video length options
    document.querySelectorAll('.option-btn[data-value]').forEach(btn => {
        btn.addEventListener('click', function() {
            const parent = this.closest('.option-buttons');
            parent.querySelectorAll('.option-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            if (this.closest('.option-group').querySelector('.option-label').textContent === 'Video Length') {
                AppState.currentVideoLength = this.dataset.value;
            } else {
                AppState.currentAspectRatio = this.dataset.value;
            }
        });
    });
}

// Form Validation
function initializeFormValidation() {
    const demoForm = document.getElementById("demoForm");
    
    demoForm.addEventListener("input", function(e) {
        const input = e.target;
        
        if (input.type === 'email') {
            validateEmail(input);
        }
        
        if (input.id === 'prompt') {
            validatePrompt(input);
        }
    });
}

function validateEmail(input) {
    const email = input.value.trim();
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    
    if (email && !isValid) {
        input.style.borderColor = 'var(--accent-orange)';
    } else {
        input.style.borderColor = '';
    }
    
    return isValid;
}

function validatePrompt(input) {
    const prompt = input.value.trim();
    const isValid = prompt.length >= 10 && prompt.length <= 200;
    
    if (prompt && !isValid) {
        input.style.borderColor = 'var(--accent-orange)';
    } else {
        input.style.borderColor = '';
    }
    
    return isValid;
}

// Character Count Update
function updateCharacterCount() {
    const prompt = document.getElementById("prompt");
    const charCount = document.getElementById("charCount");
    
    if (prompt && charCount) {
        const count = prompt.value.length;
        charCount.textContent = count;
        
        if (count > 180) {
            charCount.style.color = 'var(--accent-orange)';
        } else {
            charCount.style.color = 'var(--text-muted)';
        }
    }
}

// Demo Form Submission
async function handleDemoSubmission(e) {
    e.preventDefault();
    
    if (AppState.isLoading) return;
    
    const prompt = document.getElementById("prompt").value.trim();
    const email = document.getElementById("email").value.trim();
    const generateBtn = document.getElementById("generateBtn");
    const btnText = generateBtn.querySelector('.btn-text');
    const btnLoader = generateBtn.querySelector('.btn-loader');
    
    // Validation
    if (!prompt || !email) {
        showNotification('Please enter both prompt and email.', 'error');
        return;
    }
    
    if (!validateEmail(document.getElementById("email"))) {
        showNotification('Please enter a valid email address.', 'error');
        return;
    }
    
    if (!validatePrompt(document.getElementById("prompt"))) {
        showNotification('Prompt must be between 10 and 200 characters.', 'error');
        return;
    }
    
    // Start loading
    AppState.isLoading = true;
    btnText.textContent = 'Generating...';
    btnLoader.hidden = false;
    generateBtn.disabled = true;
    
    try {
        // Save to localStorage
        const jobData = {
            id: Date.now(),
            prompt,
            email,
            videoLength: AppState.currentVideoLength,
            aspectRatio: AppState.currentAspectRatio,
            status: "pending",
            timestamp: new Date().toISOString()
        };
        
        const jobs = JSON.parse(localStorage.getItem("vy_jobs") || "[]");
        jobs.push(jobData);
        localStorage.setItem("vy_jobs", JSON.stringify(jobs));
        
        // Simulate API call
        await simulateAPICall();
        
        // Show success
        showSuccessModal();
        e.target.reset();
        updateCharacterCount();
        
    } catch (error) {
        console.error('Submission error:', error);
        showNotification('Something went wrong. Please try again.', 'error');
    } finally {
        // Reset loading state
        AppState.isLoading = false;
        btnText.textContent = 'Generate Video';
        btnLoader.hidden = true;
        generateBtn.disabled = false;
    }
}

// Simulate API Call
function simulateAPICall() {
    return new Promise((resolve) => {
        setTimeout(resolve, 2000 + Math.random() * 1000);
    });
}

// Waitlist Handler
function handleWaitlistJoin() {
    const email = prompt('Enter your email to join the waitlist:');
    
    if (email && validateEmail({ value: email })) {
        const waitlist = JSON.parse(localStorage.getItem("vy_waitlist") || "[]");
        waitlist.push({
            email,
            timestamp: new Date().toISOString()
        });
        localStorage.setItem("vy_waitlist", JSON.stringify(waitlist));
        
        showNotification('Thanks for joining! We\'ll be in touch soon.', 'success');
    } else if (email) {
        showNotification('Please enter a valid email address.', 'error');
    }
}

// Scroll to Demo
function scrollToDemo() {
    const demoSection = document.getElementById("demo");
    if (demoSection) {
        demoSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
        // Focus on prompt input
        setTimeout(() => {
            const promptInput = document.getElementById("prompt");
            if (promptInput) promptInput.focus();
        }, 500);
    }
}

// Modal Handling
function initializeModal() {
    const modal = document.getElementById("successModal");
    const modalClose = document.getElementById("modalClose");
    
    if (modalClose) {
        modalClose.addEventListener("click", () => {
            modal.classList.add("hidden");
        });
    }
    
    // Close modal on overlay click
    if (modal) {
        modal.addEventListener("click", (e) => {
            if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                modal.classList.add("hidden");
            }
        });
    }
}

function showSuccessModal() {
    const modal = document.getElementById("successModal");
    if (modal) {
        modal.classList.remove("hidden");
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" aria-label="Close notification">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--bg-card);
        border: 1px solid var(--border-light);
        border-left: 4px solid ${getNotificationColor(type)};
        padding: var(--space-4);
        border-radius: var(--radius);
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: var(--space-3);
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: var(--text-secondary);
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    // Close button event
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
}

function getNotificationIcon(type) {
    const icons = {
        success: '✅',
        error: '❌',
        warning: '⚠️',
        info: 'ℹ️'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: 'var(--accent-green)',
        error: 'var(--accent-orange)',
        warning: 'var(--accent-orange)',
        info: 'var(--neon-blue)'
    };
    return colors[type] || colors.info;
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
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
    
    .animate-in {
        animation: fadeInUp 0.6s ease;
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
`;
document.head.appendChild(style);

// Error boundary for production
window.addEventListener('error', (event) => {
    console.error('Application error:', event.error);
    // You can send this to an error tracking service
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeApp };
}
