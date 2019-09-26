# LIRI-App
UCSD - Homework 8 - LIRI App. Like SIRI, but for Written Commands. 
Video Example of How It Works: https://youtu.be/ice9kJATnGM

# Purpose: 
The Liri app is a practice project to become better familiarized with using Node to run javascript files. In this project we practice running API calls with Axios, the Node Spotify API, moment.js NPM, and the FileSave NPM. 

# How It Works:
After opening your Terminal and running Node, you will want to run an 'npm install' to get all packages we use. After install, there are four(4) different commands you can run:
  1. "concert-this" - Using the concert-this command plus an artist, you will be kicked back the infromation for the next upcoming concert. 
    Example: 'node liri.js concert-this van morrision' 
    Output: 
      Next Concert: Wednesday, October 2nd 2019, 7:00:pm
      Venue: Grand Sierra Resort and Casino
      Location: Reno, United States

  2. "spotify-this-song" - Using the spotify-this-song command plus a song, you will be kicked back the infromation for that song. 
    Example: 'node liri.js spotify-this-song into the mystic' 
    Output: 
      Song: Into the Mystic - 2013 Remaster
      Artist: Van Morrison
      Album: Moondance
      Listen: https://open.spotify.com/track/3lh3iiiJeiBXHSZw6u0kh6
      
  3. "movie-this" - Using the movie-this command plus a movie, you will be kicked back the infromation for that movie. 
    Example: 'node liri.js movie-this the goonies'  
    Output: 
      Movie Title: The Goonies
      Year: 1985
      IMDB Rating: 7.8/10
      Rotten Tomatoes: 71%
      Country: USA
      Language: English, Spanish, Cantonese, Italian
      Actors: Sean Astin, Josh Brolin, Jeff Cohen, Corey Feldman
      Plot: A group of young misfits who call themselves The Goonies discover an ancient map and set out on a quest to find a legendary               pirate's long-lost treasure.
    
   4. "do-what-it-says" - Using this command, the app will look at the random.txt file and run the command that is documented. Depending      on the command, you will get a response that looks like one of the above. 
   
  # Bonus
  This app has been set up to log any results. These results can be found in the log.txt file. Additionally, after a succesful search you will get the message of " XXX Info Added to File"
  
  Lastly, if you do not specificy as Movie or Song, you will be defaulted to the movie "Mr.Nobody" and the song "The Sign"
  
  # Modules Used:
  - axios
  - node-spotify-api
  - FileSave (fs)
  - Moment.js
  
  # APIs Used:
  - Bands In Town
  - Spotify
  - OMDB
