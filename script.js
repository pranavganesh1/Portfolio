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
    if (!navbar) return;
    if (window.scrollY > 80) {
      navbar.classList.add('visible');
    } else {
      navbar.classList.remove('visible');
    }
  }

  // 2. Mobile nav toggle
  function toggleNav() {
    if (!navLinks || !navToggle) return;
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
    if (!navLinks) return;
    if (navLinks.classList.contains('open')) {
      closeMobileNav();
    }
  }

  function closeMobileNav() {
    if (!navLinks || !navToggle) return;
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    const menuIcon = navToggle.querySelector('.icon-menu');
    const closeIcon = navToggle.querySelector('.icon-close');
    if (menuIcon && closeIcon) {
      menuIcon.classList.remove('hidden');
      closeIcon.classList.add('hidden');
    }
  }

  function closeNavOnEscape(e) {
    if (!navLinks) return;
    if (e.key === 'Escape' && navLinks.classList.contains('open')) {
      closeMobileNav();
      navToggle.focus();
    }
  }

  function closeNavOnOutsideClick(e) {
    if (!navLinks || !navToggle) return;
    if (!navLinks.classList.contains('open')) return;
    if (navLinks.contains(e.target) || navToggle.contains(e.target)) return;
    closeMobileNav();
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
    const animatedElements = document.querySelectorAll('.section, .exp-card, .project-card, .skill-card, .achievement-card');
    if (!('IntersectionObserver' in window)) {
      animatedElements.forEach((el) => {
        el.classList.add('visible');
      });
      return;
    }

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

    animatedElements.forEach((el) => {
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
  document.addEventListener('keydown', closeNavOnEscape);
  document.addEventListener('click', closeNavOnOutsideClick);

  if (navToggle) {
    navToggle.addEventListener('click', toggleNav);
  }

  if (navLinks) {
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', (e) => {
        smoothScroll(e);
        closeNavOnClick();
      });
    });
  }

  // Initialize
  handleScroll();
  initFadeIn();
  updateYear();
})();
