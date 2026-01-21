// Mobile Menu Toggle
const mobileToggle = document.querySelector('.mobile-toggle');
const nav = document.querySelector('.nav');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        mobileToggle.classList.toggle('active');
    });
}

// Close menu when clicking a link on mobile
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            nav.style.display = 'none';
        }
    });
});

// Reset nav display on resize
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        nav.style.removeProperty('display');
    }
});

console.log('Portfolio initialized');
