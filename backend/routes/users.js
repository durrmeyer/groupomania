const express = require('express');
const router = express.Router();
//const user = require('../models/user')
const userCtrl = require('../controllers/user') ;
//const multer = require('../middleware/multer-config');
//const auth = require('../middleware/auth');


/***************récupération du routeur express***************** */

/**créer et enregistrer un nouvel utilisateur **/
router.post('/login', userCtrl.login);
router.post('/register', userCtrl.register);


/******créer les routes users******/
/** route pour utilisateurs **/

//-----récupérer tous les utilisateurs -----------//
router.get("/", userCtrl.getAllUsers);

//-----modification de l'utilisateur-----------//
router.put("/:id", userCtrl.updateUser);

//-----récupérer un utilisateur-----------//
router.get('/:id', userCtrl.User);

//-----supprimer un utilisateur-----------//
router.delete("/:id", userCtrl.deleteUser);
module.exports = router;

