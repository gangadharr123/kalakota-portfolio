/**
 * GANGADHAR KALAKOTA - Neo-Brutalist Interactivity
 * Focus: High-performance, quirky/editorial data flow
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. CUSTOM CURSOR (Quirky Tech Feel) ──────────────────────────
  const cursor = document.getElementById('cursorDot');
  
  if (window.matchMedia("(pointer: fine)").matches && cursor) {
    document.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });

    const interactables = document.querySelectorAll('a, button, .stat-box, .bento-card, .contact-link');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  } else if (cursor) {
    cursor.style.display = 'none'; // Hide on touch devices
  }

  // ── 2. DATA PIPELINE (Scroll Progress Hook) ─────────────────────
  const pipelineProgress = document.getElementById('pipelineProgress');
  
  const updatePipeline = () => {
    const scrollPos = window.scrollY;
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollPos / totalHeight) * 100;
    
    if (pipelineProgress) {
      pipelineProgress.style.height = `${progress}%`;
    }
  };
  
  window.addEventListener('scroll', updatePipeline, { passive: true });
  updatePipeline(); // Init

  // ── 3. SCRAMBLE TEXT EFFECT (Hacking Reveal) ────────────────────
  const chars = '!<>-_\\/[]{}—=+*^?#_';
  
  const scrambleText = (element) => {
    const originalText = element.innerText;
    let iterations = 0;
    const maxIterations = 15;
    
    const interval = setInterval(() => {
      element.innerText = originalText.split('').map((char, index) => {
        if(index < iterations) {
          return originalText[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      }).join('');
      
      if(iterations >= originalText.length) {
        clearInterval(interval);
        element.innerText = originalText; // Reset to ensure exact match
      }
      
      iterations += 1/3;
    }, 30);
  };

  // Scramble Nav Links on hover
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', function() {
      scrambleText(this);
    });
  });

  // ── 4. REVEAL ON SCROLL (Snappy) ────────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        
        // Trigger scramble if it's a target
        const scrambleTarget = entry.target.classList.contains('scramble-target') ? entry.target : entry.target.querySelector('.scramble-target');
        
        if (scrambleTarget && !scrambleTarget.dataset.scrambled) {
          scrambleText(scrambleTarget);
          scrambleTarget.dataset.scrambled = "true"; // Only scramble once on reveal
        }
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // ── 5. MOBILE MENU ──────────────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }

  // ── 6. NAV SCROLL STATE ─────────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }
  }, { passive: true });

  // ── 7. SMOOTH ANCHOR LINKS ──────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

});
