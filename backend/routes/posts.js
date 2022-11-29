const express = require("express");
const router = express.Router();
const multer = require("../middleware/multer");
const auth = require("../middleware/auth");
const postCtrl = require("../controllers/post");
const commentCtrl = require("../controllers/comment");
const likeCtrl = require("../controllers/like");

/***************récupération du routeur express***************** */

// Créer un nouveau post
router.post("/add", auth, multer, postCtrl.createPost);
// trouver tous les posts
router.get("/", auth, postCtrl.getAllPosts);
// récupérer le post avec l'id
router.get("/:id", auth, postCtrl.getPostById);
// modifier le post avec l'id
router.patch("/:id", auth, multer, postCtrl.updatePost);
// Supprimer le post avec l'id
router.delete("/:id", auth, multer, postCtrl.deletePost);

router.post("/:id/comments", auth, commentCtrl.createComment);
router.get("/comments/:id", auth, commentCtrl.getAllComments);

router.delete("/comments/:id", auth, commentCtrl.deleteComment);
router.post("posts/likes/{id}", auth, likeCtrl.likeUser);

module.exports = router;
