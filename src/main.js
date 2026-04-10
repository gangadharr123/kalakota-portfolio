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

  // ── 8. TYPEWRITER EFFECT FOR HERO NAME ─────────────────────────
  const heroNameSpans = document.querySelectorAll('.hero-name span');
  if (heroNameSpans.length > 0) {
    const lines = Array.from(heroNameSpans).map(span => {
      const text = span.textContent.trim();
      span.textContent = '\u200B'; // Zero-width space to keep height
      return { element: span, text: text };
    });

    let currentLine = 0;
    let currentChar = 0;
    const typingSpeed = 80; // ms per char

    function typeLine() {
      if (currentLine < lines.length) {
        const line = lines[currentLine];
        
        if (!line.element.classList.contains('typing-cursor')) {
          line.element.classList.add('typing-cursor');
        }

        if (currentChar === 0) {
          line.element.textContent = ''; // clear zero-width space
        }
        
        if (currentChar < line.text.length) {
          line.element.textContent += line.text.charAt(currentChar);
          currentChar++;
          setTimeout(typeLine, typingSpeed);
        } else {
          line.element.classList.remove('typing-cursor');
          currentLine++;
          currentChar = 0;
          
          if (currentLine >= lines.length) {
            line.element.classList.add('typing-cursor');
          }
          
          setTimeout(typeLine, typingSpeed * 4); // Pause between lines
        }
      }
    }

    // Start typing slightly after the reveal animation begins
    setTimeout(typeLine, 600); 
  }



  // ── 9. THEME TOGGLE ─────────────────────────────────────────────
  const themeToggleBtn = document.getElementById('themeToggle');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      
      if (newTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'dark');
      }
    });
  }

  // ── 10. COMMAND PALETTE ─────────────────────────────────────────
  const cmdBackdrop = document.getElementById('cmdBackdrop');
  const cmdInput = document.getElementById('cmdInput');
  const cmdResults = document.getElementById('cmdResults');
  const cmdToggleBtn = document.getElementById('cmdToggleBtn');
  
  const commands = [
    { id: 'home', label: 'Go to Home', action: () => window.scrollTo(0,0), icon: '🏠' },
    { id: 'about', label: 'View Profile', action: () => document.querySelector('#about').scrollIntoView(), icon: '👤' },
    { id: 'experience', label: 'View Experience', action: () => document.querySelector('#experience').scrollIntoView(), icon: '💼' },
    { id: 'projects', label: 'View Projects', action: () => document.querySelector('#projects').scrollIntoView(), icon: '💻' },
    { id: 'education', label: 'View Education', action: () => document.querySelector('#education').scrollIntoView(), icon: '🎓' },
    { id: 'skills', label: 'View Expertise', action: () => document.querySelector('#skills').scrollIntoView(), icon: '⚡' },
    { id: 'resume', label: 'Download CV', action: () => window.open('/resume.pdf', '_blank'), icon: '📄' },
    { id: 'email', label: 'Send Email', action: () => window.location.href = 'mailto:gangadharr123@gmail.com', icon: '✉️' },
    { id: 'linkedin', label: 'View LinkedIn', action: () => window.open('https://linkedin.com/in/gangadharr123', '_blank'), icon: '🔗' },
    { id: 'theme', label: 'Toggle Theme', action: () => themeToggleBtn.click(), icon: '🌓' }
  ];

  let selectedCmdIndex = 0;

  function renderCommands(filter = '') {
    if (!cmdResults) return;
    cmdResults.innerHTML = '';
    
    const filtered = commands.filter(cmd => 
      cmd.label.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      cmdResults.innerHTML = '<div class="cmd-item" style="justify-content:center; opacity:0.5;">No commands found</div>';
      return;
    }

    filtered.forEach((cmd, index) => {
      const item = document.createElement('div');
      item.className = `cmd-item ${index === selectedCmdIndex ? 'selected' : ''}`;
      item.innerHTML = `
        <div style="display:flex; gap:10px; align-items:center;">
          <span>${cmd.icon}</span>
          <span class="cmd-item-label">${cmd.label}</span>
        </div>
      `;
      
      item.addEventListener('mouseenter', () => {
        selectedCmdIndex = index;
        renderCommands(filter);
      });
      
      item.addEventListener('click', () => {
        closeCommandPalette();
        cmd.action();
      });

      cmdResults.appendChild(item);
    });
  }

  function openCommandPalette() {
    if (cmdBackdrop) {
      cmdBackdrop.classList.add('active');
      cmdInput.value = '';
      selectedCmdIndex = 0;
      renderCommands();
      setTimeout(() => cmdInput.focus(), 50);
    }
  }

  function closeCommandPalette() {
    if (cmdBackdrop) {
      cmdBackdrop.classList.remove('active');
      cmdInput.blur();
    }
  }

  if (cmdToggleBtn) {
    cmdToggleBtn.addEventListener('click', openCommandPalette);
  }

  if (cmdBackdrop) {
    cmdBackdrop.addEventListener('click', (e) => {
      if (e.target === cmdBackdrop) closeCommandPalette();
    });
  }

  if (cmdInput) {
    cmdInput.addEventListener('input', (e) => {
      selectedCmdIndex = 0;
      renderCommands(e.target.value);
    });

    cmdInput.addEventListener('keydown', (e) => {
      const filtered = commands.filter(cmd => 
        cmd.label.toLowerCase().includes(cmdInput.value.toLowerCase())
      );

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedCmdIndex = (selectedCmdIndex + 1) % filtered.length;
        renderCommands(cmdInput.value);
        const selectedEl = cmdResults.querySelector('.selected');
        if (selectedEl) selectedEl.scrollIntoView({block: 'nearest'});
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedCmdIndex = (selectedCmdIndex - 1 + filtered.length) % filtered.length;
        renderCommands(cmdInput.value);
        const selectedEl = cmdResults.querySelector('.selected');
        if (selectedEl) selectedEl.scrollIntoView({block: 'nearest'});
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filtered[selectedCmdIndex]) {
          closeCommandPalette();
          filtered[selectedCmdIndex].action();
        }
      }
    });
  }

  // Global Keyboard Shortcut
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (cmdBackdrop && cmdBackdrop.classList.contains('active')) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    } else if (e.key === 'Escape' && cmdBackdrop && cmdBackdrop.classList.contains('active')) {
      closeCommandPalette();
    }
  });




  // ── 11. LIVE STATUS CYCLE ───────────────────────────────────────
  const statusText = document.getElementById('liveStatusText');
  if (statusText) {
    const statuses = [
      "Available in Germany",
      "Compiling pipelines...",
      "Analyzing market data...",
      "Deploying microservices...",
      "Drinking coffee (zzz)..."
    ];
    let statusIndex = 0;

    setInterval(() => {
      statusIndex = (statusIndex + 1) % statuses.length;
      
      // Typewriter effect for status change
      const newStatus = statuses[statusIndex];
      let charIndex = 0;
      statusText.textContent = '';
      
      const typeInterval = setInterval(() => {
        if (charIndex < newStatus.length) {
          statusText.textContent += newStatus.charAt(charIndex);
          charIndex++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);

    }, 5000); // Change every 5 seconds
  }



  // ── 12. THE ARCHITECT'S BLUEPRINT (Parallax Grid) ──────────────
  const bgGrid = document.getElementById('bgGrid');
  if (bgGrid && window.matchMedia("(pointer: fine)").matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40; // Max shift 20px
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      bgGrid.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // ── 13. CINEMATIC SCROLL MARQUEE ───────────────────────────────
  const marquee = document.getElementById('scrollMarquee');
  if (marquee) {
    let currentScroll = window.scrollY;
    let marqueeX = 0;
    
    window.addEventListener('scroll', () => {
      const delta = window.scrollY - currentScroll;
      currentScroll = window.scrollY;
      
      // Move marquee slightly faster than scroll for parallax
      marqueeX -= delta * 0.5;
      
      // Reset logic to create infinite loop
      if (marqueeX < -window.innerWidth * 1.5) {
        marqueeX = 0;
      } else if (marqueeX > 0) {
        marqueeX = -window.innerWidth;
      }
      
      marquee.style.transform = `translate3d(${marqueeX}px, 0, 0)`;
    }, { passive: true });
  }

  // ── 14. MAGNETIC UI (Physics-based hover) ──────────────────────
  const magnetics = document.querySelectorAll('.magnetic, .bento-card, .contact-link, .stat-box');
  
  if (window.matchMedia("(pointer: fine)").matches) {
    magnetics.forEach(el => {
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Calculate distance from center (max pull is 15px)
        const pullX = (e.clientX - centerX) * 0.1;
        const pullY = (e.clientY - centerY) * 0.1;
        
        el.classList.add('hovering');
        el.style.transform = `translate(${pullX}px, ${pullY}px) scale(1.02)`;
        
        if (el.classList.contains('bento-card')) {
             el.style.boxShadow = `${-pullX}px ${-pullY}px 20px rgba(255, 92, 0, 0.15)`;
        }
      });
      
      el.addEventListener('mouseleave', () => {
        el.classList.remove('hovering');
        el.style.transform = 'translate(0px, 0px) scale(1)';
        if (el.classList.contains('bento-card')) {
             el.style.boxShadow = 'none';
        }
      });
    });
  }



  // ── 15. TERMINAL TYPEWRITER (Projects Section) ─────────────────
  const terminalObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.dataset.typed) {
        entry.target.dataset.typed = "true";
        
        const typingLines = entry.target.querySelectorAll('.typing-effect');
        let currentDelay = 500; // start delay
        
        typingLines.forEach((line, index) => {
          const text = line.getAttribute('data-text');
          line.textContent = '';
          
          setTimeout(() => {
            let charIndex = 0;
            const typeInterval = setInterval(() => {
              if (charIndex < text.length) {
                line.textContent += text.charAt(charIndex);
                charIndex++;
              } else {
                clearInterval(typeInterval);
              }
            }, 30); // typing speed
          }, currentDelay);
          
          currentDelay += (text.length * 30) + 400; // pause before next line
        });
        
        // Show the final prompt line after all typing is done
        const finalPrompt = entry.target.querySelector('.term-prompt-line');
        if (finalPrompt) {
          setTimeout(() => {
            finalPrompt.style.opacity = '1';
          }, currentDelay + 200);
        }
      }
    });
  }, { threshold: 0.5 });

  const terminalBox = document.querySelector('.terminal-box');
  if (terminalBox) {
    terminalObserver.observe(terminalBox);
  }



  // ── 16. SYSTEM BOOT LOADER ───────────────────────────────────────
  const bootLoader = document.getElementById('bootLoader');
  if (bootLoader && !sessionStorage.getItem('booted')) {
    document.body.style.overflow = 'hidden'; // prevent scrolling during boot
    const lines = [
      "> Booting G.K. Portfolio Kernel v2.0...",
      "> [OK] Mounting Cloud Infrastructure...",
      "> [OK] Initializing Data Pipelines...",
      "> [OK] Fetching AWS/GCP/Azure Credentials...",
      "> Connection Established. Handing over control..."
    ];
    
    let currentLine = 0;
    
    function typeBootLine() {
      if (currentLine < lines.length) {
        const el = document.getElementById(`bootText${currentLine + 1}`);
        const text = lines[currentLine];
        let charIndex = 0;
        
        const interval = setInterval(() => {
          if (charIndex < text.length) {
            el.textContent += text[charIndex];
            charIndex++;
          } else {
            clearInterval(interval);
            currentLine++;
            setTimeout(typeBootLine, Math.random() * 200 + 100); // Random delay between lines
          }
        }, 15); // Fast typing
      } else {
        // Boot complete
        document.querySelector('.boot-cursor-line').style.opacity = '1';
        setTimeout(() => {
          bootLoader.classList.add('hidden');
          document.body.style.overflow = '';
          sessionStorage.setItem('booted', 'true');
          setTimeout(() => bootLoader.remove(), 500);
        }, 800);
      }
    }
    
    setTimeout(typeBootLine, 300);
  } else if (bootLoader) {
    bootLoader.remove(); // already booted this session
  }

  // ── 17. INTERACTIVE DATA PIPELINE ────────────────────────────────
  const pipelineContainer = document.querySelector('.pipeline-container');
  if (pipelineContainer && window.matchMedia("(pointer: fine)").matches) {
    let lastScroll = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      const scrollDiff = Math.abs(currentScroll - lastScroll);
      
      // Spawn a packet if scrolled enough
      if (scrollDiff > 50 && Math.random() > 0.5) {
        lastScroll = currentScroll;
        const packet = document.createElement('div');
        packet.className = 'data-packet';
        pipelineContainer.appendChild(packet);
        
        setTimeout(() => {
          if(packet.parentNode) packet.remove();
        }, 2000);
      }
    }, { passive: true });
  }

  // ── 18. REAL-TIME METRICS DASHBOARD ──────────────────────────────
  const cpuMetric = document.getElementById('cpuMetric');
  const memMetric = document.getElementById('memMetric');
  const netMetric = document.getElementById('netMetric');
  
  if (cpuMetric && memMetric && netMetric && window.matchMedia("(pointer: fine)").matches) {
    let mouseMoves = 0;
    let networkBlinks = 0;
    
    document.addEventListener('mousemove', () => mouseMoves++);
    document.addEventListener('click', () => {
      netMetric.textContent = "TX/RX ACTIVE";
      netMetric.style.color = "var(--accent)";
      networkBlinks = 3;
    });

    setInterval(() => {
      // Calculate CPU (based on mouse movement speed)
      let cpuLoad = Math.min(Math.floor(mouseMoves * 2.5) + Math.floor(Math.random() * 5), 100);
      if (mouseMoves === 0) cpuLoad = Math.floor(Math.random() * 5) + 1; // idle state
      
      const bars = Math.floor(cpuLoad / 10);
      const cpuString = `[${'|'.repeat(bars)}${'.'.repeat(10-bars)}] ${cpuLoad}%`;
      cpuMetric.textContent = cpuString;
      cpuMetric.style.color = cpuLoad > 80 ? '#ff5f56' : 'var(--text-muted)';
      mouseMoves = 0; // reset
      
      // Calculate MEM (based on scroll percentage)
      const scrollPos = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      let memLoad = 0;
      if (totalHeight > 0) memLoad = Math.floor((scrollPos / totalHeight) * 100);
      
      const memBars = Math.floor(memLoad / 10);
      memMetric.textContent = `[${'|'.repeat(memBars)}${'.'.repeat(10-memBars)}] ${memLoad}%`;
      
      // Network status
      if (networkBlinks > 0) {
        networkBlinks--;
      } else {
        netMetric.textContent = "IDLE";
        netMetric.style.color = "var(--text-muted)";
      }
    }, 200);
  }

});
