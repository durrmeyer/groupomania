const bcrypt = require("bcrypt"); // Bcrypt permet de crypter le password et de le comparer
const jwt = require("jsonwebtoken"); // Jwt necessaire pour la création d'un token
const db = require("../db/models"); // Récupération des moconst passwordValidator = require('password-validator');
const fs = require("fs");
require("dotenv").config();

exports.register = (req, res) => {
  // Vérifie si l'utilisateur existe déjà
  db.User.findOne({ where: { email: req.body.email } }).then((user) => {
    if (!user) {
      //  sécurise le mot de passe en le hachant
      bcrypt.hash(req.body.password, 10).then((hash) => {
        // crée une instance du model User, y insert les données et les sauvegardes dans la base de données.
        db.User.create({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          password: hash,
          RoleId: 3,
        }).then((user) => {
          // message retourné en cas de réussite
          res
            .status(201)
            .json({
              userId: user.id,
              token: jwt.sign(
                {
                  userId: user.id,
                },
                `${process.env.SECRET_KEY}`,
                {
                  expiresIn: "24h",
                }
              ),
              message: "Utilisateur créé !",
            })
            
            })
            .catch((err) => {
              res.status(400).json({ err, message: "compte non créé" })
            // message d'erreur en cas d'échec de hachage du mot de passe
            .catch((res) => {
              // message d'erreur si l'utilisateur à été trouvé dans la BDD
              res.status(400).json({ err, message: " déjà inscrit!" });
            });
        });
      });
    }
  });
};

exports.login = async (req, res) => {
  db.User.findOne({
    where: { email: req.body.email },
  }).then((user) => {
    if (!user) {
      return res
        .status(401)
        .json({ message: "aucun compte ne correspond à votre adresse mail !" });
    }

    // bcrypt compare les Hashs
    bcrypt
      .compare(req.body.password, user.password)
      .then((valid) => {
        if (!valid) {
          return res.status(401).json({ message: "Mot de passe incorrect !" });
        }

        res.status(200).json({
          userId: user.id,
          user: user,
          imageUrl: user.imageUrl,

          token: jwt.sign(
            {
              userId: user.id,
            },
            "RANDOM_TOKEN_SECRET",
            { expiresIn: "24h" }
          ),
          message: "Bonjour " + user.firstName + " ! ",
        });
      })
      .catch((error) => res.status(500).json({ error }));
  });
};

exports.getUserById = (req, res) => {
  db.User.findOne({
    where: {
      id: req.params.id,
    },
    include: [
      {
        model: db.Role,
        attributes: ["id", "roleName"],
      },
    ],
  })
    .then((user) => res.status(200).send(user))
    .catch((err) =>
      res.status(500).send({
        err,
        message: "Erreur serveur",
      })
    );
};

exports.getAllUsers = (req, res) => {
  db.User.findAll({
    attributes: [
      "id",
      "firstName",
      "lastName",
      "email",
      "imageUrl",
      "RoleId",
      "createdAt",
    ],
    include: [
      {
        model: db.Role,
        attributes: ["id", "roleName"],
      },
    ],
  })
    .then((users) => res.status(200).send(users))
    .catch((error) => res.status(500).send({ error }));
};

exports.updateUser = (req, res) => {
  db.User.findOne({ where: { id: req.params.id } });
 
  imageUrl = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : "null";

  db.User.findOne(
       {
      where: {
        id: req.params.id,
      },
    })
    .then((user)=>{ 
    if (user.imageUrl) {
      const filename = user.imageUrl.split("/images/")[1];
      fs.unlink(`images/${filename}`, (err) => {
        if (err);
        else {
          console.log(`Deleted file: images/${filename}`);
        }
      });
    }
    db.User.update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      imageUrl: imageUrl,
    },
    {
      where: { id: req.params.id },
    })
    .then(() =>
      res.status(200).json({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        imageUrl: imageUrl,
        message: "User modifié !",
      })
    )
    .catch((error) => res.status(400).json({ message: error }));
  })
  .catch((error) => res.status(500).json({ message: error }));  
};

exports.deleteUser = (req, res) => {
 
  db.User.findOne({ where: { id: req.params.id } })


 .then((user) => {
     if (req.file) {
    const filename = user.imageUrl.split("/images/")[1];
    fs.unlink(`images/${filename}`, () => {
      user
        .destroy({
          where: {
            id: req.params.id,
          },
        })
        .then(() =>
          res.status(200).json({
            message: "le User est bien supprimé !",
          })
        )
        .catch((error) =>
          res.status(400).json({
            error,
          })
        );
    });
    } else { // Sinon on supprime uniquement l'user
      
      db.User.destroy({ where: { id: req.params.id } });
      res.status(200).json({ message: "Compte supprimé !" });
    }
  })

  .catch((error) => res.status(500).json({ error }));
    
};
