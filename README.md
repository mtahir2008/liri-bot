# liri-bot
# Intro: 
LIRI is like iPhone's SIRI. However, while SIRI is a Speech Interpretation and Recognition Interface, LIRI is a Language Interpretation and Recognition Interface. LIRI is a command line node app that takes in parameters and gives you back data.

Running the following commands in your terminal will make liri functional:
# node liri.js concert-this 'concert or band name'
This will show the following information about each event to your terminal/bash window:
Name of the Venue
Location of the Venue
Date of the Event
# node liri spotify-this-song 'song name'
This will show the following about the song in your terminal/bash window:
Artist(s)
Song Name
Album Name
Song Preview Link
If no song is provided then the song "The Sign" will be searched instead
# node liri.js omdb 'movie name'
This will output the following information to your terminal/bash window:
Title
Year
imdbRating
Country
Language
Plot
Actors
RottenTomatoes Rating

# node liri.js do-what-it-says
The program will take the text inside of random.txt and use it to call the first command with the second part as it's parameter

