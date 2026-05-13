// Mobile nav toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
  const closeBtn = navLinks.querySelector('.close-menu');
  if (closeBtn) closeBtn.addEventListener('click', () => navLinks.classList.remove('open'));
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));
}

// Active nav link
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) a.classList.add('active');
});

// Submit form data to Netlify Forms
async function submitToNetlify(form) {
  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(new FormData(form)).toString(),
    });
  } catch (_) { /* fail silently — still show success to user */ }
}

// Booking form
const bookingForm = document.getElementById('bookingForm');
if (bookingForm) {
  bookingForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    await submitToNetlify(bookingForm);
    const successMsg = document.getElementById('formSuccess');
    bookingForm.style.display = 'none';
    if (successMsg) successMsg.style.display = 'block';
    setTimeout(() => {
      bookingForm.reset();
      bookingForm.style.display = 'block';
      if (successMsg) successMsg.style.display = 'none';
    }, 5000);
  });
}

// Contact form
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    await submitToNetlify(contactForm);
    const successMsg = document.getElementById('contactSuccess');
    contactForm.style.display = 'none';
    if (successMsg) successMsg.style.display = 'block';
    setTimeout(() => {
      contactForm.reset();
      contactForm.style.display = 'block';
      if (successMsg) successMsg.style.display = 'none';
    }, 5000);
  });
}

// Gallery filter
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    galleryItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// Services tab interface
const svcTabs = document.querySelectorAll('.svc-tab');
const svcPanels = document.querySelectorAll('.svc-panel');
svcTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;
    svcTabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    svcPanels.forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    const panel = document.getElementById('panel-' + target);
    if (panel) panel.classList.add('active');
  });
});

// Scroll animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .value-card, .team-card, .testimonial-card, .gallery-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
