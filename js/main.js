/**
 * ThisIsVietnam.com - CINEMATIC EDITION
 * Advanced Scroll Animations & Interactive Effects
 */

(function() {
  'use strict';

  // ============================================
  // Loading Screen
  // ============================================
  const initLoader = () => {
    const loader = document.querySelector('.loader');
    if (!loader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('is-loaded');
        document.body.style.overflow = '';
      }, 2000);
    });

    // Fallback - hide loader after 4s max
    setTimeout(() => {
      loader.classList.add('is-loaded');
      document.body.style.overflow = '';
    }, 4000);
  };

  // ============================================
  // Cursor Glow Effect
  // ============================================
  const initCursorGlow = () => {
    // Only on devices with hover capability
    if (!window.matchMedia('(hover: hover)').matches) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    // Smooth follow animation
    const animateGlow = () => {
      const speed = 0.08;
      glowX += (mouseX - glowX) * speed;
      glowY += (mouseY - glowY) * speed;

      glow.style.left = glowX + 'px';
      glow.style.top = glowY + 'px';

      requestAnimationFrame(animateGlow);
    };

    animateGlow();
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

      // Add scrolled class
      if (currentScroll > 100) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }

      // Hide on scroll down, show on scroll up
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

    // Close on link click
    overlay.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        overlay.classList.remove('is-active');
        document.body.style.overflow = '';
      });
    });

    // Close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && overlay.classList.contains('is-active')) {
        toggle.setAttribute('aria-expanded', 'false');
        overlay.classList.remove('is-active');
        document.body.style.overflow = '';
      }
    });
  };

  // ============================================
  // Scroll Reveal Animations
  // ============================================
  const initScrollReveal = () => {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    elements.forEach(el => observer.observe(el));
  };

  // ============================================
  // Text Reveal Animation
  // ============================================
  const initTextReveal = () => {
    const textElements = document.querySelectorAll('.text-reveal');
    if (!textElements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    textElements.forEach(el => observer.observe(el));
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

        // Close others (optional - accordion behavior)
        // accordions.forEach(other => {
        //   if (other !== item) other.removeAttribute('open');
        // });

        if (isOpen) {
          item.removeAttribute('open');
        } else {
          item.setAttribute('open', '');
        }
      });
    });
  };

  // ============================================
  // Horizontal Scroll Drag
  // ============================================
  const initHorizontalScroll = () => {
    const tracks = document.querySelectorAll('.horizontal-scroll__track');
    if (!tracks.length) return;

    tracks.forEach(track => {
      let isDown = false;
      let startX;
      let scrollLeft;

      track.addEventListener('mousedown', (e) => {
        isDown = true;
        track.style.cursor = 'grabbing';
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
      });

      track.addEventListener('mouseleave', () => {
        isDown = false;
        track.style.cursor = 'grab';
      });

      track.addEventListener('mouseup', () => {
        isDown = false;
        track.style.cursor = 'grab';
      });

      track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 2;
        track.scrollLeft = scrollLeft - walk;
      });
    });
  };

  // ============================================
  // Counter Animation
  // ============================================
  const initCounterAnimation = () => {
    const counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = parseInt(counter.dataset.counter);
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const updateCounter = () => {
            current += step;
            if (current < target) {
              counter.textContent = Math.floor(current).toLocaleString();
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target.toLocaleString() + (counter.dataset.suffix || '');
            }
          };

          updateCounter();
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

    const buttons = document.querySelectorAll('.btn--magnetic');
    if (!buttons.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0, 0)';
      });
    });
  };

  // ============================================
  // Video Background Control
  // ============================================
  const initVideoBackground = () => {
    const videos = document.querySelectorAll('.hero__bg-video');
    if (!videos.length) return;

    // Pause videos when not visible
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
      video.playbackRate = 0.75; // Slow motion effect
    });
  };

  // ============================================
  // Scroll Progress Indicator
  // ============================================
  const initScrollProgress = () => {
    const progress = document.querySelector('.scroll-progress');
    if (!progress) return;

    window.addEventListener('scroll', () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progress.style.width = scrollPercent + '%';
    }, { passive: true });
  };

  // ============================================
  // Image Lazy Loading
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
            img.classList.add('is-loaded');
            imageObserver.unobserve(img);
          }
        });
      }, { rootMargin: '100px' });

      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  };

  // ============================================
  // Split Text Animation Helper
  // ============================================
  const splitText = (element) => {
    const text = element.textContent;
    const words = text.split(' ');

    element.innerHTML = words.map((word, i) =>
      `<span class="word" style="animation-delay: ${i * 0.1}s">
        ${word.split('').map(char => `<span class="char">${char}</span>`).join('')}
      </span>`
    ).join(' ');
  };

  // ============================================
  // Initialize Everything
  // ============================================
  const init = () => {
    // Core functionality
    initLoader();
    initNavigation();
    initHeaderScroll();
    initSmoothScroll();
    initAccordion();

    // Animations
    initScrollReveal();
    initTextReveal();
    initParallax();
    initCounterAnimation();

    // Interactive effects
    initCursorGlow();
    initHorizontalScroll();
    initMagneticButtons();

    // Media
    initVideoBackground();
    initLazyLoading();
    initScrollProgress();

    // Add loaded class to body
    document.body.classList.add('is-ready');
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
