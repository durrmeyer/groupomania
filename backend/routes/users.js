const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer');
const auth = require('../middleware/auth');


/***************récupération du routeur express***************** */

/**créer et enregistrer un nouvel utilisateur **/
router.post('/login', userCtrl.login);
router.post('/register', userCtrl.register);


/******créer les routes users******/
/** route pour utilisateurs **/

//-----récupérer tous les utilisateurs -----------//
router.get("/",auth, userCtrl.getAllUsers);

//-----modification de l'utilisateur-----------//
router.put("/:id",auth, multer, userCtrl.updateUser);

//-----récupérer un utilisateur-----------//
router.get('/:id',auth, multer,userCtrl.getUserById);

//-----supprimer un utilisateur-----------//
router.delete("/:id",auth, multer, userCtrl.deleteUser);
module.exports = router;

