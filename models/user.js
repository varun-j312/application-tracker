const connection = require("../config/connection");

const User = {
  newUser: (username, userpass, callback) => {
    let findUsernameQuery = "SELECT * FROM users WHERE username = ?";
    connection.query(findUsernameQuery, username, (err, results) => {
      if (results[0]?.username == username) {
        res.send("Username taken. Try another one.");
      } else {
        let userDetails = [username, userpass];
        let addUserQuery = "INSERT INTO users(username, userpass) VALUES (?,?)";
        connection.query(addUserQuery, userDetails, (err, results) => {
          if (err) {
            console.log(err);
          } else {
            callback();
          }
        });
      }
    });
  },
  getUser: (userDetails, callback) => {
    let findUsernameQuery =
      "SELECT * FROM users WHERE username = ? AND userpass = ?";
    connection.query(findUsernameQuery, userDetails, (err, results) => {
      if (err) {
        console.log(err);
      } else {
        callback(results);
      }
    });
  },
};

module.exports = User;
