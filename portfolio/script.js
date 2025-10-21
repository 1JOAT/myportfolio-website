// ==================== SMOOTH SCROLL & NAVIGATION ====================
// Define scrollActive globally for debounce function
const scrollActive = () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');
        const sectionsClass = document.querySelector(`.nav__link[href*="${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            sectionsClass?.classList.add('active');
        } else {
            sectionsClass?.classList.remove('active');
        }
    });
};

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navClose = document.getElementById('nav-close');
    const navLinks = document.querySelectorAll('.nav__link');
    const scrollTopBtn = document.getElementById('scroll-top');

    // Sticky Header on Scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }

        // Show/Hide Scroll to Top Button
        if (currentScroll > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }

        lastScroll = currentScroll;
    });

    // Mobile Menu Toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.add('show-menu');
        });
    }

    if (navClose) {
        navClose.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    }

    // Close menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('show-menu');
        });
    });

    // Active Section Highlighting with scroll event
    window.addEventListener('scroll', scrollActive);

    // Smooth Scroll
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

    // Scroll to Top
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// ==================== CUSTOM CURSOR ====================
const createCustomCursor = () => {
    const cursorDot = document.createElement('div');
    const cursorOutline = document.createElement('div');

    cursorDot.className = 'cursor-dot';
    cursorOutline.className = 'cursor-outline';

    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorOutline);

    let mouseX = 0;
    let mouseY = 0;
    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {
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

    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .project-card, .tech-badge');

    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(2)`;
            cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px) scale(1.5)`;
        });

        el.addEventListener('mouseleave', () => {
            cursorDot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px) scale(1)`;
            cursorOutline.style.transform = `translate(${outlineX - 20}px, ${outlineY - 20}px) scale(1)`;
        });
    });
};

// Only create custom cursor on desktop
if (window.innerWidth > 768) {
    createCustomCursor();
}

// ==================== INTERSECTION OBSERVER ANIMATIONS ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements
document.querySelectorAll('.timeline__item, .project-card, .stat-card, .contact__info-item').forEach(el => {
    observer.observe(el);
});

// ==================== PARALLAX EFFECT ====================
const parallaxElements = document.querySelectorAll('.hero__visual, .hero__image-bg');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    parallaxElements.forEach(el => {
        const speed = el.dataset.speed || 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ==================== TYPING EFFECT ====================
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    element.textContent = '';

    const type = () => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    };

    type();
};

// Apply typing effect to hero profession
const profession = document.querySelector('.hero__profession');
if (profession) {
    const originalText = profession.textContent;
    setTimeout(() => {
        typeWriter(profession, originalText, 80);
    }, 800);
}


// ==================== NOTIFICATION SYSTEM ====================
const showNotification = (message, type = 'success') => {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 24px;
        background: ${type === 'success' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 50, 50, 0.95)'};
        color: ${type === 'success' ? '#000' : '#fff'};
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
};

