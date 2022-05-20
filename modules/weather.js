'use strict';

const axios = require('axios');

async function getWeather (request, response, next) {
  try {
    let lat = request.query.lat;
    let lon = request.query.lon;
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=7&lat=${lat}&lon=${lon}`;
    let results = await axios.get(url);
    let dataToSend = results.data.data.map(day => new Forecast(day))
    response.status(200).send(dataToSend);
  } catch (error) {
    next(error);
  }
}

class Forecast {
  constructor(weatherObject) {
    this.datetime = weatherObject.datetime;
    this.description = weatherObject.weather.description;
  }
}

module.exports = getWeather;