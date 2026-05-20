/* ============================================================
   CAKE BEAUTIES — Main JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ── Navbar Scroll Effect ──
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    });
  }

  // ── Mobile Hamburger Menu ──
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu-close');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    if (mobileClose) {
      mobileClose.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Scroll Reveal Animations ──
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => entry.target.classList.add('visible'), i * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
    revealObserver.observe(el);
  });

  // ── Stagger children reveal ──
  document.querySelectorAll('[data-stagger]').forEach(parent => {
    const children = parent.children;
    Array.from(children).forEach((child, i) => {
      child.style.transitionDelay = `${i * 100}ms`;
      child.classList.add('reveal');
      revealObserver.observe(child);
    });
  });

  // ── Gallery Filter ──
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item, .gallery-page-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? '' : 'none';
        if (show) {
          item.style.opacity = '0';
          item.style.transform = 'translateY(20px)';
          setTimeout(() => {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 50);
        }
      });
    });
  });

  // ── FAQ Accordion (original + new classes) ──
  document.querySelectorAll('.faq-q, .faq-q-new').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item, .faq-item-new').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Form Flavour/Toggle Chips ──
  document.querySelectorAll('.form-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const group = chip.closest('.form-chip-group');
      if (group) {
        group.querySelectorAll('.form-chip').forEach(c => c.classList.remove('selected'));
      }
      chip.classList.toggle('selected');
    });
  });

  document.querySelectorAll('.form-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const group = toggle.closest('.form-toggle-group');
      if (group) group.querySelectorAll('.form-toggle').forEach(t => t.classList.remove('selected'));
      toggle.classList.add('selected');
    });
  });

  // ── Flavour Cards ──
  document.querySelectorAll('.flavour-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.flavour-card').forEach(c => c.classList.remove('featured'));
      card.classList.add('featured');
    });
  });

  // ── Category Cards → smooth scroll to gallery ──
  document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      const gallery = document.querySelector('.gallery-section');
      if (gallery) {
        const filter = card.dataset.category;
        gallery.scrollIntoView({ behavior: 'smooth' });
        setTimeout(() => {
          const btn = document.querySelector(`.filter-btn[data-filter="${filter}"]`);
          if (btn) btn.click();
        }, 600);
      }
    });
  });

  // ── Lightbox ──
  const lightbox = document.querySelector('.lightbox');
  const lightboxImg = document.querySelector('.lightbox img');
  if (lightbox && lightboxImg) {
    document.querySelectorAll('[data-lightbox]').forEach(el => {
      el.addEventListener('click', () => {
        lightboxImg.src = el.dataset.lightbox || el.querySelector('img')?.src || '';
        lightbox.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    const closeBtn = document.querySelector('.lightbox-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        lightbox.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ── Multi-step Form ──
  const steps = document.querySelectorAll('.form-step');
  const stepDots = document.querySelectorAll('.form-step-dot');
  let currentStep = 0;

  function goToStep(n) {
    steps.forEach(s => s.style.display = 'none');
    stepDots.forEach(d => d.classList.remove('active'));
    if (steps[n]) steps[n].style.display = 'block';
    for (let i = 0; i <= n; i++) {
      if (stepDots[i]) stepDots[i].classList.add('active');
    }
    currentStep = n;
  }

  if (steps.length > 0) goToStep(0);

  document.querySelectorAll('[data-next-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < steps.length - 1) goToStep(currentStep + 1);
    });
  });

  document.querySelectorAll('[data-prev-step]').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 0) goToStep(currentStep - 1);
    });
  });

  // ── WhatsApp pre-fill ──
  const waLinks = document.querySelectorAll('[data-whatsapp]');
  waLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const num = '14379871237';
      const msg = encodeURIComponent(link.dataset.whatsapp || 'Hi The Cake Dudes! I\'d like to inquire about a custom cake. 🎂');
      window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
    });
  });

  // ── Form Submit — gather WhatsApp message ──
  const orderForm = document.querySelector('#order-form');
  if (orderForm) {
    const waSubmit = document.querySelector('#wa-submit');
    if (waSubmit) {
      waSubmit.addEventListener('click', e => {
        e.preventDefault();
        const name = orderForm.querySelector('[name="name"]')?.value || '';
        const event = orderForm.querySelector('[name="event_type"]')?.value || '';
        const date = orderForm.querySelector('[name="event_date"]')?.value || '';
        const flavour = orderForm.querySelector('[name="flavour"]')?.value || '';
        const notes = orderForm.querySelector('[name="notes"]')?.value || '';
        const num = '14379871237';
        const msg = encodeURIComponent(
          `Hi The Cake Dudes! I'd like to order a custom cake. 🎂\n\nName: ${name}\nEvent: ${event}\nDate: ${date}\nFlavour: ${flavour}\nNotes: ${notes}`
        );
        window.open(`https://wa.me/${num}?text=${msg}`, '_blank');
      });
    }

    orderForm.addEventListener('submit', e => {
      e.preventDefault();
      const successMsg = document.querySelector('#form-success');
      if (successMsg) {
        successMsg.style.display = 'block';
        orderForm.style.display = 'none';
      }
    });
  }

  // ── Counter animation ──
  const counters = document.querySelectorAll('[data-count]');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.count);
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current) + (el.dataset.suffix || '');
        }, 16);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // ── Parallax on hero ──
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      if (scrolled < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrolled * 0.25}px)`;
      }
    }, { passive: true });
  }

  // ── Smooth active nav link highlight ──
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');
  if (sections.length > 0) {
    window.addEventListener('scroll', () => {
      let current = '';
      sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
      });
      navAnchors.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
      });
    }, { passive: true });
  }

});

// ── Utility: open WhatsApp globally ──
function openWhatsApp(msg) {
  const num = '14379871237';
  const text = encodeURIComponent(msg || 'Hi The Cake Dudes! I\'d like to order a custom cake. 🎂');
  window.open(`https://wa.me/${num}?text=${text}`, '_blank');
}

// ── Utility: navigate pages ──
function goTo(page) {
  window.location.href = page;
}
