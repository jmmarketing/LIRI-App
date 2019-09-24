// ------------- Required Modules ------------
require("dotenv").config();
var keys = require("./keys.js");
var axios = require("axios")
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var moment = require("moment");

// ------------ Global Variables ------------

var inputString = process.argv;
var userCommand = inputString[2];

// console.log(inputString)


// ------------- Checks to see Which operation was Called -------------
// ------------ Checks for Cocnert This Action--------------------
if (userCommand === "concert-this") {
    var artist = process.argv.slice(3).join("+");
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (resp) {
        //console.log(resp.data);
        console.log("Next Concert: " + moment(resp.data[0].datetime).format("dddd, MMMM Do YYYY, h:mm:a"));
        console.log("Venue: " + resp.data[0].venue.name)
        console.log("Location: " + resp.data[0].venue.city + ", " + resp.data[0].venue.country)
    })
        .catch(function (err) {
            console.log(err);
        })
}
// --------------- Check for Spotify Action --------------
else if (userCommand === "spotify-this-song") {
    var song = process.argv.slice(3).join("+");
    
    spotify.search({ type: 'track', query: song }).then(function (resp) {
        var album = resp.tracks.items[0].album.name;
        var songArtist = resp.tracks.items[0].album.artists[0].name;
        var songTitle = resp.tracks.items[0].name;
        var songUrl = resp.tracks.items[0].external_urls.spotify;

        console.log("Song: " + songTitle);
        console.log("Performing Artist: " + songArtist);
        console.log("From their Album: " + album);
        console.log("Listen: " + songUrl);
    }).catch(function (err) {
        console.log("You must specify a song")
        console.log(err);
    })

// ------------------ Checks for Movie Action ---------------
}else if (userCommand === "movie-this") {
    var movie = process.argv.slice(3).join("+");
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie + "&type=movie").then(function (resp) {
        console.log ("Movie Title: "+ resp.data.Title)
        console.log ("Year: "+ resp.data.Year)
        console.log ("IMDB Rating: "+ resp.data.Ratings[0].Value)
        console.log ("Rotten Tomatoes Rating: "+ resp.data.Ratings[1].Value)
        console.log ("Country: "+ resp.data.Country)
        console.log ("Language(s): "+ resp.data.Language)
        console.log ("Plot: "+ resp.data.Plot)
        console.log ("Actors: "+ resp.data.Actors)
    })
        .catch(function (err) {
            console.log(err);
        })
}
// ---------------------- Checsk for do What It Says Action ---------------
else if (userCommand === "do-what-it-says"){
    
}

