/**
 * Main JavaScript file for the portfolio website
 * Implements animations, interactions, and visual effects
 */

// yo this is the main js for my portfolio
// all the cool shit happens here

// grabbing stuff from the DOM
const body = document.body;
const header = document.querySelector('header');
const navLinks = document.querySelectorAll('.nav-links a');
const themeToggle = document.querySelector('.theme-toggle');
const pageLoader = document.querySelector('.page-loader');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const heroCanvas = document.getElementById('hero-canvas');
const sections = document.querySelectorAll('section');
const mobileMenuBtn = document.querySelector('.mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const mobileCloseBtn = document.getElementById('mobile-close');
const scrollTopBtn = document.getElementById('scroll-top');
const timelineItems = document.querySelectorAll('.timeline-item');
const techItems = document.querySelectorAll('.tech-item');

// setting up the canvas thing
let ctx;
if (heroCanvas) {
    ctx = heroCanvas.getContext('2d');
    setupCanvas();
}

// when page loads, run all this stuff
document.addEventListener('DOMContentLoaded', () => {
    initPageLoading();
    initThemeToggle();
    checkSavedTheme();
    initMobileMenu();
    initScrollAnimations();
    initCustomCursor();
    
    if (heroCanvas) {
        drawCanvas();
    }
    
    initPage();
});

// ==============================
// INITIALIZATION FUNCTIONS
// ==============================

function initPageLoading() {
    setTimeout(() => {
        body.classList.add('loaded');
        
        const fadeElements = document.querySelectorAll('.fade-in');
        fadeElements.forEach((el, index) => {
            setTimeout(() => {
                el.classList.add('show');
            }, 200 * index);
        });
    }, 1000);
}

function initThemeToggle() {
    if (!themeToggle) return;
    
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('light-theme');
        
        const icon = themeToggle.querySelector('i');
        if (body.classList.contains('light-theme')) {
            icon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'light');
        } else {
            icon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'dark');
        }
    });
}

function checkSavedTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light' && themeToggle) {
        body.classList.add('light-theme');
        const icon = themeToggle.querySelector('i');
        icon.className = 'fas fa-sun';
    }
}

function initMobileMenu() {
    if (!mobileMenu || !mobileMenuBtn) return;
    
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        mobileMenuBtn.classList.add('active');
        document.body.style.overflow = 'hidden'; // stop bg scrolling
    });
    
    if (mobileCloseBtn) {
        mobileCloseBtn.addEventListener('click', () => {
            closeMobileMenu();
        });
    }
    
    document.addEventListener('click', (e) => {
        if (mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMobileMenu();
        });
    });
    
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initScrollAnimations() {
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    let scrollDirection = 'up';
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        scrollDirection = currentScrollY > lastScrollY ? 'down' : 'up';
        lastScrollY = currentScrollY;
        
        if (currentScrollY > 100) {
            header.classList.add('scrolled');
            
            if (scrollDirection === 'down' && currentScrollY > 200) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('scrolled');
            header.classList.remove('hidden');
        }
        
        if (scrollTopBtn) {
            if (currentScrollY > 500) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        }
        
        highlightNavOnScroll();
        animateOnScroll();
    });
}

function initCustomCursor() {
    if (!cursor || !cursorFollower) return;
    
    if (window.matchMedia("(pointer: fine)").matches && window.innerWidth > 768) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
        
        const interactiveElements = document.querySelectorAll('a, button, .project-card, .tech-icon');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', (e) => {
                cursor.classList.add('cursor-hover');
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1.5)`;
                cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1.5)`;
                cursorFollower.style.backgroundColor = 'rgba(var(--color-primary-rgb), 0.1)';
                cursorFollower.style.borderWidth = '0px';
            });
            
            el.addEventListener('mouseleave', (e) => {
                cursor.classList.remove('cursor-hover');
                cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
                cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
                cursorFollower.style.backgroundColor = 'transparent';
                cursorFollower.style.borderWidth = '1px';
            });
        });
    } else {
        // hide cursor on mobile
        cursor.style.display = 'none';
        cursorFollower.style.display = 'none';
    }
}

