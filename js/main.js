/**
 * ThisIsVietnam.com - PREMIUM CINEMATIC EDITION
 * Advanced Scroll Animations, Micro-interactions & Immersive Effects
 */

(function() {
  'use strict';

  // ============================================
  // Film Grain Overlay
  // ============================================
  const initFilmGrain = () => {
    const grain = document.createElement('div');
    grain.className = 'film-grain';
    grain.setAttribute('aria-hidden', 'true');
    document.body.appendChild(grain);
  };

  // ============================================
  // Custom Cursor
  // ============================================
  const initCustomCursor = () => {
    if (!window.matchMedia('(hover: hover)').matches) return;
    if (window.innerWidth < 1024) return;

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    const dot = document.createElement('div');
    dot.className = 'custom-cursor__dot';
    document.body.appendChild(dot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth follow animation
    const animateCursor = () => {
      // Outer ring - slower follow
      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;
      cursor.style.left = cursorX + 'px';
      cursor.style.top = cursorY + 'px';

      // Inner dot - faster follow
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;
      dot.style.left = dotX + 'px';
      dot.style.top = dotY + 'px';

      requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Hover states
    const hoverElements = document.querySelectorAll('a, button, [data-hover]');
    hoverElements.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('custom-cursor--hover'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('custom-cursor--hover'));
    });

    // Click state
    document.addEventListener('mousedown', () => cursor.classList.add('custom-cursor--click'));
    document.addEventListener('mouseup', () => cursor.classList.remove('custom-cursor--click'));

    // Hide default cursor
    document.body.style.cursor = 'none';
    hoverElements.forEach(el => el.style.cursor = 'none');
  };

  // ============================================
  // Loading Screen with Counter
  // ============================================
  const initLoader = () => {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    let progress = 0;
    const progressBar = loader.querySelector('.loader__progress');
    const loaderLogo = loader.querySelector('.loader__logo');

    // Simulate loading with counter
    const updateProgress = () => {
      progress += Math.random() * 15;
      if (progress > 100) progress = 100;

      if (progressBar) {
        progressBar.style.width = progress + '%';
      }

      if (progress < 100) {
        setTimeout(updateProgress, 150);
      }
    };

    updateProgress();

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('is-loaded');
        document.body.style.overflow = '';
        document.body.classList.add('is-loaded');
      }, 2200);
    });

    // Fallback
    setTimeout(() => {
      loader.classList.add('is-loaded');
      document.body.style.overflow = '';
      document.body.classList.add('is-loaded');
    }, 4500);
  };

  // ============================================
  // Smooth Scroll (Lenis-inspired)
  // ============================================
  const initSmoothScrolling = () => {
    // Use native smooth scroll with enhanced easing via CSS
    document.documentElement.style.scrollBehavior = 'smooth';
  };

  // ============================================
  // Header Scroll Effects
  // ============================================
  const initHeaderScroll = () => {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    const updateHeader = () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }

      if (currentScroll > lastScroll && currentScroll > 300) {
        header.style.transform = 'translateY(-100%)';
      } else {
        header.style.transform = 'translateY(0)';
      }

      lastScroll = currentScroll;
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateHeader);
        ticking = true;
      }
    }, { passive: true });
  };

  // ============================================
  // Navigation Overlay
  // ============================================
  const initNavigation = () => {
    const toggle = document.querySelector('.nav-toggle');
    const overlay = document.querySelector('.nav-overlay');

    if (!toggle || !overlay) return;

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      overlay.classList.toggle('is-active');
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        overlay.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
        toggle.setAttribute('aria-expanded', 'false');
        overlay.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });
  };

  // ============================================
  // Scroll Reveal with Stagger
  // ============================================
  const initScrollReveal = () => {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add stagger delay based on element position in viewport
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, index * 50);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.forEach(el => observer.observe(el));
  };

  // ============================================
  // Image Reveal Animation
  // ============================================
  const initImageReveal = () => {
    const images = document.querySelectorAll('.image-reveal');
    if (!images.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    images.forEach(img => observer.observe(img));
  };

  // ============================================
  // Split Text Animation
  // ============================================
  const initSplitText = () => {
    const elements = document.querySelectorAll('.split-text');
    if (!elements.length) return;

    elements.forEach(el => {
      const text = el.textContent;
      el.innerHTML = text.split('').map(char =>
        char === ' ' ? ' ' : `<span class="char">${char}</span>`
      ).join('');
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    elements.forEach(el => observer.observe(el));
  };

  // ============================================
  // Premium Card Mouse Effect
  // ============================================
  const initCardMouseEffect = () => {
    const cards = document.querySelectorAll('.card-premium, .dish-card, .city-card, .story-card');
    if (!cards.length) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        card.style.setProperty('--mouse-x', x + '%');
        card.style.setProperty('--mouse-y', y + '%');
      });
    });
  };

  // ============================================
  // Parallax Effect
  // ============================================
  const initParallax = () => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    if (!parallaxElements.length) return;

    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.pageYOffset;

      parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        const rect = el.getBoundingClientRect();
        const elementTop = rect.top + scrollY;
        const offset = (scrollY - elementTop) * speed;

        if (rect.top < window.innerHeight && rect.bottom > 0) {
          el.style.transform = `translateY(${offset}px)`;
        }
      });

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateParallax);
        ticking = true;
      }
    }, { passive: true });
  };

  // ============================================
  // Smooth Anchor Scrolling
  // ============================================
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '#0') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 40;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // ============================================
  // Accordion / FAQ
  // ============================================
  const initAccordion = () => {
    const accordions = document.querySelectorAll('.accordion__item');
    if (!accordions.length) return;

    accordions.forEach(item => {
      const trigger = item.querySelector('.accordion__trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isOpen = item.hasAttribute('open');

        if (isOpen) {
          item.removeAttribute('open');
        } else {
          item.setAttribute('open', '');
        }
      });
    });
  };

  // ============================================
  // Horizontal Scroll with Velocity
  // ============================================
  const initHorizontalScroll = () => {
    const tracks = document.querySelectorAll('.horizontal-scroll__track');
    if (!tracks.length) return;

    tracks.forEach(track => {
      let isDown = false;
      let startX;
      let scrollLeft;
      let velX = 0;
      let momentumID;

      const beginMomentum = () => {
        cancelAnimationFrame(momentumID);
        momentumID = requestAnimationFrame(() => {
          track.scrollLeft += velX;
          velX *= 0.95;
          if (Math.abs(velX) > 0.5) {
            beginMomentum();
          }
        });
      };

      track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.style.cursor = 'grabbing';
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
        cancelAnimationFrame(momentumID);
      });

      track.addEventListener('mouseleave', () => {
        if (isDown) beginMomentum();
        isDown = false;
        track.style.cursor = 'grab';
      });

      track.addEventListener('mouseup', () => {
        if (isDown) beginMomentum();
        isDown = false;
        track.style.cursor = 'grab';
      });

      track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        velX = track.scrollLeft - (scrollLeft - walk);
        track.scrollLeft = scrollLeft - walk;
      });
    });
  };

  // ============================================
  // Counter Animation with Easing
  // ============================================
  const initCounterAnimation = () => {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const easeOutQuart = (t) => 1 - Math.pow(1 - t, 4);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.counter);
          const suffix = counter.dataset.suffix || '';
          const duration = 2500;
          const startTime = performance.now();

          const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutQuart(progress);
            const current = Math.floor(easedProgress * target);

            counter.textContent = current.toLocaleString() + (progress === 1 ? suffix : '');

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            }
          };

          requestAnimationFrame(updateCounter);
          observer.unobserve(counter);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  };

  // ============================================
  // Magnetic Buttons
  // ============================================
  const initMagneticButtons = () => {
    if (!window.matchMedia('(hover: hover)').matches) return;

    const buttons = document.querySelectorAll('.btn-magnetic, .btn--magnetic');
    if (!buttons.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;

        const text = btn.querySelector('.btn-magnetic__text');
        if (text) {
          text.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
        }
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
        const text = btn.querySelector('.btn-magnetic__text');
        if (text) {
          text.style.transform = 'translate(0, 0)';
        }
      });
    });
  };

  // ============================================
  // Video Background Control
  // ============================================
  const initVideoBackground = () => {
    const videos = document.querySelectorAll('.hero__bg-video, video[autoplay]');
    if (!videos.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.1 });

    videos.forEach(video => {
      observer.observe(video);
      video.playbackRate = 0.75;
    });
  };

  // ============================================
  // Scroll Progress Bar
  // ============================================
  const initScrollProgress = () => {
    const progress = document.querySelector('.scroll-progress');
    if (!progress) return;

    let ticking = false;

    const updateProgress = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progress.style.width = scrollPercent + '%';
      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateProgress);
        ticking = true;
      }
    }, { passive: true });
  };

  // ============================================
  // Scroll Progress Circle
  // ============================================
  const initScrollProgressCircle = () => {
    const indicator = document.querySelector('.scroll-indicator');
    if (!indicator) return;

    const progressPath = indicator.querySelector('.scroll-indicator__progress');
    const percentText = indicator.querySelector('.scroll-indicator__percent');
    if (!progressPath) return;

    const pathLength = 157; // Circumference of circle with r=25
    progressPath.style.strokeDasharray = pathLength;
    progressPath.style.strokeDashoffset = pathLength;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollTop / docHeight;
      const drawLength = pathLength * scrollPercent;

      progressPath.style.strokeDashoffset = pathLength - drawLength;

      if (percentText) {
        percentText.textContent = Math.round(scrollPercent * 100) + '%';
      }

      if (scrollTop > 200) {
        indicator.classList.add('is-visible');
      } else {
        indicator.classList.remove('is-visible');
      }
    }, { passive: true });
  };

  // ============================================
  // Image Lazy Loading with Fade
  // ============================================
  const initLazyLoading = () => {
    const images = document.querySelectorAll('img[data-src]');
    if (!images.length) return;

    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            img.addEventListener('load', () => {
              img.classList.add('is-loaded');
            });
            imageObserver.unobserve(img);
          }
        });
      }, { rootMargin: '200px' });

      images.forEach(img => imageObserver.observe(img));
    } else {
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  };

  // ============================================
  // Tilt Effect on Cards
  // ============================================
  const initTiltEffect = () => {
    if (!window.matchMedia('(hover: hover)').matches) return;

    const cards = document.querySelectorAll('[data-tilt]');
    if (!cards.length) return;

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
      });
    });
  };

  // ============================================
  // Page Visibility - Pause Animations
  // ============================================
  const initVisibilityHandler = () => {
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        document.body.classList.add('is-hidden');
      } else {
        document.body.classList.remove('is-hidden');
      }
    });
  };

  // ============================================
  // Keyboard Navigation Enhancement
  // ============================================
  const initKeyboardNav = () => {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') {
        document.body.classList.add('is-tabbing');
      }
    });

    document.addEventListener('mousedown', () => {
      document.body.classList.remove('is-tabbing');
    });
  };

  // ============================================
  // Initialize Everything
  // ============================================
  const init = () => {
    // Premium effects
    initFilmGrain();
    initCustomCursor();

    // Core functionality
    initLoader();
    initNavigation();
    initHeaderScroll();
    initSmoothScrolling();
    initSmoothScroll();
    initAccordion();

    // Animations
    initScrollReveal();
    initImageReveal();
    initSplitText();
    initParallax();
    initCounterAnimation();

    // Interactive effects
    initCardMouseEffect();
    initHorizontalScroll();
    initMagneticButtons();
    initTiltEffect();

    // Media
    initVideoBackground();
    initLazyLoading();
    initScrollProgress();
    initScrollProgressCircle();

    // Utilities
    initVisibilityHandler();
    initKeyboardNav();

    // Ready state
    document.body.classList.add('is-ready');

    console.log('%c✨ ThisIsVietnam.com - Premium Edition', 'color: #d4a853; font-size: 14px; font-weight: bold;');
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
