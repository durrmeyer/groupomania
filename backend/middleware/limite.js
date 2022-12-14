const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
	window: 3 * 60 * 1000, // attente de 3 min
	max: 5, //limite chaque IP à 5 requêtes
	message:" vous avez depassé les 5 demandes. Veuillez attendre 3 min pour vous reconnecter",

});

module.exports = {limiter};