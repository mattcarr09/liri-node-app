//4377f707 OMBD API Key
//aWwfcHoE7wPXxjkucC1R6mXlz Twitter API Key     
//30Pl802npoFmjeb1uFxqAsMbxLwFoBFUJIoBJCRDvBgYbMMoxb Twitter Secret Key
var request = require('request');
var moment = require('moment');
var Spotify = require('node-spotify-api');
var fs = require('fs');

//ZE Twittah
var Twitter = require('twitter');
var keys = require('./keys');


if (process.argv[2]==="my-tweets") {

    var client = new Twitter(keys);
    var params = {
    screen_name : "mattcarrillo09",
    count :20,
};
//Get function provided by twitter documentation
client.get('statuses/user_timeline', params, function (error, tweets, response) {
    if (!error) {
        for (var i = 0; i < tweets.length; i++) {
            console.log(tweets[i].text);
            console.log(tweets[i].created_at);
        }
    }
});


// SPOTIFY
} else if (process.argv[2] === 'spotify-this-song') {
    var spotifySearch = process.argv[3];
    var spotify = new Spotify({
        id: '621c3052549b41519bd02dc0bee3816e',
        secret: '63339ba7b4544ec5ad1235776a44e762'
    });

    spotify.search({
        type: 'track',
        query: '\'' + spotifySearch + '\'',
        limit: 1,
    }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err); //change to ace of base
        } else {
            var info = data.tracks.items[0];
            console.log('Artist: ' + info.artists[0].name);
            console.log('Song: ' + info.name);
            console.log('Album: ' + info.album.name);
            console.log('Preview song link: ' + info.preview_url);
        }
    });

// OMDB
} else if (process.argv[2] === 'movie-this') {
    console.log('best movie ever');


// FS PACKAGE
} else if (process.argv[2] === 'do-what-it-says') {
    fs.readFile('random.txt', 'utf8', function (err, data){
        if (err) {
            return console.log(err);
        }
        console.log(data);
    })
} else {
    console.log('womp womp');
}