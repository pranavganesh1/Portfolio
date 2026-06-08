/* ============================================
   Portfolio Scripts
   ============================================ */

(function () {
  'use strict';

  // Elements
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  const yearSpan = document.getElementById('year');

  // 1. Navbar show/hide on scroll
  function handleScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('visible');
    } else {
      navbar.classList.remove('visible');
    }
  }

  // 2. Mobile nav toggle
  function toggleNav() {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    const menuIcon = navToggle.querySelector('.icon-menu');
    const closeIcon = navToggle.querySelector('.icon-close');
    if (menuIcon && closeIcon) {
      menuIcon.classList.toggle('hidden', isOpen);
      closeIcon.classList.toggle('hidden', !isOpen);
    }
  }

  // 3. Close mobile nav on link click
  function closeNavOnClick() {
    if (navLinks.classList.contains('open')) {
      navLinks.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      const menuIcon = navToggle.querySelector('.icon-menu');
      const closeIcon = navToggle.querySelector('.icon-close');
      if (menuIcon && closeIcon) {
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
      }
    }
  }

  // 4. Smooth scroll for anchor links
  function smoothScroll(e) {
    const href = e.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  // 5. Intersection Observer for fade-in animations
  function initFadeIn() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    document.querySelectorAll('.section, .exp-card, .project-card, .skill-card, .achievement-card').forEach((el) => {
      el.classList.add('fade-in');
      observer.observe(el);
    });
  }

  // 6. Update footer year
  function updateYear() {
    if (yearSpan) {
      yearSpan.textContent = new Date().getFullYear();
    }
  }

  // Event Listeners
  window.addEventListener('scroll', handleScroll, { passive: true });

  if (navToggle) {
    navToggle.addEventListener('click', toggleNav);
  }

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', (e) => {
      smoothScroll(e);
      closeNavOnClick();
    });
  });

  // Initialize
  handleScroll();
  initFadeIn();
  updateYear();
})();
