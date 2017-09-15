// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.text());
app.use(bodyParser.json({
  type: "application/vnd.api+json"
}));

// Reservations (DATA)
// =============================================================
var reservations = [{
  name: "Willie",
  phone: 1234567890,
  email: "willie@willie.com",
  uniqueID: "willie"
}, {
  name: "Rick",
  phone: 1234567890,
  email: "rick@rick.com",
  uniqueID: "rick"
}, {
  name: "Zoe",
  phone: 1234567890,
  email: "Zoe@Zoe.com",
  uniqueID: "Zoe"
}];

var waitlist = [];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  // res.send("Welcome to the Reservations Page!")
  res.sendFile(path.join(__dirname, "homepage.html"));
});

app.get("/api/tables", function(req, res) {
  return res.send(reservations);
});

app.get("/api/waitlist", function(req, res) {
  return res.send(waitlist);
});

app.get("/tables", function(req, res) {
  // res.send("Welcome to the Reservations Page!")
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  // res.send("Welcome to the Reservations Page!")
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Create New Reservation - takes in JSON input
app.post("/api/new", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  var newReservation = req.body;

  console.log(newReservation);

  // We then add the json the user sent to the character array
  if (reservations.length === 5) {
    waitlist.push(newReservation);
  } else {
    reservations.push(newReservation);
  }

  // We then display the JSON to the users
  res.json(newReservation);
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
