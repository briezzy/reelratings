import ApiService from './apiService.js';
import AuthService from './authService.js';

document.addEventListener('DOMContentLoaded', async () => {
    const searchForm = document.querySelector('.search-section form');
    const moviesGrid = document.querySelector('.movies-grid');

    // Load trending movies initially
    try {
        const trendingMovies = await ApiService.getTrendingMovies();
        displayMovies(trendingMovies);
    } catch (error) {
        console.error('Error loading trending movies:', error);
        moviesGrid.innerHTML = '<p>Error loading movies.</p>';
    }

    // Handle search
    searchForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchTerm = document.querySelector('.search-bar').value;

        try {
            const results = await ApiService.searchMovies(searchTerm);
            displayMovies(results);
        } catch (error) {
            console.error('Search error:', error);
            moviesGrid.innerHTML = '<p>Error performing search.</p>';
        }
    });

    function displayMovies(movies) {
        moviesGrid.innerHTML = '';
        
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('movie-card');
            
            const addButton = AuthService.isAuthenticated() 
                ? `<button onclick="addToList(${movie.id})">Add to List</button>`
                : '';

            movieCard.innerHTML = `
                <h3>${movie.title}</h3>
                <p>${movie.description || ''}</p>
                ${addButton}
            `;
            moviesGrid.appendChild(movieCard);
        });
    }

    // Function to add movie to user's list
    window.addToList = async (movieId) => {
        if (!AuthService.isAuthenticated()) {
            window.location.href = '/login.html';
            return;
        }

        const userId = AuthService.getUser().id;
        
        try {
            await ApiService.addToMovieList(userId, movieId);
            alert('Movie added to your list!');
        } catch (error) {
            console.error('Error adding movie:', error);
            alert('Failed to add movie to list');
        }
    };
});