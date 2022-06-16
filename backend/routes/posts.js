const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post');



/***************récupération du routeur express***************** */

// Créer un nouveau post
router.post("/", postCtrl.createPost);

// trouver tous les posts
router.get("/", postCtrl.getAllPosts);

// trouver le post avec l'id
router.get("/:id", postCtrl.getOnePost);

// modifier le post avec l'id
router.put("/:id", postCtrl.updatePost);

// Supprimer le post avec l'id
router.delete("/:id", postCtrl.deletePost);
// Supprimer tous les post avec l'id
//router.delete("/", postCtrl.deleteAll);

module.exports = router;
