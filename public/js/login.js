const loginForm = document.getElementById('loginForm');

// If on login page, process and send login info to server
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('inputUserName').value.trim();
    const password = document.getElementById('inputPassword').value.trim();

    if (name && password) {
      const sendUser = await fetch(`/api/user/login`, {
        method: 'POST',
        body: JSON.stringify({ name, password }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (sendUser.ok) {
        document.location.replace('/');
      } else {
        alert('Invalid User Name or Password');
      }
    }
  });
}
