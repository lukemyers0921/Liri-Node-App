require("dotenv").config();
var keys = require("./key.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var command = process.argv[2];
var nodeArgs = process.argv;
var title = "";
for (var i = 3; i < nodeArgs.length; i++) {

    if (i > 3 && i < nodeArgs.length) {

        title = title + "+" + nodeArgs[i];

    }

    else {

        title += nodeArgs[i];

    }
}

if (process.argv[2] === "my-tweets") {
    console.log("My Tweets");
} else if (process.argv[2] === "spotify-this-song") {
    console.log(title);
} else if (process.argv[2] === "movie-this") {
    var queryUrl;
    var mrNobody = "";
    if (title) {
        queryUrl = "http://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=trilogy";
    } else {
        queryUrl = "http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy";
        mrNobody = `
            If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
            It's on Netflix!
    `
    }
    request(queryUrl, function (error, response, body) {
        // If the request is successful
        if (!error && response.statusCode === 200) {
            console.log(`
                Title: ${JSON.parse(body).Title}
                Relase Date: ${JSON.parse(body).Released}
                IMBD Rating: ${JSON.parse(body).imdbRating}
                Rotten Tomatoes: ${JSON.parse(body).Ratings[1].Value}
                Country: ${JSON.parse(body).Country}
                Language(s): ${JSON.parse(body).Language}
                Plot: ${JSON.parse(body).Plot}
                Cast: ${JSON.parse(body).Actors}
                ` + mrNobody);

        }
    });
} else if (process.argv[2] === "do-what-it-says") {
    console.log("do what it says");
} else {
    console.log("Empty/Unknown command.")
}
