// const bcrypt = require("bcrypt");
// const saltRounds = 10;
const db = require("../models/index");

module.exports = {
  createNewUser: (req, res) => {
    let username = req.body.username;
    let userpass = req.body.userpass;
    db.User.newUser(username, userpass, () => {
      res.send("User created successfully. Login to access your page.");
    });
  },
  getUserByUsernameAndPassword: (req, res) => {
    let username = req.body.username;
    let userpass = req.body.userpass;
    let userDetails = [username, userpass];
    db.User.getUser(userDetails, (results) => {
      if (results[0] == undefined) {
        res.status(200).send({ result: "Incorrect username/password", id: 0 });
      } else {
        res
          .status(200)
          .send({ result: "Logged in successfully", id: results[0].id });
      }
    });
  },
  getPostsByUserId: (req, res) => {
    let userId = req.params.userId;
    db.Post.posts(userId, (results) => {
      res.send(results);
    });
  },
  getPostByPostId: (req, res) => {
    let postId = req.params.applicationId;
    db.Post.post(postId, (result) => {
      res.send(result[0]);
    });
  },
  composePost: (req, res) => {
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
    db.Post.compose(applicationDetails, () => {
      res.sendStatus(200);
    });
  },
  editPostById: (req, res) => {
    let postId = req.params.applicationId;
    db.Post.edit(postId, (result) => {
      res.send(result[0]);
    });
  },
  updatePostById: (req, res) => {
    let postId = req.params.applicationId;
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
    db.Post.update(postId, applicationDetails, () => {
      res.sendStatus(200);
    });
  },
  deletePostById: (req, res) => {
    let postId = req.body.applicationId;
    db.Post.delete(postId, () => {
      res.sendStatus(200);
    });
  },
};
