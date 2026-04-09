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
    glowX += (mouseX - glowX) * 0.05;
    glowY += (mouseY - glowY) * 0.05;
    
    if (meshGlow) {
      meshGlow.style.transform = `translate(${glowX - window.innerWidth/2}px, ${glowY - window.innerHeight/2}px)`;
    }
    requestAnimationFrame(animateMesh);
  }
  animateMesh();

  // ── 2. REVEAL ON SCROLL ──────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });

  // ── 3. MOBILE MENU ──────────────────────────────────────────
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

  // ── 4. NAV SCROLL STATE ──────────────────────────────────────────
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    if (nav) {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    }
  }, { passive: true });

  // ── 5. TYPING EFFECT ──────────────────────────────────────────────
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
          setTimeout(type, 50 + Math.random() * 40);
        } else {
          if (lineIdx < lines.length - 1) {
            typeTarget.appendChild(document.createElement('br'));
          }
          lineIdx++;
          charIdx = 0;
          setTimeout(type, 250);
        }
      }
    }
    setTimeout(type, 800);
  }

  // ── 6. SMOOTH ANCHOR LINKS ──────────────────────────────────────
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
