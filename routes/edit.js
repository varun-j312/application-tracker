const express = require("express");
const mysql = require("mysql");
const router = express.Router();

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "application_tracker",
  password: "deepseafish_312",
});

router.get("/:userId/:applicationId", (req, res, next) => {
  let getApplicationQuery =
    "SELECT * FROM applications WHERE applicationId = " +
    req.params.applicationId;
  connection.query(getApplicationQuery, (err, result) => {
    if (err) console.log(err);
    else {
      res.send(result[0]);
    }
  });
});

router.post("/:userId/:applicationId", (req, res, next) => {
  let applicationDetails = {
    jobRole: req.body.role,
    companyName: req.body.company,
    companyLocation: req.body.location,
    jobDescription: req.body.description,
    monthlySalary: parseInt(req.body.salary),
    appSource: req.body.source,
    appLink: req.body.link,
    contactInfo: req.body.contact,
    appStatus: req.body.status,
    appliedOn: req.body.date,
    appNote: req.body.note,
  };
  let addApplicationQuery =
    "UPDATE applications SET ? WHERE applicationId = " +
    req.params.applicationId;
  connection.query(addApplicationQuery, applicationDetails, (err, result) => {
    if (err) console.log(err);
    else {
      console.log("Application edited successfully!");
      res.sendStatus(200);
    }
  });
});

module.exports = router;
