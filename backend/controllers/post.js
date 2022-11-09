const db = require("../db/models");
const authUser = require("../middleware/authUser")
//Récupération du module 'file system' de Node permettant de gérer ici les téléchargements et modifications d'images
const fs = require('fs'); //package qui permet de modifconst autUser = require("../middleware/authUser");




//---------------------------------création d'un post----------------------------//


exports.createPost = async (req, res) => {

  let imageUrl = (req.file) ? `${req.protocol}://${req.get("host")}/images/${req.file.filename}` : "null";
  const UserId = authUser;

  await db.User.findOne({
    attributes: ["id", "firstName", "lastName", "imageUrl"],
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
        attributes: ["id", "lastName", "firstName", "imageUrl"],
      },
      {
        model: db.Comment,
        attributes: ["id","content","UserId"],
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
        attributes: ["id", "firstName", "lastName", "imageUrl",]
      },
      {
        model: db.Comment,
        order: [["createdAt", "DESC"]],
        attributes: ["id","content","UserId"],
        include: [
          {
            model: db.User,
            attributes: [ "firstName","lastName","imageUrl"],
          },
        ],
       },
    ],
    

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









