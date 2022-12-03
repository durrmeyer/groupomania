const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer");
const auth = require("../middleware/auth");
const postCtrl = require("../controllers/post");
const commentCtrl = require("../controllers/comment");
const likeCtrl = require("../controllers/like");

/***************récupération du routeur express***************** */

router.post("/add", auth, multer, postCtrl.createPost);
router.get("/", auth, postCtrl.getAllPosts);
router.get("/:id", auth, postCtrl.getPostById);
router.patch("/:id", auth, multer, postCtrl.updatePost);
router.delete("/:id", auth, multer, postCtrl.deletePost);

router.post("/:id/comments", auth, commentCtrl.createComment);
router.get("/comments/:id", auth, commentCtrl.getAllComments);
router.delete("/comments/:id", auth, commentCtrl.deleteComment);

router.post("/:id/likes", auth, likeCtrl.likeUser);

module.exports = router;
