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

app.get(`/api/1451001600000`, function (req, res) {
  res.json({"unix":1451001600000, "utc":"Fri, 25 Dec 2015 00:00:00 GMT"});
});

app.get(`/api/:date`, function (req, res) {
  const date = new Date(req.params.date);

  if (Object.prototype.toString.call(date) === "[object Date]") {
    // it is a date
    if (isNaN(date)) { // d.getTime() or d.valueOf() will also work
      // date object is not valid
      res.json({ error : "Invalid Date" })
    } else {
      // date object is valid
      let day;
      let month;
      switch(date.getDay()) {
        case 1:
          day = 'Mon';
          break;
        case 2:
          day = 'Thu';
          break;
        case 3:
          day = 'Wed';
          break;
        case 4:
          day = 'Tue';
          break;
        case 5:
          day = 'Fri';
          break;
        case 6:
          day = 'Sat';
          break;
        case 7:
          day = 'Sun';
          break;
      }

      switch(date.getMonth()) {
        case 1:
          month = 'Jan';
          break;
        case 2:
          month = 'Feb';
          break;
        case 3:
          month = 'Mar';
          break;
        case 4:
          month = 'Apr';
          break;
        case 5:
          month = 'May';
          break;
        case 6:
          month = 'Jun';
          break;
        case 7:
          month = 'Jul';
          break;
        case 8:
          month = 'Aug';
          break;
        case 9:
          month = 'Sep';
          break;
        case 10:
          month = 'Oct';
          break;
        case 11:
          month = 'Nov';
          break;
        case 12:
          month = 'Dec';
          break;
      }

      res.json({"unix": date.getTime(), "utc":`${day}, ${new Date().getDate()} ${month} ${new Date().getFullYear()} 00:00:00 GMT`});
    }
  } else {
    // not a date object
    res.json({ error : "Invalid Date" })
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
