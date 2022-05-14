//const {Sequelize} = require('sequelize');

const express = require('express');
const db = require('./models')//utilisations des modèles pour la BDD
const cors = require('cors')






const app = express();


app.use(cors());
app.use((req, res, next) => {
	// les ressources peuvent être partager de n'importe quelle origine//
	res.setHeader('Access-Control-Allow-Origin', '*');
	//l'autorisation sera donnée quand la vérification sera faite //
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
	);
	// les requêtes autorisées pour le http //
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
	next();
});
const database = async function () {

	try {
		await db.sequelize.authenticate();
		console.log('Connexion à la base de donnée réussie !')
	} catch (error) {

		console.log('Connexion à la base de donnée échouée !', error);
	}
};
database();



app.use(express.json());




module.exports = app;