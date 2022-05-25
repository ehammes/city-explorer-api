'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const getWeather = require ('./modules/weather')
const getMovies = require ('./modules/movies')

// USE
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3001;

// ROUTES
app.get('/', (request, response) => {
  response.send('hello from the server!')
});

app.get('/weather', weatherHandler);

app.get('/movies', getMovies);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  // console.log(lat);
  getWeather(lat, lon)
    .then(summaries => response.status(200).send(summaries))
    .catch((error) => {
    console.error(error);
    response.status(500).send('Sorry. Something went wrong!')
  });
}  

//catch all star route
app.get('*', (request, response) => {
  response.status(404).send('The request could not be found')
});

// ERRORS
app.use((error, request, response) => {
  response.status(500).send(error.message);
})

app.listen(process.env.PORT, () => console.log(`Server up on ${process.env.PORT}`));