const express = require('express');
const mongoose = require('mongoose');

const Movie = require('./models/movie');
const movieRoutes = require('./routes/movie.routes');

const PORT = 3000;
const URL = 'mongodb://localhost:27017/moviebox';

const app = express();

app.use(express.json());
app.use(movieRoutes);

mongoose
  .connect(URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.log(`Listening port ${PORT}`));

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`Listening port ${PORT}`);
});
