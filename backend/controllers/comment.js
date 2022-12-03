const db = require("../db/models");
const authUser = require("../middleware/authUser");
//---------------------------------création d'un comment----------------------------//
exports.createComment = async (req, res) => {
  db.Post.findOne({
    where: {
      id: req.params.id,
      UserId: authUser,
    },
  });

  db.Comment.create({
    content: req.body.content,
    UserId: req.body.UserId,
    PostId: req.params.id,
  })

    .then(() =>
      res.status(201).json({
        message: "Commentaire ajouté !",
      })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllComments = (req, res) => {
  db.Comment.findAll({
    where: {
      PostId: req.params.id,
    },
    attributes: ["id", "content", "createdAt", "UserId"],

    order: [["createdAt", "DESC"]],

    include: [
      {
        model: db.User,
        attributes: ["id", "lastName", "firstName", "imageUrl"],
      },
    ],
  })
    .then((comments) => res.status(200).json(comments))

    .catch((error) => res.status(500).json({ error }));
};

//------------------------suppression --------------------------//
exports.deleteComment = (req, res) => {
  db.Comment.findOne({
    where: {
      id: req.params.id,
    },
  });
  db.Comment.destroy({ where: { id: req.params.id } }, { truncate: true })
    .then(() =>
      res.status(200).json({ message: "le commentaire est supprimé !" })
    )
    .catch((error) => res.status(400).json({ error }));
};
