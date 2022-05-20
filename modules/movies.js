'use strict';

const axios = require('axios');


async function getMovies (request, response, next) {
  try {
    let cityName = request.query.city;
    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;
    let movieResults = await axios.get(movieURL);
    let resultsToSend = movieResults.data.results.map(movieDetails => new Movie(movieDetails))
    response.status(200).send(resultsToSend);
  } catch (error) {
    next(error);
  }
}

class Movie {
  constructor(movieObject) {
    this.title = movieObject.title;
    this.overview = movieObject.overview;
    this.vote_average = movieObject.vote_average;
    this.vote_count = movieObject.vote_count;
    this.popularity = movieObject.popularity;
    this.release_date = movieObject.release_date;
    this.poster_path = movieObject.poster_path ? 'https://image.tmdb.org/t/p/w500' + movieObject.poster_path : '';
  }
}

module.exports = getMovies;