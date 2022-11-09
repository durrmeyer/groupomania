const db = require("../db/models")

//Récupération du module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
const fs = require('fs'); //package qui permet de modif

exports.likeUser = (req, res) => {
    let like = req.body.like;
    // On prend le userID
    let userId = req.body.userId;
    // On prend l'id du post
    let postId = req.params.id;
    //l'utilisateur aime un post
    if (like === 1) {
      // On ajoute 1 like et on l'envoie dans le tableau "usersLiked"
  
      Post.updateOne({ _id: postId }, { $inc: { likes: +1 }, $push: { usersLiked: postId } })
        .then(() => res.status(200).json({ message: 'Like ajouté !' }))
        .catch((error) => res.status(400).json({ error }));
    } else if (like === -1) {
      //l'utilisateur n'aime pas une post//
      // On ajoute 1 dislike et on l'envoie dans le tableau "usersDisliked"
      Post.updateOne({ _id: postId }, { $inc: { dislikes: +1 }, $push: { usersDisliked: userId } })
        .then(() => res.status(200).json({ message: 'Dislike ajouté !' }))
        .catch((error) => res.status(400).json({ error }));
    } else if (like === 0) {
      // Si like === 0 l'utilisateur supprime son vote
      Post.findOne({ _id: postId }).then((post) => {
        // Si le tableau "userLiked" contient l'ID de l'utilisateur
        if (post.usersLiked.includes(userId)) {
          // On enlève un like du tableau "userLiked"
          post
            .updateOne({ _id: postId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
            .then(() => {
              res.status(200).json({ message: 'Like supprimé !' });
            })
            .catch((error) => res.status(400).json({ error }));
        } else if (post.usersDisliked.includes(postId)) {
          // Si le tableau "userDisliked" contient l'ID de l'utilisateur
          // On enlève un dislike du tableau "userDisliked"
          post
            .updateOne({ _id: postId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
            .then(() => {
              res.status(200).json({ message: 'Dislike supprimé !' });
            })
            .catch((error) => res.status(400).json({ error }));
        }
      });
    }
  }