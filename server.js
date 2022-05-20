'use strict';

// REQUIRE
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const getMovies = require ('./modules/movies')
const getWeather = require ('./modules/weather')


// USE
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (request, response) => {
  response.send('hello from the server')
});

app.get('/weather', getWeather);

app.get('/movies', getMovies);

//catch all star route
app.get('*', (request, response) => {
  response.status(404).send('The request could not be found')
});

// ERRORS
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
})

// CLASSES




// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));