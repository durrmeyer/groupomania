const db = require("../server/models");
const authUser = require("../middleware/authUser")
//Récupération du module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
const fs = require('fs'); //package qui permet de modifconst autUser = require("../middleware/authUser");
const { User } = require("../server/models");



//---------------------------------création d'un post----------------------------//


exports.createPost = async (req, res) => {

  let imageUrl = (req.file) ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : "null";
  const UserId = authUser;

  await db.User.findOne({
    attributes: ["id", "firstName", "lastName", "image"],
    where: { id: UserId },
  });

  db.Post.create({
    description: req.body.description,
    imageUrl: imageUrl,
    UserId: req.body.userId,

    include: [
      {
        associate: db.User,
        include: ["user"]
      },
    ],

  })
    .then(() => {
      res.status(201).json({
        message: 'post créé !'
      })
    })
    .catch((error) => res.status(400).json({
      error
    }))
  console.log(req.body.userId, 'user post')
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
    };

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

// -----------------------trouver tous les posts--------------------------//
exports.getAllPosts = (req, res) => {
  db.Post.findAll({
    attributes: ["id", "description", "imageUrl", "UserId"],

   include: [
      {
        model: db.User,
        attributes: ["id", "lastName", "firstName", "image"],
      },
    ],

    /*{
      model: db.Comment,
      attributes: ["id", "content", "UserId",],
 
      include: [
        {
          model: db.User,
          attributes: ["firstName", "imageUrl"],
        },
      ],
    },
  ],*/
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
        attributes: ["id", "firstName", "lastName", "image",]
      },
    ],
    /*{
 model: db.Comment,
 order: [["createdAt", "DESC"]],
 attributes: ["content", "fistName", "UserId"],
 include: [
   {
     model: db.User,
     attributes: ["imageUrl", "firstName"],
   },
 ],
},*/

  })

    .then(post => res.status(200).json({
      post
    }))
    .catch(error => res.status(500).json({
      error,

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