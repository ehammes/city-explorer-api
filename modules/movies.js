'use strict';

const axios = require('axios');

let cache = {};

async function getMovies(request, response, next) {
  try {
    let cityName = request.query.city;

    let key = cityName + 'Data';

    let timeOkToCache = 1000 * 60 * 60 * 24 * 30;
    // let timeOkToCacheForTest = 1000 * 20;
    if (cache[key] && (Date.now() - cache[key].timestamp < timeOkToCache)) {
      console.log('you made this request already!')
      response.send(cache[key].data);
    } else {
      console.log('this is a new request')
      let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;
      let movieResults = await axios.get(movieURL);
      let resultsToSend = movieResults.data.results.map(movieDetails => new Movie(movieDetails))

      cache[key] = {
        data: resultsToSend,
        timestamp: Date.now()
      }
      response.status(200).send(resultsToSend);
    }
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