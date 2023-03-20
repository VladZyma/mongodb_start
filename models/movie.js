const {Schema, model} = require('mongoose');

const movieSchema = new Schema({
  title: {type: String, require: true},
  director: {type: String, require: true},
  year: {type: Number, require: true},
  genres: [String],
  rating: Number,
  duration: {
    hours: Number,
    minutes: Number,
  },
  reviews: [{
    name: String,
    text: String,
  }]
});

module.exports = model('Movie', movieSchema);