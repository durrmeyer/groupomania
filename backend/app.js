//const {Sequelize} = require('sequelize');

const express = require('express');
const db = require('./models')//utilisations des modèles pour la BDD
const cors = require('cors')
const app = express();


app.use(cors());


// ---------------------------------------Import des routes -----------------------//
const usersRoutes = require("./routes/users.js");
const postsRoutes = require("./routes/posts.js");



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

  });
database();

db.sequelize.sync({ force: false})
.then(() => console.log("Base de données à jours !"))
.catch((error) => console.log(" il y a eu un petit soucis!", error));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//---------------------déclaration des routes----------------------------//
app.use("/api/users/", usersRoutes);
app.use("/api/posts/", postsRoutes);


module.exports = app;