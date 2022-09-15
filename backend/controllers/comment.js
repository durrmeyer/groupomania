
/*** importer les modèles ***/
const db = require('..')
//const authUser = require("../middleware/auth");
fs = require('fs')

/***Création  d'un commentaire ***/
exports.createComment = (req, res) => {

    db.Comment.create({
        content: req.body.content,
        userId: req.body.userId,
        postId: req.body.postId,
      
    })
    .then((comment) => {
        console.log(">> Created comment: " + JSON.stringify(comment, null, 4));
        return comment;
      })
        /*.then(() => res.status(201).json({
            userId: req.body.userId,
            postId: req.body.postId,
            content: req.body.content
        }))*/
        .catch(error => res.status(400).json({
            error,
            message: 'impossible de publier un commentaire'
        }))
},


    /*** Affichage  des commentaires ***/
    exports.getComments = (req, res, next) => {
        db.Comment.findAll()
            .then((comments) => res.status(200).json(comments))
            .catch(error => res.status(400).json({
                error,
                message: 'commentaire non récupéré'
            }))
    };
/*** Supprimer son commentaire ***/
exports.deleteComment = (req, res, next) => {
    db.Comment.findOne({
        where: {
            id: req.params.id
        }
    })
        .then(comment => {
            if (comment.userId !== authUser(req)) {
                return res.status(401).json({
                    error
                })
            }
            comment.delete()
                .then(() => res.status(200).json({
                    message: 'le commentaire est bien supprimé !'
                }))
                .catch(error => res.status(409).json({
                    error
                }))
        });


}