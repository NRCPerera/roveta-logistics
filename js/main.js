/* ==========================================
   ROVETA LOGISTICS - Main JavaScript
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ==========================================
    // NAVBAR SCROLL EFFECT
    // ==========================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    function handleNavScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleNavScroll);
    handleNavScroll(); // Initial check

    // For sub-pages (no hero), always show scrolled navbar
    const isSubPage = !document.querySelector('.hero');
    if (isSubPage) {
        navbar.classList.add('scrolled');
    }

    // ==========================================
    // MOBILE NAV TOGGLE
    // ==========================================
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Close nav when clicking a link
        navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ==========================================
    // SCROLL ANIMATIONS (Custom AOS)
    // ==========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.1
    };

    const animateOnScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, parseInt(delay));
                animateOnScroll.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-aos]').forEach(el => {
        animateOnScroll.observe(el);
    });

    // ==========================================
    // COUNTER ANIMATION
    // ==========================================
    function animateCounter(el, target) {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target;
                clearInterval(timer);
            } else {
                el.textContent = Math.floor(current);
            }
        }, 16);
    }

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const countElements = entry.target.querySelectorAll('[data-count]');
                countElements.forEach(el => {
                    const target = parseInt(el.getAttribute('data-count'));
                    animateCounter(el, target);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    // Observe sections with counters
    document.querySelectorAll('.hero-stats, .stats-card-grid').forEach(section => {
        counterObserver.observe(section);
    });

    // ==========================================
    // FAQ ACCORDION
    // ==========================================
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.closest('.faq-item');
            const isActive = faqItem.classList.contains('active');

            // Close all FAQs
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });

            // Open clicked one if it wasn't active
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });

    // ==========================================
    // CONTACT FORM HANDLING
    // ==========================================
    const quoteForm = document.getElementById('quoteForm');
    const formSuccess = document.getElementById('formSuccess');

    if (quoteForm) {
        quoteForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(quoteForm);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            const required = ['fullName', 'phone', 'pickupLocation', 'destination', 'goodsDescription'];
            let isValid = true;

            required.forEach(field => {
                const input = quoteForm.querySelector(`[name="${field}"]`);
                if (!data[field] || data[field].trim() === '') {
                    input.style.borderColor = 'var(--primary)';
                    isValid = false;
                } else {
                    input.style.borderColor = '';
                }
            });

            if (!isValid) return;

            // Build WhatsApp message
            const whatsappMessage = encodeURIComponent(
                `*New Quote Request - Roveta Logistics*\n\n` +
                `*Name:* ${data.fullName}\n` +
                `*Phone:* ${data.phone}\n` +
                `*Email:* ${data.email || 'Not provided'}\n` +
                `*Pickup:* ${data.pickupLocation}\n` +
                `*Destination:* ${data.destination}\n` +
                `*Goods:* ${data.goodsDescription}\n` +
                `*Preferred Date:* ${data.preferredDate || 'Not specified'}\n` +
                `*Notes:* ${data.additionalNotes || 'None'}`
            );

            // Show success message
            quoteForm.style.display = 'none';
            formSuccess.classList.add('show');

            // Open WhatsApp with the message
            setTimeout(() => {
                window.open(`https://wa.me/94779996386?text=${whatsappMessage}`, '_blank');
            }, 1500);

            // Reset after 5 seconds
            setTimeout(() => {
                quoteForm.reset();
                quoteForm.style.display = '';
                formSuccess.classList.remove('show');
            }, 8000);
        });
    }

    // ==========================================
    // DISTRICT TAG HOVER ANIMATION
    // ==========================================
    document.querySelectorAll('.district-tag').forEach((tag, index) => {
        tag.style.animationDelay = `${index * 50}ms`;
    });

    // ==========================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // ==========================================
    // WHATSAPP BUTTON ANIMATION
    // ==========================================
    const whatsappBtn = document.getElementById('whatsappBtn');
    if (whatsappBtn) {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 300) {
                whatsappBtn.style.transform = 'scale(0.8)';
                whatsappBtn.style.opacity = '0.7';
            } else {
                whatsappBtn.style.transform = 'scale(1)';
                whatsappBtn.style.opacity = '1';
            }

            lastScrollY = currentScrollY;
        });
    }

    // ==========================================
    // LOADING ANIMATION
    // ==========================================
    document.body.classList.add('loaded');
});
