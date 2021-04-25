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
  let userDetails = [username, userpass];
  let findUsernameQuery =
    "SELECT * FROM users WHERE username = ? AND userpass = ?";
  connection.query(findUsernameQuery, userDetails, (err, results) => {
    if (err) {
      console.log(err);
    } else {
      if (results[0] == undefined) {
        res.status(200).send({ result: "Incorrect username/password", id: 0 });
      } else {
        res
          .status(200)
          .send({ result: "Logged in successfully", id: results[0].id });
      }
    }
  });
});

module.exports = router;
