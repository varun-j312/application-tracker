const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const postsRouter = require("./routes/posts");
const postRouter = require("./routes/post");
const composeRouter = require("./routes/compose");
const deleteRouter = require("./routes/delete");
const editRouter = require("./routes/edit");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// passport auth setup
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// using routes
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/posts", postsRouter);
app.use("/post", postRouter);
app.use("/compose", composeRouter);
app.use("/delete", deleteRouter);
app.use("/edit", editRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use(function (err, req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
});

module.exports = app;
