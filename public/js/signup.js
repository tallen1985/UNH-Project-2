const signupForm = document.getElementById('signupForm');

// If on signup page, send to signup route
signupForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('inputUserName').value.trim();
  const password = document.getElementById('inputPassword').value.trim();
  const confirmPassword = document
    .getElementById('confirmPassword')
    .value.trim();

  if (password !== confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  const sendUser = await fetch(`/api/user/signup`, {
    method: 'POST',
    body: JSON.stringify({ name, password }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (sendUser.ok) {
    document.location.replace('/');
  } else {
    alert('Invalid User Name or Password');
  }
});
