const db = require("../db/models")
//Récupération du module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
const fs = require('fs'); //package qui permet de modif
const authUser = require("../middleware/authUser");




//---------------------------------création d'un comment----------------------------//


exports.createComment = async (req, res) => {
const UserId = authUser;
    db.Post.findOne({
        attributes: ["id", "description", "imageUrl", "UserId"],
        where: { id: req.params.id, UserId:UserId},
    }),

        console.log(req.body);
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
            console.log("content", req.body.content)
        })
        .catch((error) => res.status(400).json({
            error
        }))
    console.log(req.body, 'user comment')
};

exports.updateComment = (req, res) => {
    db.Comment.findOne({ where: { id: req.params.id } });
    const commentObjet = req.file ? {
        ...(req.body.comment),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
        : {
            ...req.body
        };

    comment.update({
        ...commentObjet
    }, {
        where: {
            id: req.params.id
        }
    })
        .then(() => res.status(200).json({ message: 'comment modifié !' }))
        .catch((error) => res.status(400).json({ message: error }));
};
// -----------------------trouver tous les comments--------------------------//
exports.getAllComments = (req, res) => {
    db.Comment.findAll({
        where: { id: req.params.id, },
        attributes: ["id", "comment", "UserId"],
        include: [
            {
                model: db.User,
                attributes: ["id", "firstName", "lastName", "imageUrl", "PostId"],
            },
        ],
    })
        .then((comments) => res.status(200).json(comments))
        .catch(error => res.status(400).json({
            error,
            message: 'impossible de récupérer les commentaires'
        }))
};



//----------------------trouver un comment avec son ID----------------------//
exports.getCommentById = async (req, res) => {

    // On l'identifie par l'ID
    await db.Comment.findOne({
        where: { id: req.params.id },
        include: [
            {
                model: db.User,
                attributes: ["id", "firstName", "lastName", "imageUrl", "PostId"]
            },

        ],
    })
    then((res) => res.status(200).json({ comments }))
        .catch(error => res.status(500).json({
            error,
        }))
};






//------------------------suppression d'un comment--------------------------//
exports.deleteComment = (req, res) => {
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