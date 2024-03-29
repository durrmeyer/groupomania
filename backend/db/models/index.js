"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../../config/config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
// Relation avec l'ORM Sequelize
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Role = require("./role")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);
db.Like = require("./like")(sequelize, Sequelize);

db.User.hasMany(db.Post, {
  onDelete: "CASCADE",
});
db.User.hasMany(db.Comment, {
  onDelete: "CASCADE",
});
db.User.hasMany(db.Like, {
  onDelete: "CASCADE",
});
db.Post.hasMany(db.Comment, {
  onDelete: "CASCADE",
});
db.Role.hasMany(db.User, {
  onDelete: "CASCADE",
});
db.Post.hasMany(db.Like, {
  onDelete: "CASCADE",
});

db.Post.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.Comment.belongsTo(db.Post, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Comment.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

db.User.belongsTo(db.Role, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Like.belongsTo(db.User, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});
db.Like.belongsTo(db.Post, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

sequelize
  .authenticate()
  .then(() => console.log("Connexion à mysql réussie !"))
  .catch((error) => console.log("Connexion échouée:" + error));

module.exports = db;
