var sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");
const bcrypt = require('bcrypt');
const validation = require(`${__dirname}/validation.js`);
const db = require(`${__dirname}/db.js`);

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());

// app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

const port = process.env.PORT || 3001;


// var db = new sqlite3.Database('./data/main.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, errorHandler);
// // db.exec("DROP TABLE IF EXISTS users", errorHandler);
db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT)", validation.errorHandler);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.post('/sign_up', jsonParser, (req, res, email, username, password) => {
  // Get Data
  const {email, username, password} = req.body;
  // Validate
  username.validation.isEmpty()
    .validation.isEmail()
})


app.post('/login', (req, res) => {
    // console.log(req)
    // console.log(res)
    var username = req.body.username;
    var password = req.body.password;
    var email = req.body.email;
    // var sql = "INSERT INTO users (username, password, email) VALUES ('" + username + "', '" + password + "', '" + email + "')";
    // db.run(sql, errorHandler);
    res.send("Success");
})


app.listen(port, () => console.log(`Express app listening on port ${port}!`));
