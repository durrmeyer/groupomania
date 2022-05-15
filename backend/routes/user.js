const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/users') ;

/***************récupér tion du routeur express***************** */


router.post('/auth/login', userCtrl.login);
router.post('/auth/register, userCtrl.register');
module.exports = router;

