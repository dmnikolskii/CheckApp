const path = require('path');
const express = require("express");

const PORT = process.env.PORT || 3001;

var mysql = require('mysql');

const app = express();

var con = mysql.createConnection({
    host: "https://www.checkapp.digital/",
    user: "checrtbc_checkadmin",
    password: "pepsicoadmin",
    database: "checrtbc_checklistpet"
  });

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// Handle GET requests to /api route
app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO weight (skuid, weight) VALUES (1, 100)";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });

});

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

//app.listen();

  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });