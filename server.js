'use strict';

console.log('first server');

// REQUIRE
const express = require('express');
// let data = require('./data/weather.json');
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

// app.get('/hello', (request, response) => {
//   let firstName = request.query.name;
//   let lastName = request.query.lastName;
//   response.send(`hello! ${firstName} ${lastName}`);
// });


////*update with lon and lan
// app.get('/weather', async (request, response)=> {
//   // let cityData = request.query.city;
//   let lon = request.query.lon;
//   let lat = request.query.lat;
//   let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=7&lat=${lat}&lon=${lon}`;
//   let results = await axios.get(url);
//   // let selectedLocation = results.data.filter((lat, lon) => {
//   // })
//   let dataToSend = results.data.data.map(day => new Forecast(day))
//   response.send(dataToSend);
// });

app.get('/weather', (request, response, next) => {
  try {
  let cityData = request.query.city;
  //find only returns one object
  let selectedLocation = data.find(city => city.city_name.toLowerCase() === cityData.toLowerCase());
  let dataToSend = selectedLocation.data.map(day => new Forecast(day))
  response.send(dataToSend);
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

// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));