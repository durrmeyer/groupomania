const express = require('express');
const router = express.Router();
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');


// Créer un nouveau Comment
router.post("/comments", auth, multer, commentCtrl.createComment);
// trouver tous les Comments
router.get("/", auth, commentCtrl.getAllComments);

router.get("/:id", auth, commentCtrl.getCommentById);
// modifier le Comment avec l'id
router.patch("/:id", auth, multer, commentCtrl.updateComment);
// Supprimer le Comment avec l'id
router.delete("/:id", auth, multer, commentCtrl.deleteComment);
module.exports = router;