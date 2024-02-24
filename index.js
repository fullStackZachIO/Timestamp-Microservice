// index.js
// where your node app starts
// require('dotenv').config();


// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get('/api/:date?', function(req, res, next) {
  let dateString = req.params.date;
  let date;

  if (!dateString) {
    date = new Date();
  } else {
    date = new Date(dateString);
  }
  if (isNaN(date.getTime())) {
    date = new Date(parseInt(dateString));
  }
  if (isNaN(date.getTime())) {
    console.log(date);
    console.log(date + " is not a valid date.");
    req.time = {error: "Invalid Date"};
    next();
  } else {
    req.time = {
      utc: date.toUTCString(),
      unix: date.getTime()
    };
    req.errored = false;
    next();
  }
}, function(req, res) {
  if (req.errored === true) {
    console.log("Invalid date error json");
    res.json(req.time);
  } else {
    res.json(req.time);
  }
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
