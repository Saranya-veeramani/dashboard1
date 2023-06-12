const mongoose = require("mongoose");

// Define the movie schema
const MovieSchema = new mongoose.Schema({
  
    "title": String,
    "description":String,
        "genre": [String],
        "casts": [String],
          "imdbrating": Number,
        "imdbid": String,
    
    
});



const Movie = mongoose.model("Movie", MovieSchema);

module.exports = Movie;
