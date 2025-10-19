// Login
const form = document.getElementById('loginForm');
  const messageDiv = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
      const res = await fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!data.success) {
        messageDiv.innerHTML = `<p style="color:red;">${data.message || 'Login failed'}</p>`;
      } else {
        messageDiv.innerHTML = `<p style="color:green;">Login successful! Redirecting...</p>`;
        setTimeout(() => {
          window.location.href = '/list'; // or your home page
        }, 1000);
      }
    } catch (err) {
      messageDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
    }
  });