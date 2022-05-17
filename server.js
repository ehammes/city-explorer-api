'use strict';

console.log('first server');

const { response } = require('express');
// REQUIRE
const express = require('express');
require('dotenv').config();

// USE
const app = express();
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

//catch all star route
app.get('*', (request, response) => {
  response.send('I am what you are looking for!')
});

// ERRORS

// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));