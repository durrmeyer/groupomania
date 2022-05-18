
'use strict';
/*** Définir les variables d'environnement pour masquer les informations de connexion à la base de données  ***/
require("dotenv").config();
//const fs = require('fs');
//const path = require('path');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});
const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('../models/users')(sequelize, Sequelize);
sequelize.authenticate()
  .then(() => console.log('Connexion à mysql réussie !'))
  .catch(error => console.log('Connexion échouée:' + error))


module.exports = db;