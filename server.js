var sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const path = require("path");


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
db.exec("CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, email TEXT)", errorHandler);


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});




app.listen(port, () => console.log(`Express app listening on port ${port}!`));