// Add notification animations to CSS (injected dynamically)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==================== MOUSE TRAIL EFFECT ====================
const createMouseTrail = () => {
    const colors = ['rgba(255, 255, 255, 0.5)', 'rgba(200, 200, 200, 0.5)', 'rgba(150, 150, 150, 0.5)'];
    let particles = [];

    document.addEventListener('mousemove', (e) => {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${e.clientX}px;
            top: ${e.clientY}px;
            animation: fadeOut 1s ease forwards;
        `;

        document.body.appendChild(particle);
        particles.push(particle);

        setTimeout(() => {
            particle.remove();
            particles = particles.filter(p => p !== particle);
        }, 1000);
    });
};

// Add fadeOut animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes fadeOut {
        to {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);

// Only create mouse trail on desktop with reduced motion preference off
if (window.innerWidth > 768 && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    createMouseTrail();
}

// ==================== PROJECT CARD TILT EFFECT ====================
const cards = document.querySelectorAll('.project-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ==================== STATS COUNTER ANIMATION ====================
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.ceil(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    };

    updateCounter();
};

// Observe stat cards and animate when visible
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const number = entry.target.querySelector('.stat-card__number');
            const target = parseInt(number.textContent);
            animateCounter(number, target);
            statObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-card').forEach(card => {
    statObserver.observe(card);
});

// ==================== TECH BADGE HOVER ANIMATION ====================
const techBadges = document.querySelectorAll('.tech-badge');

techBadges.forEach(badge => {
    badge.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.05)';
    });

    badge.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ==================== GLITCH EFFECT ON HERO NAME ====================
const glitchText = (element) => {
    const originalText = element.textContent;
    const chars = '!<>-_\\/[]{}—=+*^?#________';

    let iteration = 0;
    const glitchInterval = setInterval(() => {
        element.textContent = originalText
            .split('')
            .map((char, index) => {
                if (index < iteration) {
                    return originalText[index];
                }
                return chars[Math.floor(Math.random() * chars.length)];
            })
            .join('');

        if (iteration >= originalText.length) {
            clearInterval(glitchInterval);
        }

        iteration += 1/3;
    }, 30);
};

// Apply glitch effect on page load
window.addEventListener('load', () => {
    const heroName = document.querySelector('.hero__name');
    if (heroName) {
        setTimeout(() => glitchText(heroName), 500);
    }
});

// ==================== MAGNETIC BUTTON EFFECT ====================
const magneticButtons = document.querySelectorAll('.btn--hero-primary, .btn--hero-secondary');

magneticButtons.forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});

// ==================== TIMELINE PROGRESS LINE ====================
const updateTimelineProgress = () => {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;

    const timelineLine = timeline.querySelector('::before');
    const rect = timeline.getBoundingClientRect();
    const scrollPercent = (window.innerHeight - rect.top) / rect.height;

    // This creates a visual progress effect as you scroll
    const items = document.querySelectorAll('.timeline__item');
    items.forEach((item, index) => {
        const itemRect = item.getBoundingClientRect();
        if (itemRect.top < window.innerHeight * 0.75) {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }
    });
};

window.addEventListener('scroll', updateTimelineProgress);

// ==================== IMAGE REVEAL EFFECT ====================
const profileImage = document.querySelector('.hero__profile-image');
if (profileImage) {
    const imageWrapper = document.querySelector('.hero__image-bg');

    imageWrapper.addEventListener('mouseenter', () => {
        profileImage.style.filter = 'grayscale(0%) contrast(1.1)';
        profileImage.style.transform = 'scale(1.1)';
    });

    imageWrapper.addEventListener('mouseleave', () => {
        profileImage.style.filter = 'grayscale(100%) contrast(1.2)';
        profileImage.style.transform = 'scale(1)';
    });
}

// ==================== FORM INPUT ANIMATIONS ====================
const formInputs = document.querySelectorAll('.form__input, .form__textarea');

formInputs.forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
        this.style.borderColor = 'rgba(255, 255, 255, 0.5)';
    });

    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
        this.style.borderColor = 'rgba(255, 255, 255, 0.1)';
    });

    // Floating label effect
    input.addEventListener('input', function() {
        const label = this.previousElementSibling;
        if (this.value) {
            label.style.transform = 'translateY(-30px) scale(0.85)';
            label.style.color = 'var(--color-white)';
        } else {
            label.style.transform = 'translateY(0) scale(1)';
            label.style.color = 'var(--color-gray-400)';
        }
    });
});

// ==================== NAVBAR BLUR ON SCROLL ====================
let previousScrollPosition = 0;
const navbar = document.getElementById('header');

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;

    if (currentScrollPosition > 100) {
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.background = 'rgba(0, 0, 0, 0.8)';
    }

    previousScrollPosition = currentScrollPosition;
});

// ==================== EASTER EGG: KONAMI CODE ====================
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

const activateEasterEgg = () => {
    // Create a matrix-style effect
    const canvas = document.createElement('canvas');
    canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 9999;
        pointer-events: none;
    `;
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const chars = '01';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#fff';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    };

    const matrixInterval = setInterval(draw, 33);

    setTimeout(() => {
        clearInterval(matrixInterval);
        canvas.remove();
        showNotification('🎮 Easter egg activated! You found the secret!', 'success');
    }, 5000);
};

// ==================== PRELOADER ====================
const createPreloader = () => {
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #000;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10001;
        transition: opacity 0.5s ease;
    `;

    const loader = document.createElement('div');
    loader.style.cssText = `
        width: 60px;
        height: 60px;
        border: 3px solid rgba(255, 255, 255, 0.1);
        border-top: 3px solid #fff;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    `;

    preloader.appendChild(loader);
    document.body.appendChild(preloader);

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.remove(), 500);
        }, 1000);
    });
};

createPreloader();

// ==================== REVEAL TEXT ON SCROLL ====================
const revealText = () => {
    const reveals = document.querySelectorAll('.about__description p, .project-card__description');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

window.addEventListener('scroll', revealText);

// Initial call
revealText();

// ==================== SPOTLIGHT EFFECT ====================
const createSpotlight = () => {
    let spotlight = document.createElement('div');
    spotlight.style.cssText = `
        position: fixed;
        width: 600px;
        height: 600px;
        background: radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 0;
        transition: transform 0.1s ease;
    `;
    document.body.appendChild(spotlight);

    document.addEventListener('mousemove', (e) => {
        spotlight.style.transform = `translate(${e.clientX - 300}px, ${e.clientY - 300}px)`;
    });
};

// Only on desktop
if (window.innerWidth > 968) {
    createSpotlight();
}

// ==================== SECTION TRANSITION EFFECTS ====================
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px'
});

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// ==================== PERFORMANCE OPTIMIZATION ====================
// Debounce function for scroll events
const debounce = (func, wait = 10) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Apply debounce to scroll-heavy functions
const debouncedScrollActive = debounce(scrollActive, 10);
const debouncedUpdateTimelineProgress = debounce(updateTimelineProgress, 10);
const debouncedRevealText = debounce(revealText, 10);

