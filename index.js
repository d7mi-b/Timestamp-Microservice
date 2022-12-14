// index.js
// where your node app starts

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

app.get("/api/", function (req, res) {
  const unix = new Date().getTime();
  const utc = new Date().toUTCString();
  res.json({ unix: unix, utc: utc });
});

app.get("/api/:date", function (req, res) {
  const date = req.params.date;
  
  if (isNaN(+date) && new Date(date) != "Invalid Date") {
    const unix = new Date(date).getTime();
    const utc = new Date(date).toUTCString();
    res.json({ unix: unix, utc: utc });
  }
  else if (!isNaN(+date) && date.length === 13) {
    const utc = new Date(+date).toUTCString();
    res.json({ unix: +date, utc: utc });
  }
  else {
    res.json({ error: "Invalid Date" });
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
