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
if (userCommand === "concert-this") {
    var artist = process.argv.slice(3).join("+");
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(function (resp) {
        //console.log(resp.data);
        console.log("Next Concert: " + moment(resp.data[0].datetime).format("dddd, MMMM Do YYYY, h:mm:a"));
        console.log("Venue: " + resp.data[0].venue.name)
        console.log("Location: " + resp.data[0].venue.city + ", " + resp.data[0].venue.country)
    }).catch(function (err) {
        console.log(err);
    })
}
else if (userCommand === "spotify-this-song") {
    var song = process.argv.slice(3).join("+");
    spotify.search({ type: 'track', query: song }).then(function (resp) {
        var album = resp.tracks.items[0].album.name;
        var songArtist = resp.tracks.items[0].album.artists[0].name
        console.log ( )
        console.log("Performing Artist: " + songArtist)
        console.log("From their Album: " + album);
    })
}