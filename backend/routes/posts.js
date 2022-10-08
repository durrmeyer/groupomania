const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const auth = require('../middleware/auth')
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment')


/***************récupération du routeur express***************** */

// Créer un nouveau post
router.post("/add", auth, multer, postCtrl.createPost);

// trouver tous les posts
router.get("/", auth, postCtrl.getAllPosts);

// récupérer le post avec l'id
router.get("/:id", auth, postCtrl.getPostById);

// modifier le post avec l'id
router.put("/:id", auth, multer, postCtrl.updatePost);

// Supprimer le post avec l'id
router.delete("/:id", auth, multer, postCtrl.deletePost);

router.post("/:id/like", auth, postCtrl.likeUser);

router.post("/:id/comments", auth, commentCtrl.createComment);
router.get("/:id/comments", auth, commentCtrl.getAllComments);
router.delete("/:postId/comments/:id", auth, multer, commentCtrl.deletecomment);
module.exports = router;