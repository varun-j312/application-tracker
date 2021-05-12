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
router.get("/:userId/:applicationId", (req, res, next) => {
  let findPostQuery =
    "SELECT * FROM applications WHERE applicationId = " +
    req.params.applicationId;
  connection.query(findPostQuery, (err, result) => {
    res.send(result[0]);
  });
});

module.exports = router;
