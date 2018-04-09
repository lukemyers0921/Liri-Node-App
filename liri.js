require("dotenv").config();
var fs = require("fs");
var keys = require("./key.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
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
if(process.argv[2] == "do-what-it-says"){
fs.readFile("random.txt", "utf8", function(error, data) {
    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    command = dataArr[0];
    title = dataArr[1];
    homework();
  });
} else {
    homework();
}
function tweetGrab(){
    var params = {
        q: 'throwawayalias2',
        count: 20,
      }
    client.get('search/tweets', params, function(error, data, response) {
        
        for(i = 0; i < data.statuses.length; i++){
            console.log(`
        ${data.statuses[i].created_at}
        ${data.statuses[i].text}
        `);
        }
     });
}
function songGrab(){
    if(title == false){
        title = "The sign Ace of Base"
    }
    spotify.search({ type: 'track', query: title, limit: 1}, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
       var artists = "";
       for(i = 0; i < data.tracks.items[0].artists.length; i++){
          artists += data.tracks.items[0].artists[i].name + ", ";
       }
    console.log(`
       Artist(s): ${artists}
       Title: ${data.tracks.items[0].name}
       Link: ${data.tracks.items[0].external_urls.spotify}
       Album: ${data.tracks.items[0].album.name}
    `)
      });
}
function movieGrab() {
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
}
function homework(){
if (command === "my-tweets") {
    tweetGrab();
} else if (command === "spotify-this-song") {
    songGrab();
} else if (command === "movie-this") {
    movieGrab();
} else if(command === "do-what-it-says"){

} else {
    console.log("Empty/Unknown command.")
}
}