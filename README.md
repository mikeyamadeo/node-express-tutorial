# node-express-tutorial
We will use expressjs, an abstraction on top of node's http library, to retrieve and post data.

We will cover:

1. getting data using expressjs
2. post data using expressjs

Before we do this, let's get up and running.

## Pre-reqs

- Node w/ npm must be installed. If that is not the case, learn how [here](https://nodejs.org/en/)

## Up and Running

##### 1. Clone repo
Make sure to clone this repository

`git clone https://github.com/mikeyamadeo/node-express-tutorial`

##### 2. Run the server
We can make sure our server is running by executing the following in the terminal

`node api-server.js`

If we go to port 4000 and the index.html endpoint we should see the `pokemon gif app`. If you are using your local machine you would go to [http://localhost:4000/index.html](http://localhost:4000/index.html)

Note: adding a pokemon gif will not work

## Setup an express server

##### 1. Install express

First things first, let's be sure we install express from npm. Run the following in your terminal.

`npm install`

This looks at the `dependencies` listened in the `package.json` file and installs them.

##### 2. Setup express server to serve static files

Remember this craziness? Any idea what it did? That voo-doo magic was telling the server to read the static files (index.html, styl.css, pokeball-tiny.png) in the `src` (ROOT_DIR) directory and send that data back.
```js
    fs.readFile(ROOT_DIR + urlObj.pathname, function (err, data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.writeHead(200);
      res.end(data);
    });
```

Express makes it much easier to do this. 

```js
// this is how we get and express 'app' instance to use in setting up a server
var express = require('express');
var app = express();

// This tells express to serve static files found in the src directory
app.use(express.static('src'));

// start the server listening to the port # assigned to EXPRESS_PORT
app.listen(EXPRESS_PORT, function () {
  console.log('express server is now running on port: ' + EXPRESS_PORT)
})
```

Now if we run `node api-server.js` again and go to port 5000 ([http://localhost:5000/](http://localhost:5000/) on local machine) we should expect to see the `pokemon gif app` we saw before but with no pokemon gifs. Notice we don't need to be at the `index.html` endpoint. Express is smart enought to check index.html by default.

Note: it's ok to have a server running on two different ports, which will be the case if you choose not to delete your server built with node's http module.

##### 3. Set up a `/pokemon` endpoint that returns the pokemon data

instead of parsing request urls and setting up an if statement for every endpoint we want to add like this:

```js
var urlObj = url.parse(req.url, true, false);

  if (urlObj.pathname === '/pokemon') {

    res.writeHead(200);
    res.end(JSON.stringify(pokemon));

  }
```

The syntax for setting up our `get` pokemon endpoint is as follows:

```js
app.get('/pokemon', function (request, response) {
  response.send(pokemon);
})
```

Notice we didn't have to JSON.stringify our pokemon array. Express is smart enough to figure that out for us.

With our express server code looking like this:

```js
var express = require('express');
var app = express();

app.use(express.static('src'));

app.get('/pokemon', function (request, response) {
  response.send(JSON.stringify(pokemon));
})

app.listen(EXPRESS_PORT, function () {
  console.log('express server is now running on port: ' + EXPRESS_PORT)
})
```
Running `node api-server.js` again... We should expect to see our `pokemon gif app` showing pokemon gifs now.

## Enable the POSTing of pokemon gifs

Lastly let's get the `ADD POKEMON GIF` button working. This will require us to add a `POST` endpoint which express makes nice and easy. The code for this will look as follows:

```js
app.post('/pokemon', function (request, response) {
  pokemon = pokemon.concat({avatarUrl: request.body.url})
  response.send(pokemon);
})
```

If we try to add a gif url though, we are going to have problems, because right now `request.body` isn't going to exist. We need to teach express how to parse the body of a request. The following code will do that:

```js
var bodyParser = require('body-parser');

app.use(bodyParser.json());
```

body-parser is specified as a dependency in our package.json and was installed along with express. After requiring it as a variable, we then we tell it to use body-parser to parse the 'body' or a request (the data being POSTed to us which in our case is the gif url).

Our express server should now look something like this:

```js
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
```
If we try to add a valid gif url from our app, we should now see it added to the pokemon gifs.



## Closing

We should see how nice express makes setting up a server, especially as the number of endpoints we need continue to grow.

if you got stuck, you can switch to the answer branch to see what the app should look like

`git checkout answer`



