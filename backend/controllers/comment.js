const db = require("../db/models")
//Récupération du module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
const fs = require('fs'); //package qui permet de modif
const authUser = require("../middleware/authUser");

//---------------------------------création d'un comment----------------------------//
exports.createComment = async (req, res) => {
    const UserId = authUser;
    db.Post.findOne({
        attributes: ["id", "description", "imageUrl", "UserId"],
        where: { id: req.params.id, UserId: UserId },
    }),

        db.Comment.create({
            content: req.body.content,
            UserId: req.body.UserId,
            PostId: req.params.id,

        })
            .then((res) => {
                res.status(201).json({
                    content: req.body.content,
                    userId: req.body.userId,
                    PostId: req.params.id,
                    message: 'comment créé !'
                })

            })
            .catch((error) => res.status(400).json({
                error
            }))
    console.log(req.body, 'user comment')
};
exports.getAllComments = (req, res) => {
    db.Comment.findAll({
      where: {
        PostId: req.params.postId,
      },
      attributes: ["id", "content", "createdAt", "UserId"],
  
      order: [["createdAt", "DESC"]],
  
      include: [
        {
          model: db.User,
          attributes: ["id", "lastName", "firstName", "image"],
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
      db.Comment.destroy(
        {
          where: {
            id: req.params.id,
          },
        },
        { truncate: true }
      )
        .then(() => res.status(200).json({ message: "le commentaire est supprimé !" }))
    
        .catch((error) => res.status(400).json({ error }));
    };