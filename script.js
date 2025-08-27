// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Simple client-side handling for Formspree success/failure UX
const form = document.getElementById('quoteForm');
const statusEl = document.getElementById('formStatus');

if (form) {
  form.addEventListener('submit', async (e) => {
    // Honeypot check
    const hp = form.querySelector('input[name="website"]');
    if (hp && hp.value) return; // bot

    e.preventDefault();
    statusEl.textContent = 'Sending...';

    const data = new FormData(form);
    try {
      const res = await fetch(form.action, { method: form.method, body: data, headers: { 'Accept': 'application/json' } });
      if (res.ok) {
        statusEl.textContent = 'Thanks—request received.';
        form.reset();
      } else {
        statusEl.textContent = 'Error sending. Try again or email us.';
      }
    } catch {
      statusEl.textContent = 'Network error. Please retry.';
    }
  });
}
