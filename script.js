/**
 * GANGADHAR KALAKOTA - Portfolio Interactivity
 * High-performance, professional animations
 */

document.addEventListener('DOMContentLoaded', () => {
  
  // ── 1. MESH BACKGROUND INTERACTION ──────────────────────────────
  const meshBg = document.createElement('div');
  meshBg.className = 'mesh-bg';
  meshBg.innerHTML = '<div class="mesh-glow" id="meshGlow"></div>';
  document.body.prepend(meshBg);

  const meshGlow = document.getElementById('meshGlow');
  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateMesh() {
    // Smooth lerp for the glow movement
    glowX += (mouseX - glowX) * 0.05;
    glowY += (mouseY - glowY) * 0.05;
    
    meshGlow.style.transform = `translate(${glowX - window.innerWidth/3}px, ${glowY - window.innerHeight/3}px)`;
    requestAnimationFrame(animateMesh);
  }
  animateMesh();

  // ── 2. REVEAL ON SCROLL (Sophisticated) ──────────────────────────
  const revealOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optional: unobserve if you only want it to reveal once
        // revealObserver.unobserve(entry.target);
      }
    });
  }, revealOptions);

  document.querySelectorAll('.reveal').forEach((el, index) => {
    // Add staggered delay to children within the same section
    const parent = el.closest('section');
    const siblings = Array.from(parent ? parent.querySelectorAll('.reveal') : []);
    const delay = siblings.indexOf(el) * 0.1;
    el.style.transitionDelay = `${delay}s`;
    revealObserver.observe(el);
  });

  // ── 3. MAGNETIC BUTTONS (Micro-interaction) ─────────────────────
  const magneticBtns = document.querySelectorAll('.btn, .nav-logo, .nav-links a');
  
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });

  // ── 4. NAV SCROLL STATE ──────────────────────────────────────────
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

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

  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });

  // ── 5. SMOOTH ANCHOR LINKS ──────────────────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ── 6. TYPING EFFECT ──────────────────────────────────────────────
  const typeTarget = document.getElementById('typewriter');
  if (typeTarget) {
    const lines = [
      { text: "Hema Sai", tag: "" },
      { text: "Gangadhar Reddy", tag: "accent" },
      { text: "Kalakota", tag: "" }
    ];
    let lineIdx = 0;
    let charIdx = 0;
    
    function type() {
      if (lineIdx < lines.length) {
        if (charIdx === 0) {
          let el = document.createElement('span');
          if (lines[lineIdx].tag) el.className = lines[lineIdx].tag;
          typeTarget.appendChild(el);
        }
        
        let currentEl = typeTarget.children[lineIdx * 2];
        
        if (charIdx < lines[lineIdx].text.length) {
          currentEl.textContent += lines[lineIdx].text.charAt(charIdx);
          charIdx++;
          setTimeout(type, 60 + Math.random() * 50);
        } else {
          if (lineIdx < lines.length - 1) {
            typeTarget.appendChild(document.createElement('br'));
          }
          lineIdx++;
          charIdx = 0;
          setTimeout(type, 300);
        }
      }
    }
    setTimeout(type, 500);
  }

});
