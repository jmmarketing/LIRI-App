require("dotenv").config();


// ------------- Required Modules ------------
var keys = require("./keys.js");
var axios = require("axios")
var spotify = new Spotify(keys.spotify);
var fs = require("fs");
var moment = require("moment");