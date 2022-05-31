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
router.get('/:id');
router.put('');
router.delete('./:id'),
module.exports = router;

