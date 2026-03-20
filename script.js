// ============================================
// AUTOPUNK — Landing Page Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ---- Mobile Menu Toggle ----
    const toggle = document.querySelector('.navbar__toggle');
    const menu = document.querySelector('.navbar__menu');

    if (toggle && menu) {
        toggle.addEventListener('click', () => {
            const isOpen = menu.classList.toggle('open');
            toggle.classList.toggle('active');
            toggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when a link is clicked
        menu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menu.classList.remove('open');
                toggle.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
    }

    // ---- Testimonials Carousel ----
    const track = document.querySelector('.testimonials__track');
    const cards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonials__arrow--left');
    const nextBtn = document.querySelector('.testimonials__arrow--right');
    const dots = document.querySelectorAll('.testimonials__dot');

    if (track && cards.length > 0) {
        let currentIndex = 0;
        const gap = 24;

        function getCardsPerView() {
            return window.innerWidth <= 768 ? 1 : 2;
        }

        function getMaxIndex() {
            return Math.max(0, cards.length - getCardsPerView());
        }

        function updateCarousel() {
            const cardsPerView = getCardsPerView();
            const cardWidth = cards[0].offsetWidth + gap;
            track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === currentIndex);
            });
        }

        function goTo(index) {
            currentIndex = Math.max(0, Math.min(index, getMaxIndex()));
            updateCarousel();
        }

        if (prevBtn) prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
        if (nextBtn) nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => goTo(i));
        });

        // Auto-advance every 5 seconds
        let autoplay = setInterval(() => {
            if (currentIndex >= getMaxIndex()) {
                goTo(0);
            } else {
                goTo(currentIndex + 1);
            }
        }, 5000);

        // Pause autoplay on hover
        const wrapper = document.querySelector('.testimonials__carousel-wrapper');
        if (wrapper) {
            wrapper.addEventListener('mouseenter', () => clearInterval(autoplay));
            wrapper.addEventListener('mouseleave', () => {
                autoplay = setInterval(() => {
                    if (currentIndex >= getMaxIndex()) {
                        goTo(0);
                    } else {
                        goTo(currentIndex + 1);
                    }
                }, 5000);
            });
        }

        // Recalculate on resize
        window.addEventListener('resize', () => {
            if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
            updateCarousel();
        });

        updateCarousel();
    }

    // ---- Smooth scroll for anchor links ----
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // ---- Navbar background on scroll ----
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                navbar.style.borderBottomColor = 'rgba(255,255,255,0.1)';
            } else {
                navbar.style.borderBottomColor = 'rgba(255,255,255,0.06)';
            }
        });
    }

});
