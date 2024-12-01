import AuthService from '../utils/authService.js';

document.addEventListener("DOMContentLoaded", () => {
    const watchlist = new Watchlist();
    const userId = 1;  
    const movieListContainer = document.getElementById("movie-list");


    const userWatchlist = watchlist.watchlist.filter(item => item.user_id === userId);

    // Add movies in watchlist
    userWatchlist.forEach((movie) => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        movieCard.innerHTML = `
            <p>Movie ID: ${movie.movie_id}</p>
            <p>Added on: ${movie.added_date}</p>
            <button onclick="removeFromList('${movie.movie_id}')">Remove</button>
        `;
        movieListContainer.appendChild(movieCard);
    });
});

function removeFromList(movieId) {
    // Logic to remove from the watchlist
    const userId = 1;  // Use the correct user ID here
    const watchlist = new Watchlist();
    watchlist.removeFromWatchlist(userId, movieId);
    location.reload(); // Refresh the page to reflect changes
}
