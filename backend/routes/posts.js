const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const auth = require('../middleware/auth')
const postCtrl = require('../controllers/post');
const commentCtrl = require('../controllers/comment');


/***************récupération du routeur express***************** */

// Créer un nouveau post
router.post("/", auth, multer, postCtrl.createPost);

// trouver tous les posts
router.get("/", auth, postCtrl.getAllPosts);

// récupérer le post avec l'id
router.get("/:id", auth, postCtrl.getPost);

// modifier le post avec l'id
router.put("/:id", auth, multer, postCtrl.updatePost);

// Supprimer le post avec l'id
router.delete("/:id", auth, multer, postCtrl.deletePost);



/*************************Commentaire*******************/

// créer un nouveau commentaire //
//router.post('/:postId/comments', auth, commentCtrl.createComment);

// récupérer les commentaires //
//router.get('/comments', auth, commentCtrl.getComments);

// supprimer un commentaire //
//router.delete('/comments/:id', auth, commentCtrl.deleteComment);

module.exports = router;