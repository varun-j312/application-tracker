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
  let applicationDetails = [
    req.body.userId,
    req.body.role,
    req.body.company,
    req.body.location,
    req.body.description,
    parseInt(req.body.salary),
    req.body.source,
    req.body.link,
    req.body.contact,
    req.body.status,
    req.body.date,
    req.body.note,
  ];
  let addApplicationQuery =
    "INSERT INTO applications(userId, jobRole, companyName, companyLocation, jobDescription, monthlySalary, appSource, appLink, contactInfo, appStatus, appliedOn, appNote) VALUES (?)";
  connection.query(addApplicationQuery, [applicationDetails], (err, result) => {
    if (err) console.log(err);
    else {
      console.log("Application added successfully!");
      res.sendStatus(200);
    }
  });
});

module.exports = router;
