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
        var nextConcert = moment(resp.data[0].datetime).format("dddd, MMMM Do YYYY, h:mm:a");
        var venue = resp.data[0].venue.name;
        var location = resp.data[0].venue.city +", "+resp.data[0].venue.country
        var concertInfo = "Next Concert: " + nextConcert + "\nVenue: " + venue + "\nLocation: " + location +"\n---------\n";

        console.log(concertInfo);

        fs.appendFile("log.txt", concertInfo, function(err){
            if (err) throw err;
            console.log ("Concert Info Added to File")
        } )
    })
        .catch(function (err) {
            console.log(err);
        })
}
// ------------------------------------------------------



// -------------- Spotify This Function -----------------------
function spotifyThis() {
    if (!searchItem){
        searchItem = "The+Sign";
    }
  
    spotify.search({ type: 'track', query: searchItem }).then(function (resp) {
        var album = resp.tracks.items[0].album.name;
        var songArtist = resp.tracks.items[0].album.artists[0].name;
        var songTitle = resp.tracks.items[0].name;
        var songUrl = resp.tracks.items[0].external_urls.spotify;
        var songInfo = "Song: " + songTitle + "\nArtist: " + songArtist + "\nAlbum: " + album + "\nListen: " + songUrl + "\n---------\n";

        console.log(songInfo); 
        

        fs.appendFile("log.txt", songInfo, function(err){
            if (err) throw err;
            console.log ("Song Info Added to File")
        } )

    }).catch(function (err) {
        console.log(err);
    })
}
// ------------------------------------------------------



// -------------- Movie This Function -----------------------
function movieThis() {

    if (!searchItem){
        searchItem = "Mr.Nobody";
    }

    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + searchItem + "&type=movie").then(function (resp) {
         var movieTitle = resp.data.Title;
         var movieYear = resp.data.Year;
         var imdbRating = resp.data.Ratings[0].Value;
         var rtRating = resp.data.Ratings[1].Value;
         var movCountry = resp.data.Country;
         var movLang = resp.data.Language;
         var moviePlot = resp.data.Plot;
         var actors = resp.data.Actors;

        var movieInfo = "Movie Title: " + movieTitle + "\nYear: " + movieYear + "\nIMDB Rating: " + imdbRating + "\nRotten Tomatoes: " + rtRating + "\nCountry: " + movCountry + "\nLanguage: " + movLang + "\nActors: " + actors + "\nPlot: " + moviePlot +"\n---------\n";

        console.log(movieInfo);

        fs.appendFile("log.txt", movieInfo, function(err){
            if (err) throw err;
            console.log ("Movie Info Added to File")
        } )

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
