const db = require("../db/models");

//Récupération du module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
const fs = require("fs"); //package qui permet de modification

//---------------------------------création d'un post----------------------------//

exports.createPost = async (req, res) => {
  let imageUrl = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : "null";

  await db.User.findOne({
    attributes: ["id", "firstName", "lastName", "imageUrl"],
    where: { id: req.body.UserId },
  });

  db.Post.create({
    description: req.body.description,
    imageUrl: imageUrl,
    UserId: req.body.UserId,

    include: [
      {
        associate: db.User,
        attributes: ["id", "lastName", "firstName", "imageUrl"],
      },
    ],
  })
    .then(() => {
      res.status(201).json({
        description: req.body.description,
        imageUrl: imageUrl,
        UserId: req.body.userId,
        message: "post créé !",
      });
    })
    .catch((error) =>
      res.status(400).json({
        error,
      })
    );
  console.log(req.body, "user post");
};

// -----------------------modification du post-----------------------//
exports.updatePost = (req, res) => {
  let post = db.Post.findOne({ where: { id: req.params.id } });

  imageUrl = req.file
    ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
    : "null";

  db.Post.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then(() => {
      db.Post.update(
        {
          description: req.body.description,
          imageUrl: imageUrl,
        },

        {
          where: { id: req.params.id },
        }
      )
        .then(() =>
          res
            .status(200)
            .json({
              description: post.description,
              imageUrl: post.imageUrl,
              message: "Post mis à jour !",
            })
        )
        .catch((err) => res.status(400).json({ err }));
    })
    .catch((err) => res.status(500).json({ err }));
};
// -----------------------trouver tous les posts--------------------------//
exports.getAllPosts = async (req, res) => {
  db.Post.findAll({
    attributes: ["id", "description", "imageUrl", "UserId", "createdAt"],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.User,
        attributes: ["id", "lastName", "firstName", "imageUrl"],
      },
      {
        model: db.Like,
        attributes: ["UserId"],
        include: [
          {
            model: db.User,
            attributes: ["id", "firstName", "lastName", "imageUrl"],
          },
        ],
      },
      {
        model: db.Comment,
        attributes: ["id", "content", "UserId", "createdAt"],
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.User,
            attributes: ["id", "firstName", "lastName", "imageUrl"],
          },
        ],
      },
    ],
  })

    /*** si tout est ok ***/
    .then((posts) => res.status(200).send(posts))
    /*** sinon on envoie une erreur ***/
    .catch((error) => res.status(400).send({ error }));
};

//----------------------trouver un post avec son ID----------------------//
exports.getPostById = async (req, res) => {
  // On l'identifie par l'ID
  await db.Post.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: db.User,
        attributes: ["id", "firstName", "lastName", "imageUrl"],
      },
      {
        model: db.Like,
        attributes: ["UserId"],
        include: [
          {
            model: db.User,
            attributes: ["id", "firstName", "lastName"],
          },
        ],
      },
      {
        model: db.Comment,
        attributes: ["id", "content", "UserId", "createdAt"],
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.User,
            attributes: ["firstName", "lastName", "imageUrl"],
          },
        ],
      },
    ],
  })

    .then((post) =>
      res.status(200).json({
        post,
      })
    )
    .catch((error) =>
      res.status(500).json({
        error,
      })
    );
};

//------------------------suppression d'un post--------------------------//
exports.deletePost = (req, res) => {
  //récupération dans la base de donnée

  //l'id du post doit être le même que le paramètre de requête
  db.Post.findOne({ where: { id: req.params.id } })

    //supprime l'ancienne image du server
    .then((post) => {
      if (req.file) {
        const filename = post.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          post
            .destroy({
              where: {
                id: req.params.id,
              },
            })
            .then(() =>
              res.status(200).json({
                message: "le post est bien supprimé !",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error,
              })
            );
        });
      } else {
        post
          .destroy({
            where: {
              id: req.params.id,
            },
          })
          .then(() =>
            res.status(200).json({
              message: "le post est bien supprimé !",
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
        message: "impossible de supprimer le post !",
      })
    );
};
