// Animaciones on-scroll (IntersectionObserver)
(() => {
    const revealEls = document.querySelectorAll('.reveal');
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const el = entry.target;
        if (entry.isIntersecting) {
          const delay = parseInt(el.getAttribute('data-animate-delay') || '0', 10);
          setTimeout(() => el.classList.add('in'), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.15 });
  
    revealEls.forEach(el => io.observe(el));
  })();
  
  // Parallax suave en elementos con data-parallax-speed
  (() => {
    const pxEls = Array.from(document.querySelectorAll('.parallax, .parallax img'));
    const speedMap = new Map();
  
    pxEls.forEach(el => {
      const speed = parseFloat(el.getAttribute('data-parallax-speed') || el.parentElement?.getAttribute('data-parallax-speed') || '0.15');
      speedMap.set(el, speed);
    });
  
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY || window.pageYOffset;
          pxEls.forEach(el => {
            const speed = speedMap.get(el) || 0.15;
            const rect = el.getBoundingClientRect();
            const offset = (rect.top + scrollY) * speed * -0.06;
            el.style.transform = `translate3d(0, ${offset}px, 0)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  })();
  
  // Hover lens ligero en imágenes del carrusel
  (() => {
    const tiltCards = document.querySelectorAll('.tilt');
    tiltCards.forEach(card => {
      const onMove = (e) => {
        const rect = card.getBoundingClientRect();
        const cx = e.clientX - rect.left;
        const cy = e.clientY - rect.top;
        const rx = ((cy / rect.height) - 0.5) * -10;
        const ry = ((cx / rect.width) - 0.5) * 10;
        card.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg) scale(1.02)`;
      };
      const reset = () => { card.style.transform = 'rotateX(0) rotateY(0) scale(1)'; };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', reset);
    });
  })();
  
  // Scroll suave para anclas internas
  (() => {
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', (e) => {
        const targetId = link.getAttribute('href').substring(1);
        const target = document.getElementById(targetId);
        if (target) {
          e.preventDefault();
          const y = target.getBoundingClientRect().top + window.pageYOffset - 70;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      });
    });
  })();
  
  // Ajuste accesibilidad: pausar marquee al hover
  (() => {
    const marquee = document.querySelector('.marquee-track');
    if (!marquee) return;
    marquee.addEventListener('mouseenter', () => marquee.style.animationPlayState = 'paused');
    marquee.addEventListener('mouseleave', () => marquee.style.animationPlayState = 'running');
  })();
  