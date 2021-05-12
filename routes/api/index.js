const router = require("express").Router();
const controller = require("../../controllers/controller");

// const registerRouter = require("./register");
// const loginRouter = require("./login");
// const postsRouter = require("./posts");
// const postRouter = require("./post");
// const composeRouter = require("./compose");
// const deleteRouter = require("./delete");
// const editRouter = require("./edit");

// router.use("/register", registerRouter);
// router.use("/login", loginRouter);
// router.use("/posts", postsRouter);
// router.use("/post", postRouter);
// router.use("/compose", composeRouter);
// router.use("/delete", deleteRouter);
// router.use("/edit", editRouter);

router.route("/register").post(controller.createNewUser);
router.route("/login").post(controller.getUserByUsernameAndPassword);
router.route("/posts/:userId").get(controller.getPostsByUserId);
router.route("/post/:userId/:applicationId").get(controller.getPostByPostId);
router.route("/compose").post(controller.composePost);
router.route("/edit/:userId/:applicationId").get(controller.editPostById);
router.route("/edit/:userId/:applicationId").post(controller.updatePostById);
router.route("/delete").post(controller.deletePostById);

module.exports = router;
