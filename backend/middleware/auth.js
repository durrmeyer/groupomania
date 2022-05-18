const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
	try {
		//On récupère le token dans le header de la requête autorisation
		const token = req.headers.authorization.split(' ')[1];

		const decodedToken = jwt.verify(token, `${process.env.SECRET_KEY}`);

		//userId envoyé avec la requête doit correspondre au userId encodé dans le token
		const userId = decodedToken.userId;
	
		if (req.body.userId && req.body.userId !== userId) {
			throw 'Invalid user ID';
		} else {
			next();
		}
	} catch (error) {
		res.status(401).json({
			 error: 'non authentifié !' 
		});
	}
}