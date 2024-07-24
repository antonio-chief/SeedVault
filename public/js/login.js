document.addEventListener('DOMContentLoaded', function () {
    // Use axios for HTTP requests
    const axios = window.axios;

    document.getElementById('loginForm').addEventListener('submit', async function (e) {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await axios.get('http://127.0.0.1:8001/user/');

            if (response.status === 200) {
                const users = response.data;
                const user = users.find(user => user.UserName === username && user.UserPassword === password);

                if (user) {
                    window.location.href = 'index.html'; // Redirect to React app
                } else {
                    alert('Invalid login credentials');
                }
            } else {
                alert('Error fetching user data');
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login');
        }
    });

    document.getElementById('signupForm').addEventListener('submit', async function (e) {
        e.preventDefault();
        const username = document.getElementById('signupUsername').value;
        const email = document.getElementById('signupEmail').value;
        const password = document.getElementById('signupPassword').value;

        try {
            const response = await axios.post('http://127.0.0.1:8001/user/', {
                UserName: username,
                UserEmail: email,
                UserPassword: password,
            });

            if (response.status === 201) {
                alert('Sign up successful for ' + username);
                document.getElementById('signupSection').style.display = 'none';
                document.getElementById('loginSection').style.display = 'block';
            } else {
                alert('Sign up failed');
            }
        } catch (error) {
            console.error('Error during signup:', error);
            alert('An error occurred during signup');
        }
    });

    document.getElementById('showSignup').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('signupSection').style.display = 'block';
    });

    document.getElementById('showLogin').addEventListener('click', function (e) {
        e.preventDefault();
        document.getElementById('signupSection').style.display = 'none';
        document.getElementById('loginSection').style.display = 'block';
    });

    // Check the URL hash to see if we should show the signup section
    if (window.location.hash === '#signupSection') {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('signupSection').style.display = 'block';
    }
});
