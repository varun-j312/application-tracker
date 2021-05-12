const connection = require("../config/connection");

const Post = {
  posts: (userId, callback) => {
    let q = `SELECT * FROM users INNER JOIN applications ON users.id = applications.userId WHERE id = ${userId}`;
    connection.query(q, (err, results) => {
      callback(results);
    });
  },
  post: (postId, callback) => {
    let findPostQuery =
      "SELECT * FROM applications WHERE applicationId = " + postId;
    connection.query(findPostQuery, (err, result) => {
      callback(result);
    });
  },
  compose: (applicationDetails, callback) => {
    let addApplicationQuery =
      "INSERT INTO applications(userId, jobRole, companyName, companyLocation, jobDescription, monthlySalary, appSource, appLink, contactInfo, appStatus, appliedOn, appNote) VALUES (?)";
    connection.query(
      addApplicationQuery,
      [applicationDetails],
      (err, result) => {
        if (err) console.log(err);
        else {
          callback();
        }
      }
    );
  },
  edit: (postId, callback) => {
    let getApplicationQuery =
      "SELECT * FROM applications WHERE applicationId = " + postId;
    connection.query(getApplicationQuery, (err, result) => {
      if (err) console.log(err);
      else {
        callback(result);
      }
    });
  },
  update: (postId, applicationDetails, callback) => {
    let addApplicationQuery =
      "UPDATE applications SET ? WHERE applicationId = " + postId;
    connection.query(addApplicationQuery, applicationDetails, (err, result) => {
      if (err) console.log(err);
      else {
        callback();
      }
    });
  },
  delete: (postId, callback) => {
    let deletePostQuery =
      "DELETE FROM applications WHERE applicationId = " + postId;
    connection.query(deletePostQuery, (err, result) => {
      if (!err) {
        callback();
      }
    });
  },
};

module.exports = Post;
