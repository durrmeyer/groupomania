const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const auth = require('../middleware/auth')
const postCtrl = require('../controllers/post');



/***************récupération du routeur express***************** */

// Créer un nouveau post
router.post("/", multer, postCtrl.createPost);

// trouver tous les posts
router.get("/", postCtrl.getAllPosts);

// trouver le post avec l'id
router.get("/:id", postCtrl.getOnePost);

// modifier le post avec l'id
router.put("/:id", multer, postCtrl.updatePost);

// Supprimer le post avec l'id
router.delete("/:id", multer, postCtrl.deletePost);

module.exports = router;
