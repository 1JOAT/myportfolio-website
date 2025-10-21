// ==================== SMOOTH SCROLL & NAVIGATION ====================

const scrollActive = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const sectionLink = document.querySelector(`.nav__link[href*="${sectionId}"]`);
        if (!sectionLink) return;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionLink.classList.add('active');
        } else {
            sectionLink.classList.remove('active');
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');

    // Mobile visibility fix — disable animations on load
    if (window.innerWidth <= 768) {
        document.querySelectorAll('*').forEach(el => {
            el.style.animation = 'none';
            el.style.transition = 'none';
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    // Sticky nav
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Toggle nav menu
    navToggle?.addEventListener('click', () => navMenu.classList.add('show-menu'));
    navClose?.addEventListener('click', () => navMenu.classList.remove('show-menu'));
    navLinks.forEach(link => link.addEventListener('click', () => navMenu.classList.remove('show-menu')));

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            e.preventDefault();
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    window.addEventListener('scroll', debounce(scrollActive, 50));
});

// ==================== CUSTOM CURSOR (desktop only) ====================
const createCustomCursor = () => {
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';
    document.body.append(cursorDot, cursorOutline);

    let mouseX = 0, mouseY = 0, outlineX = 0, outlineY = 0;
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    });

    const animateOutline = () => {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px)`;
        requestAnimationFrame(animateOutline);
    };
    animateOutline();
};

if (window.innerWidth > 768) createCustomCursor();

// ==================== PERFORMANCE HELPERS ====================
const debounce = (func, wait = 50) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

// ==================== NOTIFICATION SYSTEM ====================
const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: ${type === 'success' ? 'rgba(255,255,255,0.95)' : 'rgba(255,50,50,0.95)'};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// ==================== PARALLAX (desktop only) ====================
if (window.innerWidth > 768) {
    const parallaxElements = document.querySelectorAll('.hero__visual, .hero__image-bg');
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                parallaxElements.forEach(el => {
                    const speed = el.dataset.speed || 0.4;
                    el.style.transform = `translateY(${scrolled * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });
}

// ==================== PRELOADER ====================
const createPreloader = () => {
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed; inset: 0;
        background: #000;
        display: flex; align-items: center; justify-content: center;
        z-index: 10001;
        transition: opacity 0.5s ease;
    `;
    const loader = document.createElement('div');
    loader.style.cssText = `
        width: 60px; height: 60px;
        border: 3px solid rgba(255,255,255,0.1);
        border-top: 3px solid #fff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;
    preloader.append(loader);
    document.body.append(preloader);
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 500);
        }, 800);
    });
};

createPreloader();

// ==================== NETWORK STATUS ====================
window.addEventListener('online', () => showNotification('🌐 Back online!'));
window.addEventListener('offline', () => showNotification('📡 No internet connection', 'error'));

// ==================== GLITCH EFFECT ====================
const glitchText = (element) => {
    const original = element.textContent;
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let iteration = 0;
    const glitchInterval = setInterval(() => {
        element.textContent = original
            .split('')
            .map((char, i) => (i < iteration ? original[i] : chars[Math.floor(Math.random() * chars.length)]))
            .join('');
        if (iteration >= original.length) clearInterval(glitchInterval);
        iteration += 1 / 3;
    }, 30);
};

window.addEventListener('load', () => {
    const heroName = document.querySelector('.hero__name');
    if (heroName && window.innerWidth > 768) {
        setTimeout(() => glitchText(heroName), 400);
    }
});

// ==================== A11Y & PERF ====================
document.querySelector('.skip-link')?.addEventListener('click', e => {
    e.preventDefault();
    document.getElementById('main')?.focus();
});

// ==================== FINAL INIT ====================
console.log('%c👋 Hello, curious dev!', 'font-size:16px; color:white; background:black; padding:4px;');
console.log('%c📧 praiseoke215@gmail.com', 'font-weight:bold; color:white;');
setTimeout(() => document.body.classList.add('loaded'), 150);

// Keyframes for preloader
const style = document.createElement('style');
style.textContent = `
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`;
document.head.appendChild(style);

console.log('🚀 Portfolio loaded (optimized for mobile)');
