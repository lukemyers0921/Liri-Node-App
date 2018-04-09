require("dotenv").config();
var keys = require("./key.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var command = process.argv[2];
var title = process.argv[3];

if(process.argv[2] === "my-tweets") {
    console.log("My Tweets");
} else if(process.argv[2] === "spotify-this-song") {
    console.log(title);
} else if(process.argv[2] === "movie-this") {
    var queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
    request(queryUrl, function(error, response, body) {

        // If the request is successful
        if (!error && response.statusCode === 200) {
      
          // Parse the body of the site and recover just the imdbRating
          // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
          console.log("Release Year: " + JSON.parse(body).Year);
        }
      });
} else if(process.argv[2] === "do-what-it-says") {
    console.log("do what it says");
} else {
    console.log("Empty/Unknown command.")
}
