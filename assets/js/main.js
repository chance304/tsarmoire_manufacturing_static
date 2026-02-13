(function () {
  'use strict';

  // ---- Mobile Navigation ----
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('mobile-active');
      hamburger.classList.toggle('toggle');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when a nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('mobile-active');
        hamburger.classList.remove('toggle');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && navLinks.classList.contains('mobile-active')) {
        navLinks.classList.remove('mobile-active');
        hamburger.classList.remove('toggle');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.focus();
      }
    });
  }

  // ---- Scroll Reveal ----
  var revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all elements immediately
    revealElements.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  // ---- Form Validation ----
  function validateForm(form, successId) {
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var isValid = true;
      var firstInvalid = null;

      // Reset previous errors
      form.querySelectorAll('.form-error').forEach(function (err) {
        err.style.display = 'none';
      });

      // Validate required fields
      form.querySelectorAll('[required]').forEach(function (field) {
        var errorEl = document.getElementById(field.id + '-error');
        var valid = field.value.trim() !== '';

        // Email-specific validation
        if (valid && field.type === 'email') {
          valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value.trim());
        }

        if (!valid) {
          isValid = false;
          if (errorEl) errorEl.style.display = 'block';
          field.setAttribute('aria-invalid', 'true');
          if (!firstInvalid) firstInvalid = field;
        } else {
          field.removeAttribute('aria-invalid');
        }
      });

      if (!isValid) {
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      // Form is valid — show success message
      var successEl = document.getElementById(successId);
      if (successEl) {
        successEl.classList.add('visible');
        form.reset();
        // Hide success after 5 seconds
        setTimeout(function () {
          successEl.classList.remove('visible');
        }, 5000);
      }
    });
  }

  validateForm(document.getElementById('inquiry-form'), 'inquiry-success');
  validateForm(document.getElementById('contact-form'), 'contact-success');

  // ---- Header scroll shadow ----
  var header = document.querySelector('header');
  if (header) {
    var lastScroll = 0;
    window.addEventListener('scroll', function () {
      var scrollY = window.pageYOffset;
      if (scrollY > 10) {
        header.style.boxShadow = '0 2px 20px rgba(28, 28, 28, 0.06)';
      } else {
        header.style.boxShadow = 'none';
      }
      lastScroll = scrollY;
    }, { passive: true });
  }

})();
