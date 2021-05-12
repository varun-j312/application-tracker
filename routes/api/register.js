const express = require("express");
const mysql = require("mysql");
const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "application_tracker",
  password: "deepseafish_312",
});

/* GET home page. */
router.post("/", (req, res, next) => {
  let username = req.body.username;
  let userpass = req.body.userpass;
  let findUsernameQuery = "SELECT * FROM users WHERE username = ?";
  connection.query(findUsernameQuery, username, (err, results) => {
    if (results[0]?.username == username) {
      res.send("Username taken. Try another one.");
    } else {
      let userDetails = [username, userpass];
      let addUserQuery = "INSERT INTO users(username, userpass) VALUES (?,?)";
      connection.query(addUserQuery, userDetails, (err, results) => {
        res.send("User created successfully. Login to access your page.");
      });
    }
  });
});

module.exports = router;
