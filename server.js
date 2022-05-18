'use strict';

console.log('first server');

// REQUIRE
const express = require('express');

let data = require('./data/weather.json');

const cors = require('cors');

require('dotenv').config();

// USE
const app = express();

app.use(cors());

const PORT = process.env.PORT || 3002;

// ROUTES
// app.get('/', (request, response) => {
//   response.send('hello from the server')
// });

// app.get('/hello', (request, response) => {
//   let firstName = request.query.name;
//   let lastName = request.query.lastName;
//   response.send(`hello! ${firstName} ${lastName}`);
// });

///**check this to pull in data on weather */
app.get('/weather', (request, response) => {
  let cityData = request.query.city;
  //find only returns one object
  let selectedLocation = data.find(city => city.city_name.toLowerCase() === cityData.toLowerCase());
  let dataToSend = selectedLocation.data.map(day => new Forecast(day))
  response.send(dataToSend);
  console.log(dataToSend);
});

//catch all star route
app.get('*', (request, response) => {
  response.send('The request could not be found')
});

// ERRORS

// CLASSES
class Forecast {
  constructor(weatherObject) {
    this.datetime = weatherObject.datetime;
    this.description = weatherObject.weather.description;
  }
}

// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));