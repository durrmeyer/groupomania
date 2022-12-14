const { Sequelize } = require("sequelize");
const express = require("express");
const db = require("./db/models"); //utilisations du modèle pour la BDD
const cors = require("cors");
const helmet = require("helmet");
const path = require("path");
const app = express();
app.use(cors());

// ---------------------------------------Import des routes -----------------------//
/** importer de la route user **/
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");

app.use((req, res, next) => {
  // les ressources peuvent être partager de n'importe quelle origine//
  res.setHeader("Access-Control-Allow-Origin", "*");
  //l'autorisation sera donnée quand la vérification sera faite //
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin*, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // les requêtes autorisées pour le http //
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

const database = async function () {
  try {
    await db.sequelize.authenticate();
    console.log("Connexion à la base de donnée réussie !");
  } catch (error) {
    console.log("Connexion à la base de donnée échouée !", error);
  }
};
database();

db.sequelize
  .sync({ force: false })
  .then(() => console.log("Base de données à jours !"))
  .catch((error) => console.log(" il y a eu un petit soucis!", error));

app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
); // Utilisation du package Helmet pour sécuriser davantage nos headers
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//---------------------déclaration des routes----------------------------------//
app.get("/", (req, res) => res.send("ok tout va bien"));

app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

module.exports = app;
