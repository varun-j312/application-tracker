const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "application_tracker",
  password: "deepseafish_312",
});

module.exports = connection;
