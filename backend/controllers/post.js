const db = require("../server/models");
const jwt = require("jsonwebtoken");
//Récupération du module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
const fs = require('fs'); //package qui permet de modifconst autUser = require("../middleware/authUser");
const authUser = require("../middleware/authUser")
//---------------------------------création d'un post----------------------------//


exports.createPost = (req, res) => {
  // const token = req.headers.authorization.split(' ')[1];
  //const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
  //const userId = decodedToken.userId;
  //console.log(userId, 'token?')



  const image = (req.file) ? `${req.protocol}://${req.get("host")}/images/${req.files.filename}` : "";
  db.User.findOne({
    attributes: ["id", "firstName", "lastName", "imageUrl"],
    where: { id: req.body.userId },
  })
    .then(() => {
      imageUrl = image;
    })

  db.Post.create({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
    Content: req.body.content,
    imageUrl: image,
    likes: [0],
  })
    .then(() => res.status(201).json({
      message: 'post créé !'
    }))
    .catch((error) => res.status(400).json({
      error: 'post invalid',
      message: 'Vous ne pouvez pas publier un post'
    }))

};





// -----------------------modification du post-----------------------//
exports.updatePost = (req, res) => {
  db.Post.findOne({ where: { id: req.params.id } });
  const postObjet = req.file ? {
    ...(req.body.post),
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
    : {
      ...req.body
    }; //fichier n'existe pas

  Post.update({
    ...postObjet
  }, {
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(200).json({ message: 'Post modifié !' }))
    .catch((error) => res.status(400).json({ message: error }));
};

// ---------------------------------------base de donnée--------------------------------------------//
// -----------------------trouver tous les posts--------------------------//
exports.getAllPosts = (req, res, next) => {
  /*** on récupère tous les posts ***/
  db.Post.findAll({
    attributes: ["id", "title", "description", "imageUrl", "likes", "userId"],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.User,
        attributes: ["id", "firstName", "lastName", "imageUrl"]

      },

    ],

  })
    /*** si tout est ok ***/
    .then(posts => res.status(200).json({
      posts
    }))
    /*** sinon on envoie une erreur ***/
    .catch(error => res.status(400).json({
      error
    }))

};
/*exports.getAllPosts = (req, res) => {
  db.Post.findAll({
    attributes: ["id", "title", "description", "imageUrl", "likes", "createAt", "userId"],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: db.User,
        attributes: ["id", "firstName", "lastName", "imageUrl", "like", "createdAt", "userId"],
        order: [["createdAt", "DESC"]],
        include: [
          {
            model: db.User,
            attributes: ["id", "firstName", "lastName", "comment",],
          },
          {
            model: db.Comment,
            order: [["createdAt", "DESC"]],
            attributes: ["id", "comment", "UserId"],
            include: [
              {
                model: db.User,
                attributes: ["firstName", "lastName", "imageUrl"],
              },
            ],
          },
        ],

      }
    ],
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(400).json({ message: error }));


};*/
//----------------------trouver un post avec son ID----------------------//
exports.getPost = (req, res) => {
  // On l'identifie par l'ID
  db.Post.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(post => res.status(200).json({
      post
    }))
    .catch(error => res.status(404).json({
      error,
      message: 'post non récupèré'
    }))
};

//------------------------suppression d'un post--------------------------//
exports.deletePost = (req, res) => {
  //récupération dans la base de donnée

  //l'id du post doit être le même que le paramètre de requête
  db.Post.findOne({ where: { id: req.params.id } })

    //supprime l'ancienne image du server  
    .then(post => {

      if (req.file) {
        const filename = post.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          post.destroy({
            where: {
              id: req.params.id
            }
          })
            .then(() => res.status(200).json({
              message: 'le post est bien supprimé !'
            }))
            .catch(error => res.status(400).json({
              error
            }))
        })
      } else {
        post.destroy({
          where: {
            id: req.params.id
          }
        })
          .then(() => res.status(200).json({
            message: 'le post est bien supprimé !'
          }))
          .catch(error => res.status(400).json({
            error
          }))
      }
    })
    .catch(error => res.status(500).json({
      error,
      message: 'impossible de supprimer le post !'
    }))
};





// supprimer le post dans la base de donnée



////////////////////////////////////////////    LIKE   OU    DISLIKE  ////////////////////////////////////////////////////////////

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