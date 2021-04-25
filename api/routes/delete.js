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
  let deletePostQuery =
    "DELETE FROM applications WHERE applicationId = " + req.body.applicationId;
  connection.query(deletePostQuery, (err, result) => {
    if (!err) {
      console.log("Application deleted successfully!");
      res.sendStatus(200);
    }
  });
});

module.exports = router;
