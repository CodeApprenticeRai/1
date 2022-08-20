// Resources
const db = require(`${__dirname}/db.js`);
const bcrypt = require('bcrypt');

// Error Handler
exports.errorHandler = (error) => {
    if (error) {
        console.log(error);
        throw error;
    }
    return;
}
// Checks if Data is Empty (Returns Boolean)
exports.isEmpty = (req, res) => {
    //verify that email, username, and password are not empty
    console.log(req.body);
    if (req.body.email === "" || req.body.username === "" || req.body.password === "") {
        return true;
        res.json({
        type: "error", 
        message: "Please fill out all fields"
        });
    }else {
        return false;
    }
            
}
// Checks if Email (Returns Boolean)
exports.isEmail = (req, res) => {
    //verify that email is valid
    if (!req.body.email.includes("@") || !req.body.email.includes(".")) {
        return false
        res.json({
            type: "error", 
            message: "Please enter a valid email"
        });
    }else {
        return false;
    }
}
// Checks if Username Exists (Returns Boolean)
exports.usernameTaken = (req, res, err, row) => {
    //verify that username is not already in use
    db.get("SELECT * FROM users WHERE username = ?", [req.body.username], (err, row) => {
        if (row) {
            return true;
            res.json({
                type: "error", 
                message: "Username already in use"
            });
        }else {
            return false;
        }
    })
}
// Checks if Password is Length Valid(Returns Boolean)
exports.isLengthValid = (req, res) => {
    //verify that password is at least 8 characters long
    if (req.body.password.length < 8) {
        return false;
        res.json({
          type: "error", 
          message: "Password must be at least 8 characters long."
        });
    }else {
        return true;
    }
}
// Checks if Password Contains At Least One Number, Letter & Lowercase Letter(Returns Boolean)
exports.isPasswordSecure = (req, res) => {
    //verify that password is at least one number, one uppercase letter, and one lowercase letter
    if (!req.body.password.match(/[a-z]/i) || !req.body.password.match(/[A-Z]/i) || !req.body.password.match(/[0-9]/i)) {
        return false;
        res.json({
          type: "error", 
          message: "Password must contain at least one number, one uppercase letter, and one lowercase letter."
        });
    }else {
        return true;
    }
}
// Checks if Email is Taken(Returns Boolean)
exports.isEmailTaken = (req, res, err, row) => {
    //verify that email is not already in use
    db.get("SELECT * FROM users WHERE email = ?", [req.body.email], async (err, row) => {
        if (row) {
            return true;
            res.json({
                type: "error", 
                message: "Email already in use"
            });
        }else {
            return false;
        }
    });
}
//Insert New User into Database
exports.insertUser = (salt, hashedPassword, db, bcrypt, errorHandler) => {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    db.run("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [req.body.username, hashedPassword, req.body.email], errorHandler);
    res.json({type: "success", message: "Account created successfully."});
}