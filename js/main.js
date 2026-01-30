/**
 * ThisIsVietnam.com - Main JavaScript
 * Mobile-First • Progressive Enhancement
 */

(function() {
  'use strict';

  // ============================================
  // Navigation Toggle
  // ============================================
  const initNavigation = () => {
    const toggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('.nav');

    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', !isExpanded);
      nav.setAttribute('aria-hidden', isExpanded);
      document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close nav on link click (mobile)
    nav.querySelectorAll('.nav__link').forEach(link => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        nav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      });
    });

    // Close nav on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        toggle.setAttribute('aria-expanded', 'false');
        nav.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        toggle.focus();
      }
    });
  };

  // ============================================
  // Header Scroll Behavior
  // ============================================
  const initHeaderScroll = () => {
    const header = document.querySelector('.header');
    if (!header) return;

    let lastScroll = 0;
    let ticking = false;

    const updateHeader = () => {
      const currentScroll = window.pageYOffset;

      // Add scrolled class for shadow
      if (currentScroll > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }

      // Hide/show header on scroll (optional - uncomment to enable)
      // if (currentScroll > lastScroll && currentScroll > 200) {
      //   header.classList.add('header--hidden');
      // } else {
      //   header.classList.remove('header--hidden');
      // }

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
  // FAQ Accordion
  // ============================================
  const initFAQ = () => {
    const faqItems = document.querySelectorAll('.faq__item');

    faqItems.forEach(item => {
      const question = item.querySelector('.faq__question');

      question.addEventListener('click', () => {
        const isOpen = item.hasAttribute('open');

        // Optional: Close other items (accordion behavior)
        // faqItems.forEach(other => {
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
  // Smooth Scroll for Anchor Links
  // ============================================
  const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  };

  // ============================================
  // Intersection Observer for Animations
  // ============================================
  const initScrollAnimations = () => {
    if (!('IntersectionObserver' in window)) return;

    const animatedElements = document.querySelectorAll('[data-animate]');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      observer.observe(el);
    });
  };

  // ============================================
  // Lazy Loading Images
  // ============================================
  const initLazyLoading = () => {
    if ('loading' in HTMLImageElement.prototype) {
      // Native lazy loading supported
      document.querySelectorAll('img[data-src]').forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    } else if ('IntersectionObserver' in window) {
      // Fallback for older browsers
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  };

  // ============================================
  // Language Selector
  // ============================================
  const initLanguageSelector = () => {
    const buttons = document.querySelectorAll('.lang-selector__btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const lang = btn.dataset.lang;
        // In production, this would redirect to the appropriate language version
        // window.location.href = `/${lang}/`;

        // For demo, just update active state
        buttons.forEach(b => b.classList.remove('lang-selector__btn--active'));
        btn.classList.add('lang-selector__btn--active');
      });
    });
  };

  // ============================================
  // Reading Progress Bar (for article pages)
  // ============================================
  const initReadingProgress = () => {
    const progressBar = document.querySelector('.reading-progress');
    const article = document.querySelector('.article__content');

    if (!progressBar || !article) return;

    const updateProgress = () => {
      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.pageYOffset;

      const progress = Math.min(
        Math.max((scrollTop - articleTop + windowHeight * 0.5) / articleHeight, 0),
        1
      );

      progressBar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', () => {
      requestAnimationFrame(updateProgress);
    }, { passive: true });
  };

  // ============================================
  // Copy Link to Clipboard
  // ============================================
  const initCopyLink = () => {
    const copyButtons = document.querySelectorAll('[data-copy-link]');

    copyButtons.forEach(btn => {
      btn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(window.location.href);
          const originalText = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(() => {
            btn.textContent = originalText;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy:', err);
        }
      });
    });
  };

  // ============================================
  // Initialize All
  // ============================================
  const init = () => {
    initNavigation();
    initHeaderScroll();
    initFAQ();
    initSmoothScroll();
    initScrollAnimations();
    initLazyLoading();
    initLanguageSelector();
    initReadingProgress();
    initCopyLink();
  };

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
