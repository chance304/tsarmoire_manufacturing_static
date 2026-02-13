document.addEventListener('DOMContentLoaded', () => {
    console.log('Mobile script loaded');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        console.log('Hamburger element found');
        hamburger.addEventListener('click', () => {
            console.log('Hamburger clicked');
            navLinks.classList.toggle('mobile-active');
            hamburger.classList.toggle('toggle');
        });
    } else {
        console.error('Hamburger element NOT found');
    }
});
