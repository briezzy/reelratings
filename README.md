# ReelRatings

ReelRatings is a web application that allows users to rate movies, comment on others' ratings, 
and manage a personalized watchlist. Inspired by the popular movie-rating platform, 
this project aims to provide users with a seamless experience to explore, rate, and 
discuss movies within a community of film enthusiasts.

## Table of Contents
- [Purpose](#purpose)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Folder Structure](#folder-structure)
- [Team Members](#team-members)
- [License](#license)

## Purpose

The purpose of ReelRatings is to create an engaging movie rating platform where users can:
- Rate movies and write reviews.
- Comment on and interact with other users' ratings and reviews.
- Maintain a watchlist of movies they wish to view.
- Follow other users and keep track of their ratings and reviews.

## Features

- **User Authentication**: Register, log in, and manage user profiles.
- **Movie Ratings**: Rate movies on a scale, write reviews, and view aggregate ratings.
- **Commenting**: Interact with other users by commenting on reviews.
- **Watchlist**: Save movies to a watchlist for easy access.
- **Social Features**: Follow other users to see their ratings and reviews in one place.

## Technologies Used

- **Frontend**: Vue.js, HTML/CSS.
- **Backend**: Node.js, Express.js, TMDb/OMDb API.
- **Database**: MySQL, Python.
- **Deployment**: GitHub.

## Setup Instructions

To get the project running locally, follow these steps:

1. **Clone the repository**:
   git clone https://github.com/yourusername/reelratings.git
   cd ReelRatings

## Folder Structure

/client: Holds all frontend code.
  ## All folders and code will be in this main client folder.

/server: Contains backend code.
  /controllers: Functions to handle API requests (e.g., UserController, MovieController).
  /models: Database models (e.g., User.js, Movie.js, Comment.js).
  /routes: Define API endpoints (e.g., userRoutes.js, movieRoutes.js).
  /middleware: Custom middleware functions (e.g., authentication).
  /config: Configuration files (e.g., database configuration).
  /utils: Utility functions/helpers for the backend.

/database: Database setup scripts, migrations, and seed data.
  ## All folders and code will be in this main database folder.

/tests: Testing files for both frontend and backend.
  /client: Frontend test files.
  /server: Backend test files.


## Team Members
  Chad Smith: Backend Development
  Shrijan Regmi: Frontend Development
  Brigiter Protazi: Scrum Master, Backend development
  Arunvir Sekhon: Assisting in Frontend Development
