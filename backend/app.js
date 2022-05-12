const express = require('express');
const cors = require('cors')





const path = require('path');

//onst uri = process.env.ATLAS_URI;


/*mongoose
	.connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	//})
	.then(() => console.log('Connexion à MongoDB réussie !'))
	.catch(() => console.log('Connexion à MongoDB échouée !'));*/

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

app.use(express.json());


app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;