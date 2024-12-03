import ApiService from './apiService.js';

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('form');
    const errorMessage = document.getElementById('errorMessage');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await ApiService.register({ username, email, password });
            // Successful registration
            window.location.href = '/login.html'; // Redirect to login
        } catch (error) {
            // Show error message
            errorMessage.style.display = 'block';
            errorMessage.textContent = error.message || 'Registration failed';
        }
    });
});