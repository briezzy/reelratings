import AuthService from './authService.js';

// Add this script to pages that require authentication
export function requireAuth() {
  if (!AuthService.isAuthenticated()) {
    window.location.href = '/login.html';
    return false;
  }
  return true;
}

// Add this to pages to update UI based on auth state
export function updateAuthUI() {
  const authButtons = document.querySelector('.auth-buttons');
  if (authButtons) {
    if (AuthService.isAuthenticated()) {
      const user = AuthService.getUser();
      authButtons.innerHTML = `
        <span class="username">${user.username}</span>
        <button onclick="handleLogout()" class="btn">Logout</button>
      `;
    } else {
      authButtons.innerHTML = `
        <a href="login.html" class="btn signin-btn">Sign In</a>
        <a href="register.html" class="btn register-btn">Register</a>
      `;
    }
  }
}

// Global logout handler
window.handleLogout = () => {
  AuthService.logout();
  window.location.href = '/login.html';
};

// Call this when the page loads
document.addEventListener('DOMContentLoaded', updateAuthUI);