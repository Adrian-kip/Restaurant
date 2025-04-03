// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Sticky Navigation
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    navbar.classList.toggle('scrolled', window.scrollY > 0);
});

// Menu Tab Navigation
const menuTabs = document.querySelectorAll('.menu-tab');
const menuSections = document.querySelectorAll('.menu-section');

menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and sections
        menuTabs.forEach(t => t.classList.remove('active'));
        menuSections.forEach(s => s.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding section
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Form Submission
const reservationForm = document.getElementById('reservationForm');
if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Form validation
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;
        
        if (!name || !email || !phone || !date || !time || !guests) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Submit form to Formspree
        const formData = new FormData(reservationForm);
        
        fetch(reservationForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                alert('Your reservation request has been sent. We will contact you shortly to confirm.');
                reservationForm.reset();
            } else {
                throw new Error('Network response was not ok');
            }
        })
        .catch(error => {
            alert('There was a problem with your submission. Please try again or call us directly.');
            console.error('Error:', error);
        });
    });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Initialize date picker with min date as today
const dateInput = document.getElementById('date');
if (dateInput) {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    
    dateInput.min = `${yyyy}-${mm}-${dd}`;
}

// Gallery hover effect
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.querySelector('img').style.transform = 'scale(1.1)';
        item.querySelector('.overlay').style.opacity = '1';
    });
    
    item.addEventListener('mouseleave', () => {
        item.querySelector('img').style.transform = 'scale(1)';
        item.querySelector('.overlay').style.opacity = '0';
    });
});

// Video autoplay on mobile
const heroVideo = document.getElementById('hero-video');
if (heroVideo) {
    // Check if device is mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    
    if (isMobile) {
        heroVideo.setAttribute('playsinline', '');
        heroVideo.setAttribute('muted', '');
        heroVideo.setAttribute('autoplay', '');
        
        // Some mobile browsers require this to autoplay
        document.body.addEventListener('touchstart', function() {
            heroVideo.play();
        }, { once: true });
    }
}

// Lazy loading for images
document.querySelectorAll('img').forEach(img => {
    img.setAttribute('loading', 'lazy');
});