class AuthService {
    static TOKEN_KEY = 'auth_token';
    static USER_KEY = 'user_info';
  
    // Store authentication data
    static setAuth(token, user) {
      localStorage.setItem(this.TOKEN_KEY, token);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    }
  
    // Get stored token
    static getToken() {
      return localStorage.getItem(this.TOKEN_KEY);
    }
  
    // Get stored user info
    static getUser() {
      const userStr = localStorage.getItem(this.USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    }
  
    // Check if user is authenticated
    static isAuthenticated() {
      return !!this.getToken();
    }
  
    // Clear authentication data
    static logout() {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    }
  
    // Login method
    static async login(username, password) {
      try {
        const response = await fetch('/api/users/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, password })
        });
  
        if (!response.ok) {
          throw new Error('Login failed');
        }
  
        const data = await response.json();
        this.setAuth(data.token, data.user);
        return data;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    }
  
    // Register method
    static async register(username, email, password) {
      try {
        const response = await fetch('/api/users/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username, email, password })
        });
  
        if (!response.ok) {
          throw new Error('Registration failed');
        }
  
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Registration error:', error);
        throw error;
      }
    }
  
    // Method to get authenticated fetch headers
    static getAuthHeaders() {
      const token = this.getToken();
      return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      };
    }
  
    // Method to make authenticated requests
    static async authenticatedFetch(url, options = {}) {
      const headers = this.getAuthHeaders();
      const response = await fetch(url, {
        ...options,
        headers: {
          ...headers,
          ...options.headers
        }
      });
  
      if (response.status === 401) {
        this.logout();
        window.location.href = '/login.html';
        throw new Error('Authentication expired');
      }
  
      return response;
    }
  }
  
  export default AuthService;