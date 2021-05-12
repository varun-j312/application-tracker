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
router.get("/:userId", (req, res, next) => {
  let userId = req.params.userId;
  let q = `SELECT * FROM users INNER JOIN applications ON users.id = applications.userId WHERE id = ${userId}`;
  connection.query(q, (err, results) => {
    res.send(results);
  });
});

module.exports = router;