// ==============================
// UTILITY FUNCTIONS
// ==============================

function highlightNavOnScroll() {
    if (!navLinks || navLinks.length === 0 || !sections || sections.length === 0) return;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

function animateOnScroll() {
    const fadeElements = document.querySelectorAll('.fade-in:not(.show)');
    fadeElements.forEach(el => {
        if (isInViewport(el)) {
            el.classList.add('show');
        }
    });
}

function isInViewport(element) {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8 &&
        rect.bottom >= 0
    );
}

// ==============================
// CANVAS BACKGROUND ANIMATION
// ==============================

function setupCanvas() {
    if (!heroCanvas) return;
    
    function resizeCanvas() {
        heroCanvas.width = window.innerWidth;
        heroCanvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
}

function drawCanvas() {
    if (!ctx || !heroCanvas) return;
    
    ctx.clearRect(0, 0, heroCanvas.width, heroCanvas.height);
    
    // colors change based on theme
    const isDarkTheme = !body.classList.contains('light-theme');
    const particleColor = isDarkTheme ? 'rgba(255, 255, 255, 0.3)' : 'rgba(0, 0, 0, 0.2)';
    const lineColor = isDarkTheme ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)';
    
    // this is a cool grid of dots with lines connecting them
    const gridSize = 40;
    const maxDistance = 150;
    
    for (let x = 0; x < heroCanvas.width; x += gridSize) {
        for (let y = 0; y < heroCanvas.height; y += gridSize) {
            const offsetX = Math.random() * 10 - 5;
            const offsetY = Math.random() * 10 - 5;
            
            ctx.fillStyle = particleColor;
            ctx.beginPath();
            ctx.arc(x + offsetX, y + offsetY, 1, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 0.5;
            
            for (let nx = Math.max(0, x - gridSize); nx < x; nx += gridSize) {
                for (let ny = Math.max(0, y - gridSize); ny < y + gridSize; ny += gridSize) {
                    const distance = Math.sqrt(Math.pow(x - nx, 2) + Math.pow(y - ny, 2));
                    if (distance <= maxDistance) {
                        ctx.globalAlpha = 1 - (distance / maxDistance);
                        ctx.beginPath();
                        ctx.moveTo(x + offsetX, y + offsetY);
                        ctx.lineTo(nx, ny);
                        ctx.stroke();
                        ctx.globalAlpha = 1;
                    }
                }
            }
        }
    }
    
    requestAnimationFrame(drawCanvas);
}

// Initialize page
function initPage() {
    initAnimations();
    initScrollEvents();
    animateTimeline();
    animateTechItems();
    
    if (pageLoader) {
        setTimeout(() => {
            pageLoader.classList.add('hide');
        }, 500);
    }
}

// Initialize animations
function initAnimations() {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        setTimeout(() => {
            heroTitle.classList.add('fade-in');
            heroTitle.classList.add('show');
        }, 500);
    }

    // fade these in after page loads
    const animatedElements = [
        '.hero-eyebrow',
        '.hero-description',
        '.hero-cta',
        '.timeline-item',
        '.tech-item'
    ];
    
    animatedElements.forEach((selector, index) => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${index * 0.1 + 0.2}s`;
        });
    });
}

// Initialize scroll events
function initScrollEvents() {
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Animate timeline items
function animateTimeline() {
    if (!timelineItems || timelineItems.length === 0) return;
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('timeline-animate');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        timelineItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        // for old browsers
        timelineItems.forEach(item => {
            item.classList.add('timeline-animate');
        });
    }
}

// Animate tech stack items
function animateTechItems() {
    if (!techItems || techItems.length === 0) return;
    
    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('tech-animate');
                    }, index * 50); // looks cooler with a delay
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        techItems.forEach(item => {
            observer.observe(item);
        });
    } else {
        // for old browsers again
        techItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('tech-animate');
            }, index * 50);
        });
    }
} 