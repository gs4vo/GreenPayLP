// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navActions = document.querySelector('.nav-actions');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        const isActive = navLinks.classList.toggle('active');
        navActions.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
        // O botão hamburguer SEMPRE aparece, só muda o ícone (animação)
    });
    // Se clicar em qualquer link do menu, fecha o menu e reseta o botão
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            navActions.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#signup' || href === '#login' || href === '#demo') {
            return; // Let these be handled as needed
        }
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const navbarHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Navbar Background on Scroll
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.8)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for Fade-in Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements
const elementsToAnimate = document.querySelectorAll('.feature-card, .benefit-item, .pricing-card, .faq-item');
elementsToAnimate.forEach(el => observer.observe(el));

// Counter Animation for Stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = formatNumber(target);
            clearInterval(timer);
        } else {
            element.textContent = formatNumber(Math.floor(start));
        }
    }, 16);
};

const formatNumber = (num) => {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'k';
    }
    return num.toString();
};

// Animate stats when they come into view - DISABLED to prevent NaN issues
/*
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const stats = entry.target.querySelectorAll('.stat strong');
            stats.forEach(stat => {
                const text = stat.textContent;
                let value = 0;
                
                // Extract numeric value
                if (text.includes('k')) {
                    value = parseFloat(text) * 1000;
                } else if (text.includes('M')) {
                    value = parseFloat(text) * 1000000;
                } else if (text.includes('★')) {
                    value = parseFloat(text);
                    stat.textContent = '0.0★';
                    animateDecimal(stat, value, '★');
                    return;
                } else {
                    value = parseFloat(text.replace(/[^0-9.]/g, ''));
                }
                
                stat.textContent = '0';
                animateCounter(stat, value);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);
*/

const animateDecimal = (element, target, suffix = '') => {
    let start = 0;
    const increment = target / 100;
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toFixed(1) + suffix;
            clearInterval(timer);
        } else {
            element.textContent = start.toFixed(1) + suffix;
        }
    }, 20);
};

/* DISABLED - Stats animation
const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}
*/

// Form Handlers (placeholders for future implementation)
const handleSignup = (e) => {
    e.preventDefault();
    console.log('Signup form submitted');
    // Add your signup logic here
};

const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login form submitted');
    // Add your login logic here
};

// Price Toggle (Annual/Monthly) - Can be added if needed
const setupPriceToggle = () => {
    const toggle = document.querySelector('.price-toggle');
    if (!toggle) return;
    
    toggle.addEventListener('change', (e) => {
        const isAnnual = e.target.checked;
        updatePrices(isAnnual);
    });
};

const updatePrices = (isAnnual) => {
    // Logic to update prices based on billing cycle
    const prices = document.querySelectorAll('.amount');
    prices.forEach(price => {
        const monthly = parseFloat(price.dataset.monthly || price.textContent);
        const annual = monthly * 10; // 2 months free on annual
        price.textContent = isAnnual ? annual.toFixed(2) : monthly.toFixed(2);
    });
};

// Track CTA clicks for analytics
document.querySelectorAll('.btn-primary, .btn-outline, .btn-secondary').forEach(button => {
    button.addEventListener('click', (e) => {
        const buttonText = e.target.textContent.trim();
        const buttonHref = e.target.getAttribute('href');
        
        // Analytics tracking would go here
        console.log('Button clicked:', buttonText, buttonHref);
        
        // Example: gtag('event', 'click', { button_text: buttonText, button_href: buttonHref });
    });
});

// Lazy load images (if you add images later)
const lazyLoadImages = () => {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

lazyLoadImages();

// Progress bar animation
const animateProgressBars = () => {
    const progressBars = document.querySelectorAll('.progress-fill');
    
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
                progressObserver.unobserve(bar);
            }
        });
    }, observerOptions);
    
    progressBars.forEach(bar => progressObserver.observe(bar));
};

animateProgressBars();

// Add parallax effect to hero background
window.addEventListener('scroll', () => {
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        const scrolled = window.pageYOffset;
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Newsletter subscription (if added)
const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    console.log('Newsletter subscription:', email);
    // Add your newsletter logic here
    alert('Obrigado por se inscrever! 🎉');
};

// Keyboard navigation for FAQ
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        faqItems.forEach(item => item.classList.remove('active'));
    }
});

// Add loading state helper
const setLoadingState = (element, isLoading) => {
    if (isLoading) {
        element.classList.add('loading');
        element.disabled = true;
    } else {
        element.classList.remove('loading');
        element.disabled = false;
    }
};

// Print debug info in development
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    console.log('🌱 GreenPay Landing Page loaded');
    console.log('Environment: Development');
}

// Service Worker registration for PWA (future enhancement)
if ('serviceWorker' in navigator) {
    // Uncomment when you have a service worker
    // window.addEventListener('load', () => {
    //     navigator.serviceWorker.register('/sw.js')
    //         .then(reg => console.log('Service Worker registered'))
    //         .catch(err => console.log('Service Worker registration failed'));
    // });
}
