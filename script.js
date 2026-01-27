let currentSlide = 0;
const slides = document.getElementById('slides');
const totalSlides = document.querySelectorAll('.slide').length;
const dotsContainer = document.getElementById('dots');

// Touch/Swipe variables
let touchStartX = 0;
let touchEndX = 0;
let isDragging = false;

// Create dots
for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement('div');
    dot.className = 'dot';
    if (i === 0) dot.classList.add('active');
    dot.onclick = () => goToSlide(i);
    dotsContainer.appendChild(dot);
}

function updateSlider() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Update dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
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

// Mouse drag support for desktop (optional bonus)
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

// Contact form handler
function handleSubmit(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link with form data
    const mailtoLink = `mailto:your.email@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    window.location.href = mailtoLink;
}

// Lazy load image handler
document.addEventListener('DOMContentLoaded', function() {
    // Handle lazy loaded images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    lazyImages.forEach(img => {
        img.addEventListener('load', function() {
            this.classList.add('loaded');
        });
        
        // If image is already loaded (cached)
        if (img.complete) {
            img.classList.add('loaded');
        }
    });

    // Handle hero logo specifically
    const logoImg = document.querySelector('.logo-img');
    if (logoImg && logoImg.complete) {
        logoImg.style.opacity = '1';
    }
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
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
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
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const sectionTop = servicesSection.offsetTop;
        const sectionHeight = servicesSection.offsetHeight;
        
        // Only apply parallax when section is in view
        if (scrolled + window.innerHeight > sectionTop && scrolled < sectionTop + sectionHeight) {
            const offset = scrolled - sectionTop;
            
            // Different speeds for layered effect
            mountainBack.style.transform = `translateY(${offset * 0.3}px)`;
            mountain.style.transform = `translateY(${offset * 0.5}px)`;
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initServicesParallax);