'use strict';

console.log('first server');

// REQUIRE
const express = require('express');

let data = require ('./data/weather.json');

require('dotenv').config();

// USE
const app = express();

//***Add cors */

const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (request, response) => {
  response.send('hello from the server')
});

app.get('/hello', (request, response) => {
  let firstName = request.query.name;
  let lastName = request.query.lastName;
  response.send(`hello! ${firstName} ${lastName}`);
});

///**check this to pull in data on weather */
app.get('/weather', (request, response) => {

  //find only returns one object
  let dataToSend = 'hello!';
  response.send(dataToSend);
});

//catch all star route
app.get('*', (request, response) => {
  response.send('The request could not be found')
});

// ERRORS

// CLASSES
///***Revisit this */
// class Weather {
//   constructor(weatherObject) {
//     this.city = weatherObject
//   }
// }

// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));