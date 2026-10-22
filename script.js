// Portfolio Slider (homepage only)
let currentSlide = 0;
const slides = document.getElementById('slides');
const totalSlides = document.querySelectorAll('.slide').length;
const dotsContainer = document.getElementById('dots');

// Touch/Swipe variables
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;

function updateSlider() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;

    // Update dots
    dotsContainer.querySelectorAll('.dot').forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

function previousSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateSlider();
}

function goToSlide(index) {
    currentSlide = index;
    updateSlider();
}

// Handle swipe gestures
function handleSwipe() {
    const swipeThreshold = 50; // Minimum swipe distance in pixels

    if (touchEndX < touchStartX - swipeThreshold) {
        // Swiped left - go to next slide
        nextSlide();
    }

    if (touchEndX > touchStartX + swipeThreshold) {
        // Swiped right - go to previous slide
        previousSlide();
    }
}

if (slides && dotsContainer) {
    // Create dots
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot';
        if (i === 0) dot.classList.add('active');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }

    // Touch event listeners
    const sliderContainer = document.querySelector('.slider-container');

    sliderContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        isDragging = true;
    }, { passive: true });

    sliderContainer.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
        touchEndX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderContainer.addEventListener('touchend', () => {
        if (!isDragging) return;
        handleSwipe();
        isDragging = false;
    }, { passive: true });

    // Mouse drag support for desktop
    sliderContainer.addEventListener('mousedown', (e) => {
        touchStartX = e.screenX;
        isDragging = true;
        sliderContainer.style.cursor = 'grabbing';
    });

    sliderContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        touchEndX = e.screenX;
    });

    sliderContainer.addEventListener('mouseup', () => {
        if (!isDragging) return;
        handleSwipe();
        isDragging = false;
        sliderContainer.style.cursor = 'grab';
    });

    sliderContainer.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            sliderContainer.style.cursor = 'grab';
        }
    });

    // Auto-play slider
    setInterval(nextSlide, 9000);
}

// Calendly - loaded only when a "Book a Call" link is clicked.
// Links point at the Calendly URL, so they still work without JavaScript.
const CALENDLY_URL = 'https://calendly.com/expertwebmaintenance';
let calendlyLoading = null;

function loadCalendly() {
    if (window.Calendly) return Promise.resolve();
    if (calendlyLoading) return calendlyLoading;

    calendlyLoading = new Promise((resolve, reject) => {
        const css = document.createElement('link');
        css.rel = 'stylesheet';
        css.href = 'https://assets.calendly.com/assets/external/widget.css';
        document.head.appendChild(css);

        const js = document.createElement('script');
        js.src = 'https://assets.calendly.com/assets/external/widget.js';
        js.async = true;
        js.onload = resolve;
        js.onerror = reject;
        document.head.appendChild(js);
    });
    return calendlyLoading;
}

document.querySelectorAll('.js-book-call').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        loadCalendly()
            .then(() => Calendly.initPopupWidget({ url: CALENDLY_URL }))
            .catch(() => window.open(CALENDLY_URL, '_blank', 'noopener'));
    });
});

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        }
    });
}

// Parallax Effect for Services Section
function initServicesParallax() {
    const servicesSection = document.querySelector('.services');
    const mountainBack = document.querySelector('.services-mountain-back');
    const mountain = document.querySelector('.services-mountain');

    if (!servicesSection || !mountainBack || !mountain) return;

    let ticking = false;

    function updateParallax() {
        const scrolled = window.scrollY;
        const sectionTop = servicesSection.offsetTop;
        const sectionHeight = servicesSection.offsetHeight;

        // Only apply parallax when section is in view
        if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
            const offset = scrolled - sectionTop;

            // Different speeds for layered effect
            mountainBack.style.transform = `translateY(${offset * 0.3}px)`;
            mountain.style.transform = `translateY(${offset * 0.5}px)`;
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initServicesParallax);
