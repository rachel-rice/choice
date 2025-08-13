// Register
  const form = document.getElementById('registerForm');
  const messageDiv = document.getElementById('message');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const password2 = document.getElementById('password2').value;

    if (password !== password2) {
      messageDiv.innerHTML = '<p style="color:red;">Passwords do not match.</p>';
      return;
    }

    try {
      const res = await fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!data.success) {
        messageDiv.innerHTML = `<p style="color:red;">${data.message || 'Registration failed'}</p>`;
      } else {
        messageDiv.innerHTML = `<p style="color:green;">Registration successful! Redirecting to login...</p>`;
        setTimeout(() => {
          window.location.href = '/auth/login';
        }, 1500);
      }
    } catch (err) {
      messageDiv.innerHTML = `<p style="color:red;">Error: ${err.message}</p>`;
    }
  });