const bcrypt = require("bcrypt"); // Bcrypt permet de crypter le password et de le comparer
const jwt = require("jsonwebtoken"); // Jwt necessaire pour la création d'un token
const db = require("../db/models"); // Récupération des modèles Sequelize

require("dotenv").config();

exports.register = (req, res) => {
  try {
    // vérifie  si le mot de passe fait plus de 8 caractères
    if (req.body.password.length > 8) {
      // Vérifie si l'utilisateur existe déjà
      db.User.findOne({ where: { email: req.body.email } }).then((user) => {
        if (!user) {
          //  sécurise le mot de passe en le hachant
          bcrypt
            .hash(req.body.password, 10)
            .then((hash) => {
              // crée une instance du model User, y insert les données et les sauvegardes dans la base de données.
              db.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: hash,
                RoleId: 3,
              })

                .then(() => {
                  // message retourné en cas de réussite
                  res.status(201).json({
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
                  });
                })
                .catch((error) => {
                  // message d'erreur retourné en cas d'échec de l'ajout des données dans la BDD
                  res.status(500).json({ error });
                });
            })
            // message d'erreur en cas d'échec de hachage du mot de passe
            .catch((error) => res.status(500).json({ error }));
        } else {
          // message d'erreur si l'utilisateur à été trouvé dans la BDD
          return res.status(401).json({ message: " déjà inscrit!" });
        }
      });
    }
  } catch (error) {
    // message d'erreur si la présence de l'utilisateur dans la BDD n'a pu être vérifié
    res.status(500).json({ error: "aïe erreur" });
  }
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
  console.log(req.params.id, "XGRNGRPUORHOIORH?ROIMRHW");
  imageUrl = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : "null";

  db.User.update(
    {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      imageUrl: req.body.imageUrl,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then(() =>
      res.status(200).json({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        imageUrl: req.body.imageUrl,
        message: "User modifié !",
      })
    )
    .catch((error) => res.status(400).json({ message: error }));
};

exports.deleteUser = (req, res) => {
  console.log(req.params.id, "user supression");
  db.User.findOne({ where: { id: req.params.id } })

    .then((user) => {
      if (req.file) {
        const filename = user.image.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          user
            .destroy({
              where: {
                id: req.params.id,
              },
            })
            .then(() =>
              res.status(200).json({
                message: "le user est bien supprimé !",
              })
            )
            .catch((err) =>
              res.status(400).json({
                message: "Database error",
                error: err,
              })
            );
        });
      } else {
        user
          .destroy({
            where: {
              id: req.params.id,
            },
          })
          .then(() =>
            res.status(200).json({
              message: "le user est bien supprimé !",
            })
          )
          .catch((error) =>
            res.status(400).json({
              error,
            })
          );
      }
    })
    .catch((error) =>
      res.status(500).json({
        error,
        message: "impossible de supprimer l utilisateur !",
      })
    );
};
