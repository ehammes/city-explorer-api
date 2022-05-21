'use strict';

const axios = require('axios');
// let cache = require('./cache.js');

let cache = {};

async function getWeather(request, response) {
  let lat = request.query.lat;
  let lon = request.query.lon;
  let key = 'weather-' + lat + lon;

  let catcheTime = 1000 * 60 * 60 * 24 * 30;
  if (cache[key] && (Date.now() - cache[key].timestamp < catcheTime)) {
    console.log('Cache hit');
    response.send(cache[key].data);
  } else {
    console.log('Cache miss');
    const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${lat}&lon=${lon}&days=5`;
    let weatherDataToSend = await axios.get(url);
    response.send(response => parseWeather(response.data));

    cache[key] = {
      data: weatherSummaries,
      timestamp: Date.now()
    }
  }
}

function parseWeather(weatherData) {
  try {
    let weatherSummaries = weatherData.data.map(day => {
     new Forecast(day)
    });
    return Promise.resolve(weatherSummaries);
  } catch (e) {
    return Promise.reject(e);
  }
}

class Forecast {
  constructor(weatherObject) {
    this.forecast = weatherObject.weather.description;
    this.time = weatherObject.datetime;
  }
}

module.exports = getWeather;
