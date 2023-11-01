var sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require("path");
const bcrypt = require('bcrypt');
const store = new session.MemoryStore();

const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);


io.on('connection', (socket) => {
  socket.emit('chat-message', 'connection successful');
  console.log("connection established");
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});



var jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var secret = "WAWABUWI";

app.use(session({
    "secret": secret,
    cookie: { maxAge: 30000 },
    saveUninitialized: false,
    "store": store
}));

app.use(jsonParser);
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

const db = new sqlite3.Database('./data/main.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, errorHandler);
// db.exec("DROP TABLE IF EXISTS users", errorHandler);
db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT)", errorHandler);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});


app.get('/script.js', (req, res) => {
  res.sendFile(path.join(__dirname, "public", "script.js"));
});

app.post('/sign_up', jsonParser, (req, res) => {
  //verify that email, username, and password are not empty
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
                  console.log("User successfully created");
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
  console.log("Request Body: ", req.body);  
  if (!req.body.hasOwnProperty("username") || !req.body.hasOwnProperty("password")) {
    res.json({
      type: "error", 
      message: "Username and Password are required."
    });
  }

  let username = req.body.username;
  let password = req.body.password;
  
  if (req.session.authenticated){
    res.json(session);
  } else {
    db.get("SELECT * FROM users WHERE username = ?", [username], (errorOnSelect, row) => {
      if (row) {
        bcrypt.compare(password, row.password, (errorOnCompare, result) => {
            console.log("result: ", result);
            if (result) {
              req.session.authenticated = true
              req.session.username = username;
              res.json({
                  type: "success", 
                  message: "Login successful",
                  "username": username,
                  "session": req.session
              });
            } else {
                res.json({
                    type: "error", 
                    message: "Incorrect password",
                    error: errorOnCompare
                });
            }
        });
        } else {
            res.json({
                type: "error", 
                message: "Username not found",
                error: errorOnSelect
            });
        }
    })  
  }
})


server.listen(port, () => console.log(`Express app listening on port ${port}!`));
