var sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");
const bcrypt = require('bcrypt');

var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(cors());

// app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

const port = process.env.PORT || 3001;

function errorHandler(error) {
    if (error) {
      console.log(error);
      throw error;
    }
    return;
  }

var db = new sqlite3.Database('./data/main.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, errorHandler);
// db.exec("DROP TABLE IF EXISTS users", errorHandler);
db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT)", errorHandler);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.post('/sign_up', jsonParser, (req, res) => {
  //verify that email, username, and password are not empty
  console.log(req.body);
  if (req.body.email === "" || req.body.username === "" || req.body.password === "") {
    res.json({
      type: "error", 
      message: "Please fill out all fields"
    });
  } else {
    //verify that email is valid
    if (!req.body.email.includes("@") || !req.body.email.includes(".")) {
      res.json({
        type: "error", 
        message: "Please enter a valid email"
      });
    } else {
      //verify that username is not already in use
      db.get("SELECT * FROM users WHERE username = ?", [req.body.username], (err, row) => {
        if (row) {
          res.json({
            type: "error", 
            message: "Username already in use"
          });
        } else {
          //verify that password is at least 8 characters long
          if (req.body.password.length < 8) {
            res.json({
              type: "error", 
              message: "Password must be at least 8 characters long."
            });
          } else {
            //verify that password is at least one number, one uppercase letter, and one lowercase letter
            if (!req.body.password.match(/[a-z]/i) || !req.body.password.match(/[A-Z]/i) || !req.body.password.match(/[0-9]/i)) {
              res.json({
                type: "error", 
                message: "Password must contain at least one number, one uppercase letter, and one lowercase letter."
              });
            } else {
              //verify that email is not already in use
              db.get("SELECT * FROM users WHERE email = ?", [req.body.email], async (err, row) => {
                if (row) {
                  res.json({
                    type: "error", 
                    message: "Email already in use"
                  });
                } else {
                  //insert new user into database
                  const salt = await bcrypt.genSalt();
                  const hashedPassword = await bcrypt.hash(req.body.password, salt);
                  db.run("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [req.body.username, hashedPassword, req.body.email], errorHandler);
                  res.json({type: "success", message: "Account created successfully."});
                }
              }
              );
            }
          }
        }
      }
      );
    }
  }
});


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
