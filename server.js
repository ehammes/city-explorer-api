'use strict';

// REQUIRE
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
require('dotenv').config();

// USE
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (request, response) => {
  response.send('hello from the server')
});

app.get('/weather', async (request, response, next) => {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=7&lat=${lat}&lon=${lon}`;
    let results = await axios.get(url);
    let dataToSend = results.data.data.map(day => new Forecast(day))
    response.send(dataToSend);
  } catch (error) {
    next(error);
  }
});

app.get('/movies', async (request, response, next) => {
  try {
    let cityName = request.query.city;
    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${cityName}`;
    let movieResults = await axios.get(movieURL);
    // console.log(movieURL);
    let resultsToSend = movieResults.results.map(movieDetails => new Movie(movieDetails))
    response.send(resultsToSend);
  } catch (error) {
    next(error);
  }
});

//catch all star route
app.get('*', (request, response) => {
  response.send('The request could not be found')
});

// ERRORS
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
})

// CLASSES
class Forecast {
  constructor(weatherObject) {
    this.datetime = weatherObject.datetime;
    this.description = weatherObject.weather.description;
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
  }
}

// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));