window.addEventListener('scroll', debouncedScrollActive);
window.addEventListener('scroll', debouncedUpdateTimelineProgress);
window.addEventListener('scroll', debouncedRevealText);

// ==================== ACCESSIBILITY ENHANCEMENTS ====================
// Skip to content functionality
document.querySelector('.skip-link')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('main')?.focus();
});

// Keyboard navigation for cards
const focusableCards = document.querySelectorAll('.project-card');
focusableCards.forEach(card => {
    card.setAttribute('tabindex', '0');

    card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            const link = card.querySelector('.project-card__link');
            if (link) link.click();
        }
    });
});

// ==================== PERFORMANCE MONITORING ====================
if ('PerformanceObserver' in window) {
    const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            // Log slow animations (optional, for debugging)
            if (entry.duration > 50) {
                console.warn('Slow animation detected:', entry);
            }
        }
    });

    observer.observe({ entryTypes: ['measure'] });
}

// ==================== NETWORK STATUS INDICATOR ====================
const showNetworkStatus = () => {
    window.addEventListener('online', () => {
        showNotification('🌐 Back online!', 'success');
    });

    window.addEventListener('offline', () => {
        showNotification('📡 No internet connection', 'error');
    });
};

showNetworkStatus();

// ==================== RESIZE HANDLER ====================
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Recalculate positions and sizes after resize
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.opacity = '1';
        }, 100);
    }, 250);
});

// ==================== CONSOLE EASTER EGG ====================
console.log('%c👋 Hello, curious developer!', 'font-size: 20px; font-weight: bold; color: #fff; background: #000; padding: 10px;');
console.log('%cLooking at the code? Nice! Feel free to reach out if you want to collaborate.', 'font-size: 14px; color: #999;');
console.log('%c📧 praiseoke215@gmail.com', 'font-size: 14px; color: #fff; font-weight: bold;');

// ==================== FINAL INITIALIZATION ====================
// ...
// Ensure all animations are ready
setTimeout(() => {
    document.body.classList.add('loaded');
}, 100);

// ==================== WHATSAPP FLOATING BUTTON DRAG ====================
const whatsappFloat = document.getElementById('whatsapp-float');
if (whatsappFloat) {
    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let elementStartX = 0;
    let elementStartY = 0;

    whatsappFloat.addEventListener('mousedown', (e) => {
        isDragging = true;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        const rect = whatsappFloat.getBoundingClientRect();
        elementStartX = rect.left;
        elementStartY = rect.top;
        whatsappFloat.style.cursor = 'grabbing';
        document.body.style.userSelect = 'none';
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - dragStartX;
        const deltaY = e.clientY - dragStartY;

        let newLeft = elementStartX + deltaX;
        let newTop = elementStartY + deltaY;

        // Keep within viewport bounds (with some margin)
        const margin = 20;
        const rect = whatsappFloat.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width - margin;
        const maxY = window.innerHeight - rect.height - margin;

        newLeft = Math.max(margin, Math.min(newLeft, maxX));
        newTop = Math.max(margin, Math.min(newTop, maxY));

        whatsappFloat.style.left = newLeft + 'px';
        whatsappFloat.style.right = 'auto';
        whatsappFloat.style.top = newTop + 'px';
        whatsappFloat.style.bottom = 'auto';
        whatsappFloat.style.transform = 'none';
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            whatsappFloat.style.cursor = 'grab';
            document.body.style.userSelect = '';
        }
    });

    // Touch events for mobile
    whatsappFloat.addEventListener('touchstart', (e) => {
        isDragging = true;
        const touch = e.touches[0];
        dragStartX = touch.clientX;
        dragStartY = touch.clientY;
        const rect = whatsappFloat.getBoundingClientRect();
        elementStartX = rect.left;
        elementStartY = rect.top;
        e.preventDefault();
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        const touch = e.touches[0];

        const deltaX = touch.clientX - dragStartX;
        const deltaY = touch.clientY - dragStartY;

        let newLeft = elementStartX + deltaX;
        let newTop = elementStartY + deltaY;

        const margin = 20;
        const rect = whatsappFloat.getBoundingClientRect();
        const maxX = window.innerWidth - rect.width - margin;
        const maxY = window.innerHeight - rect.height - margin;

        newLeft = Math.max(margin, Math.min(newLeft, maxX));
        newTop = Math.max(margin, Math.min(newTop, maxY));

        whatsappFloat.style.left = newLeft + 'px';
        whatsappFloat.style.right = 'auto';
        whatsappFloat.style.top = newTop + 'px';
        whatsappFloat.style.bottom = 'auto';
        whatsappFloat.style.transform = 'none';

        e.preventDefault();
    });

    document.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
        }
    });
}
