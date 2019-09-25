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
var searchItem = process.argv.slice(3).join("+");

// console.log(inputString)


// -------------- Concert This Function -----------------------
function concertThis() {
    axios.get("https://rest.bandsintown.com/artists/" + searchItem + "/events?app_id=codingbootcamp").then(function (resp) {
        //console.log(resp.data);
        console.log("Next Concert: " + moment(resp.data[0].datetime).format("dddd, MMMM Do YYYY, h:mm:a"));
        console.log("Venue: " + resp.data[0].venue.name)
        console.log("Location: " + resp.data[0].venue.city + ", " + resp.data[0].venue.country)
    })
        .catch(function (err) {
            console.log(err);
        })
}
// ------------------------------------------------------



// -------------- Spotify This Function -----------------------
function spotifyThis() {
    spotify.search({ type: 'track', query: searchItem }).then(function (resp) {
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
}
// ------------------------------------------------------



// -------------- Movie This Function -----------------------
function movieThis() {

    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + searchItem + "&type=movie").then(function (resp) {
        //console.log(resp.data);
        console.log("Movie Title: " + resp.data.Title)
        console.log("Year: " + resp.data.Year)
        console.log("IMDB Rating: " + resp.data.Ratings[0].Value)
        console.log("Rotten Tomatoes Rating: " + resp.data.Ratings[1].Value)
        console.log("Country: " + resp.data.Country)
        console.log("Language(s): " + resp.data.Language)
        console.log("Plot: " + resp.data.Plot)
        console.log("Actors: " + resp.data.Actors)

    })
        .catch(function (err) {
            console.log(err);
        })

}
// ------------------------------------------------------


// -------------- Do What It Says Function -----------------------
function doWhatItSays() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error);
        }

        var dataArr = data.split(",");
        userCommand = dataArr[0];
        searchItem = dataArr[1];
        if (userCommand === "concert-this") {
            concertThis();
        }
        // --------------- Check for Spotify Action --------------
        else if (userCommand === "spotify-this-song") {
            spotifyThis();
            // ------------------ Checks for Movie Action ---------------
        } else if (userCommand === "movie-this") {
            movieThis();
        }

    })
}
//---------------------------------------------------------------------


// -------------------------- START EXECUTIION -----------------------
// ------------- Checks to see Which operation was Called -------------
// --------------------------------------------------------------------

switch (userCommand) {
    case "concert-this":
        concertThis();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhatItSays();
        break;
}
