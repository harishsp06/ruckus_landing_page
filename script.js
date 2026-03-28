/* ─────────────────────────────────────────────────────────────
   RUCKUS — Landing Page Scripts
   ───────────────────────────────────────────────────────────── */

/* ── 1. Smooth Scroll ───────────────────────────────────────── */
document.querySelectorAll('.js-smooth-scroll').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    const target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── 2. Scroll-triggered animations (IntersectionObserver) ─── */
const animatedEls = document.querySelectorAll('[data-animate]');

// Assign stagger delays before observing
animatedEls.forEach((el, index) => {
  el.style.animationDelay = `${index * 180}ms`;
});

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target); // fire once only
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px',
  }
);

animatedEls.forEach(el => observer.observe(el));

/* ── 3. Waitlist Form ───────────────────────────────────────── */
const form       = document.getElementById('waitlist-form');
const emailInput = document.getElementById('email');
const successMsg = document.getElementById('form-success');
const errorMsg   = document.getElementById('form-error');
const submitBtn  = form ? form.querySelector('[type="submit"]') : null;

// Permissive email pattern — catches obvious typos
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();

    // Reset previous state
    emailInput.classList.remove('is-invalid');
    successMsg.hidden = true;
    errorMsg.hidden   = true;

    const value = emailInput.value.trim();

    if (!EMAIL_RE.test(value)) {
      emailInput.classList.add('is-invalid');
      errorMsg.hidden = false;
      emailInput.focus();
      return;
    }

    // ── TO WIRE UP FORMSPREE: Replace this block ─────────────
    //
    // fetch('https://formspree.io/f/YOUR_FORM_ID', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json',
    //   },
    //   body: JSON.stringify({ email: value }),
    // })
    //   .then(res => {
    //     if (res.ok) {
    //       showSuccess();
    //     } else {
    //       showNetworkError();
    //     }
    //   })
    //   .catch(() => showNetworkError());
    //
    // ─────────────────────────────────────────────────────────

    // Simulated success (no backend yet)
    showSuccess();
  });
}

function showSuccess() {
  successMsg.hidden  = false;
  errorMsg.hidden    = true;
  emailInput.value   = '';
  emailInput.classList.remove('is-invalid');
  if (submitBtn) {
    submitBtn.disabled    = true;
    submitBtn.textContent = "You're In!";
  }
}

function showNetworkError() {
  errorMsg.textContent = 'Something went wrong. Please try again.';
  errorMsg.hidden      = false;
}
