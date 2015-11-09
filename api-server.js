/**
 * This array of pokemon will be used to store initial data into our mongodb
 */
var pokemon = [
  {
    name: 'Pikachu',
    avatarUrl: 'http://rs795.pbsrc.com/albums/yy232/PixKaruumi/Pokemon%20Pixels/Pikachu_Icon__free__by_Aminako.gif~c200',
  },
  {
    name: 'Charmander',
    avatarUrl: 'http://24.media.tumblr.com/tumblr_ma0tijLFPg1rfjowdo1_500.gif',
  },
  {
    name: 'Mew',
    avatarUrl: 'http://media3.giphy.com/media/J5JrPT8r1xGda/giphy.gif',
  },
  {
    name: 'Cubone',
    avatarUrl: 'http://rs1169.pbsrc.com/albums/r511/nthndo/tumblr_ljsx6dPMNm1qii50go1_400.gif~c200',
  },
  {
    name: 'Cleffa',
    avatarUrl: 'http://media1.giphy.com/media/pTh2K2xTJ1nag/giphy.gif',
  },
  {
    name: 'Gengar',
    avatarUrl: 'https://s-media-cache-ak0.pinimg.com/originals/7e/3b/67/7e3b67c53469cc4302035be70a7f2d60.gif',
  }
];

var NODE_PORT = 4000
var EXPRESS_PORT = 5000

var http = require('http');
var url = require('url');
var fs = require('fs');
var ROOT_DIR = "src/";

http.createServer(function (req, res) {
  var urlObj = url.parse(req.url, true, false);

  if (urlObj.pathname === '/pokemon') {

    res.writeHead(200);
    res.end(JSON.stringify(pokemon));

  } else {

    /**
     * Here is where we return all requests for files in our 'src' directory
     */
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
  }

}).listen(NODE_PORT);

console.log('http node server is now running on port: ' + NODE_PORT)

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(express.static('src'));

app.get('/pokemon', function (request, response) {
  response.send(pokemon);
})

app.post('/pokemon', function (request, response) {
  pokemon = pokemon.concat({avatarUrl: request.body.url})
  response.send(pokemon);
})

app.listen(EXPRESS_PORT, function () {
  console.log('express server is now running on port: ' + EXPRESS_PORT)
})
