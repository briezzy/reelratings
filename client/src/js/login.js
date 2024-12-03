import ApiService from './apiService.js';

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('form');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await ApiService.login({ username, password });
            // Successful login
            window.location.href = '/movieList.html'; // Redirect to movie list
        } catch (error) {
            // Show error message
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Invalid username or password';
        }
    });
});