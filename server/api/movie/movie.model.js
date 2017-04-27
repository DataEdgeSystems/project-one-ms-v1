'use strict';

import mongoose from 'mongoose';

var MovieSchema = new mongoose.Schema({
  Title: String,
  Year: Number,
  Rated: String,
  Released: String,
  Runtime: String,
  Genre: String,
  Director: String,
  Writer: String,
  Actors: String,
  Plot: String,
  Language: String,
  Country: String,
  Poster: String,
  imdbRating: String,
  imdbID: String,
  Type: String
});


export default mongoose.model('Movie', MovieSchema);
