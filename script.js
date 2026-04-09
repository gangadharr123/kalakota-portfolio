/**
 * GANGADHAR KALAKOTA — Portfolio v3
 * Interactivity: cursor, pipeline, scramble, reveal, counters, language bars
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── 1. CUSTOM CURSOR ───────────────────────────────────────────────
  const cursor = document.getElementById('cursorDot');

  if (window.matchMedia('(pointer: fine)').matches && cursor) {
    document.addEventListener('mousemove', e => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top  = e.clientY + 'px';
    });

    const targets = 'a, button, .stat-box, .cert-card, .contact-link, .pillar, .tag, .bento-card';
    document.querySelectorAll(targets).forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
  } else if (cursor) {
    cursor.style.display = 'none';
  }

  // ── 2. PIPELINE PROGRESS BAR ────────────────────────────────────────
  const pipelineEl = document.getElementById('pipelineProgress');

  const updatePipeline = () => {
    if (!pipelineEl) return;
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    pipelineEl.style.height = Math.min(pct, 100) + '%';
  };

  window.addEventListener('scroll', updatePipeline, { passive: true });
  updatePipeline();

  // ── 3. SCRAMBLE TEXT ───────────────────────────────────────────────
  const CHARS = '!<>-_\\/[]{}—=+*^?#@';

  const scramble = (el) => {
    const original = el.innerText;
    let frame = 0;
    const total = original.length * 3;

    const tick = () => {
      el.innerText = original.split('').map((ch, i) => {
        if (i < Math.floor(frame / 3)) return original[i];
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join('');

      frame++;
      if (frame <= total) requestAnimationFrame(tick);
      else el.innerText = original;
    };

    requestAnimationFrame(tick);
  };

  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('mouseenter', () => scramble(a));
  });

  // ── 4. SCROLL REVEAL + SCRAMBLE ON ENTER ────────────────────────────
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visible');

      const st = entry.target.classList.contains('scramble-target')
        ? entry.target
        : entry.target.querySelector('.scramble-target');

      if (st && !st.dataset.scrambled) {
        st.dataset.scrambled = '1';
        setTimeout(() => scramble(st), 150);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  // ── 5. COUNT-UP ANIMATION ───────────────────────────────────────────
  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting || entry.target.dataset.counted) return;
      entry.target.dataset.counted = '1';

      const target  = +entry.target.dataset.target;
      const suffix  = entry.target.dataset.suffix || '';
      const dur     = 1600;
      const fps     = 60;
      const steps   = dur / (1000 / fps);
      const inc     = target / steps;
      let   current = 0;

      const tick = () => {
        current = Math.min(current + inc, target);
        entry.target.textContent = Math.floor(current) + suffix;
        if (current < target) requestAnimationFrame(tick);
      };

      requestAnimationFrame(tick);
    });
  }, { threshold: 0.6 });

  document.querySelectorAll('.count-up').forEach(el => countObs.observe(el));

  // ── 6. LANGUAGE BARS ────────────────────────────────────────────────
  const langObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.lang-fill').forEach(bar => bar.classList.add('animated'));
      langObs.unobserve(entry.target);
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.lang-item').forEach(el => langObs.observe(el));

  // ── 7. MOBILE MENU ──────────────────────────────────────────────────
  const navToggle  = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');

  if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
      const open = mobileMenu.classList.toggle('open');
      navToggle.classList.toggle('active', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // ── 8. NAV SCROLL STATE ─────────────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav?.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });

  // ── 9. SMOOTH ANCHOR SCROLL ─────────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const href = a.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navH = document.getElementById('nav')?.offsetHeight || 70;
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.scrollY - navH,
          behavior: 'smooth'
        });
      }
    });
  });

  // ── 10. MARQUEE PAUSE ON TOUCH ──────────────────────────────────────
  const marquee = document.querySelector('.marquee-track');
  if (marquee) {
    marquee.addEventListener('touchstart', () => {
      marquee.style.animationPlayState = 'paused';
    }, { passive: true });
    marquee.addEventListener('touchend', () => {
      marquee.style.animationPlayState = 'running';
    }, { passive: true });
  }

});
