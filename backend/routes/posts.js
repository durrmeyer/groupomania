const express = require('express');
const router = express.Router();

const postCtrl = require('../controllers/post') ;



/***************récupération du routeur express***************** */

// Créer un nouveau post
router.post("/", postCtrl.create);

// trouver tous les posts
router.get("/posts", postCtrl.findAll);

// trouver le post avec l'id
router.get("/posts/:id", postCtrl.findByPk);

// modifier le post avec l'id
router.put("/posts/:id", postCtrl.update);

// Supprimer le post avec l'id
router.delete("/posts/:id", postCtrl.delete);

module.exports = router;
