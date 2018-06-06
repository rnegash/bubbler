// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require("express"); // call express
var app = express(); // define our app using express
var bodyParser = require("body-parser");

var mongoose = require("mongoose");
mongoose.connect(
  // how to do with many users?
  "mongodb://bubbleruser:bubblerpw1@ds247290.mlab.com:47290/bubbler_test",
  function(err, db) {
    // If no error, successfully connected
    if (err) {
      console.log(err, db);
      console.log(mongoose.connection.readyState);
    }
    console.log(mongoose.connection.readyState);

    console.log("connection successful");
  }
); // connect to our database
var Word = require("./models/word");

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Add headers
app.use(function(req, res, next) {
  // Website you wish to allow to connect
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next layer of middleware
  next();
});

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
  // do logging
  console.log("Something is happening.");
  next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get("/", function(req, res) {
  res.json({ message: "hooray! welcome to our api!" });
});

// more routes for our API will happen here
// on routes that end in /bears
// ----------------------------------------------------
router
  .route("/words")

  // create a bear (accessed at POST http://localhost:8080/api/bears)
  .post(function(req, res) {
    var word = new Word(); // create a new instance of the Bear model
    word.userId = req.body.userId; // set the bears name (comes from the request)
    word.word = req.body.word;
    // save the bear and check for errors
    word.save(function(err) {
      if (err) res.send(err);
      res.json({ message: "Word created!" });
    });
  })
  .get(function(req, res) {
    Word.find(function(err, words) {
      if (err) res.send(err);

      res.json(words);
    });
  });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log("Magic happens on port " + port);
