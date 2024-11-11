class Watchlist {
  constructor() {
    this.watchlist = [];
  }

  addToWatchlist(user_id, movie_id) {
    const added_date = new Date().toISOString().split('T')[0];
    this.watchlist.push({ user_id, movie_id, added_date });
    console.log(`Movie ${movie_id} added to user ${user_id}'s watchlist on ${added_date}.`);
  }

  removeFromWatchlist(user_id, movie_id) {
    const index = this.watchlist.findIndex(
      (entry) => entry.user_id === user_id && entry.movie_id === movie_id
    );
    if (index !== -1) {
      this.watchlist.splice(index, 1);
      console.log(`Movie ${movie_id} removed from user ${user_id}'s watchlist.`);
    } else {
      console.log(`Movie ${movie_id} not found in user ${user_id}'s watchlist.`);
    }
  }

  viewWatchlist(user_id) {
    const userWatchlist = this.watchlist.filter((entry) => entry.user_id === user_id);
    if (userWatchlist.length > 0) {
      console.log(`User ${user_id}'s Watchlist:`);
      userWatchlist.forEach((entry) => {
        console.log(`Movie ID: ${entry.movie_id}, Added on: ${entry.added_date}`);
      });
    } else {
      console.log(`User ${user_id} has no movies in the watchlist.`);
    }
  }
}