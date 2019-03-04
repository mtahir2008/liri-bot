var env = require("dotenv").config();

var keys = require("./keys.js");
var Spotify = require('node-spotify-api'); 
var spotify = new Spotify(keys.spotify);

var moment = require('moment');
moment().format();

var axios = require('axios'); 

var fs = require('fs');

var searchCommand = process.argv[2];
var searchValue = process.argv[3]; 

switch (searchCommand) {
    case "concert-this":
    concertThis(searchValue);
    break;
    case "spotify-this-song":
        spotifySong(searchValue);
        break;
    case "movie-this":
        movieThis(searchValue);
        break;
    case "do-what-it-says":
        doRandom();
        break;
};

// concert-this function, search for bands or concerts 
function concertThis(artist) {
    var queryUrl = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    axios.get(queryUrl).then(
        function(response) {
            if(response.data[0].venue !=  undefined) {
                console.log("Event Veunue: " + response.data[0].venue.name);
                console.log("Event Location: " + response.data[0].venue.city);
                var eventDateTime = moment(response.data[0].datetime);
                console.log("Event Date & Time: " + eventDateTime.format("dddd, MMMM Do YYYY"));
            }
            else {
                console.log("No results found.");
            }
        }
    ).catch(function (error) {
        console.log (error);
  });
}
// spotify-this-song function, search fav songs here 
function spotifySong(searchValue) {
    if(!searchValue){
        searchValue = "changes";
    }
    spotify
    .search({ type: 'track', query: searchValue })
    .then(function(response) {
        for (var i = 0; i < 5; i++) {
            var spotifyResults = 
                "--------------------------" +
                    "\nArtist(s): " + response.tracks.items[i].artists[0].name + 
                    "\nSong Name: " + response.tracks.items[i].name +
                    "\nAlbum Name: " + response.tracks.items[i].album.name +
                    "\nPreview Link: " + response.tracks.items[i].preview_url;
                    
            console.log(spotifyResults);
            // fs.appendFile("log.txt", spotifyResults);
        }
    })
    .catch(function(err) {
        console.log(err);
    });
}

// Move-this function, search for movie ratings
function movieThis(movie) {
    axios.get("http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&tomatoes=true&apikey=trilogy").then(
        function(response) {
            //console.log(response.data);
            if (response.data.Title != undefined) {
                console.log("Title: " + response.data.Title);
                console.log("Year: " + response.data.Year);
                console.log("imdbRating:: " + response.data.imdbRating);
                console.log("Title: " + response.data.Title);
                console.log("Country:: " + response.data.Country);
                console.log("Language:: " + response.data.Language);
                console.log("Plot: " + response.data.Plot);
                console.log("Actors: " + response.data.Actors);
                console.log("RottenTomatoes: " + response.data.tomatoRating);

                // store data in log.txt
                // fs.appendFile("log.txt", "Title: " + response.data.Title);
                // fs.appendFile("log.txt", "Year: " + response.data.Year);
                // fs.appendFile("log.txt", "imdbRating:: " + response.data.imdbRating);
                // fs.appendFile("log.txt", "Title: " + response.data.Title);
                // fs.appendFile("log.txt", "Country:: " + response.data.Country);
                // fs.appendFile("log.txt", "Language:: " + response.data.Language);
                // fs.appendFile("log.txt", "Plot: " + response.data.Plot);
                // fs.appendFile("log.txt", "Actors: " + response.data.Actors);
                // fs.appendFile("log.txt", "RottenTomatoes: " + response.data.tomatoRating);
            } 
            else {
                movieThis("scarface");
            };
        }
    ).catch(function (error) {  
        console.log(error);
        console.log("No Results found. ");
  });
}
// Do-what-it-says function, search using random.txt 
function doRandom() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        var dataArr = data.split(",");
        spotifySong(dataArr[1])
        if (error) {
          return console.log(error);
        }
    });
};