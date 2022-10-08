const db = require("../models");
const authUser = require("../middleware/authUser")
//Récupération du module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
const fs = require('fs'); //package qui permet de modif




//---------------------------------création d'un comment----------------------------//


exports.createComment = async (req, res) => {

    const UserId = authUser;

    await db.Post.findOne({
        attributes: ["id", "description", "imageUrl"],
        where: { id: req.params.id, UserId: UserId, },
    });

    db.Comment.create({
        content: req.body.content,
        UserId: req.body.userId,
        PostId: req.params.postId,

    })
        .then((res) => {
            res.status(201).json({
                message: 'comment créé !'
            })
        })
        .catch((error) => res.status(400).json({
            error
        }))
    console.log(req.body.userId, 'user comment')
};


// -----------------------trouver tous les comments--------------------------//
exports.getAllComments = (req, res) => {
    db.Comment.findAll({
        where: {
            PostId: req.params.postId,
          },
        attributes: ["id", "content", "UserId"],

        include: [
            {
                model: db.Post,
                attributes: ["id", "description","imageUrl", "UserId"],
            },
            {
            model: db.User,
            attributes: ["id", "description","imageUrl"],
        },
        ],
    })
        /*** si tout est ok ***/
        .then((comments) => res.status(200).send(comments))
        /*** sinon on envoie une erreur ***/
        .catch((error) => res.status(400).send({ error }));
};

//----------------------trouver un comment avec son ID----------------------//
exports.getCommentById = async (req, res) => {

    // On l'identifie par l'ID
    await db.Comment.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: db.Post,
                attributes: ["id", "firstName", "lastName", "image"]
            },

        ],
    })
    then((res) => res.status(200).json({ comments }))
        .catch(error => res.status(500).json({
            error,
        }))
};






//------------------------suppression d'un comment--------------------------//
exports.deletecomment = (req, res) => {
    //récupération dans la base de donnée

    //l'id du comment doit être le même que le paramètre de requête
    db.Comment.findOne({ where: { id: req.params.id } })

        //supprime l'ancienne image du server  
        .then(comment => {

            if (req.file) {
                const filename = comment.imageUrl.split('/images/')[1];
                fs.unlink(`images/${filename}`, () => {
                    comment.destroy({
                        where: {
                            id: req.params.id
                        }
                    })
                        .then(() => res.status(200).json({
                            message: 'le comment est bien supprimé !'
                        }))
                        .catch(error => res.status(400).json({
                            error
                        }))
                })
            } else {
                comment.destroy({
                    where: {
                        id: req.params.id
                    }
                })
                    .then(() => res.status(200).json({
                        message: 'le comment est bien supprimé !'
                    }))
                    .catch(error => res.status(400).json({
                        error
                    }))
            }
        })
        .catch(error => res.status(500).json({
            error,
            message: 'impossible de supprimer le comment !'
        }))


};