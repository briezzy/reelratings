const BASE_URL = 'http://localhost:3006/api';

class ApiService {
    //Endpoints
    static async login(credentials) {
        try {
            const response = await fetch(`${BASE_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(credentials)
            });
            
            if (!response.ok) {
                throw new Error('Login failed');
            }
            
            const data = await response.json();
            localStorage.setItem('token', data.token);
            return data;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    }

    static async register(userData) {
        console.log('Attempting to register with data:', userData);
        try {
            const response = await fetch(`${BASE_URL}/users/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });
            
            console.log('Registration response status:', response.status);
            
            if (!response.ok) {
                const errorData = await response.json();
                console.error('Registration failed:', errorData);
                throw new Error(errorData.error || 'Registration failed');
            }
            
            const data = await response.json();
            console.log('Registration successful:', data);
            return data;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    }

    // Movie endpoints
    static async getMovieList(userId) {
        try {
            const response = await fetch(`${BASE_URL}/movies/${userId}/list`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to fetch movie list');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching movie list:', error);
            throw error;
        }
    }

    static async addToMovieList(userId, movieId) {
        try {
            const response = await fetch(`${BASE_URL}/movies/${userId}/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ movieId })
            });
            
            if (!response.ok) {
                throw new Error('Failed to add movie');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error adding movie:', error);
            throw error;
        }
    }

    static async removeFromMovieList(userId, movieId) {
        try {
            const response = await fetch(`${BASE_URL}/movies/${userId}/remove/${movieId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            
            if (!response.ok) {
                throw new Error('Failed to remove movie');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error removing movie:', error);
            throw error;
        }
    }

    // Review endpoints
    static async addReview(movieId, reviewData) {
        try {
            const response = await fetch(`${BASE_URL}/reviews/${movieId}/review`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(reviewData)
            });
            
            if (!response.ok) {
                throw new Error('Failed to add review');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error adding review:', error);
            throw error;
        }
    }

    static async getMovieReviews(movieId) {
        try {
            const response = await fetch(`${BASE_URL}/reviews/${movieId}/reviews`);
            
            if (!response.ok) {
                throw new Error('Failed to fetch reviews');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error fetching reviews:', error);
            throw error;
        }
    }

    // Social endpoints
    static async followUser(userId, followUserId) {
        try {
            const response = await fetch(`${BASE_URL}/users/${userId}/follow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ followUserId })
            });
            
            if (!response.ok) {
                throw new Error('Failed to follow user');
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error following user:', error);
            throw error;
        }
    }
}

export default ApiService;