const db = require("../server/models");
const Post = db.Post;
const Comment = db.Comment;

// Create and Save a new article
exports.create = (req, res) => {
 Post.create({
     title: req.body.title,
     description: req.body.description,
     published: req.body.published ? req.body.published : false,
 })
 .then((post) => {
     res.status(200).json({
         status: true,
         message: ' article a bien été crée',
         
     })
     console.log(" Created post: " + JSON.stringify(post, null,));
     return article;
 }) 
 .catch((err) => {
  console.log(" Error while creating article: ", err);
});
};
// Retrieve all articles from the database.
exports.findAll = (req, res) => {
  Post.findAll(/*{
    include: ["comments"]
  }*/).then((posts) => {
      res.status(200).json({
        status: true,
        data: posts,
      })
  })
};
// Find a single article with an id

    exports.findByPk = (req, res) => {
        Post.findByPk(req.params.postId, {include: ["comments"]}).then((post) => {
          res.status(200).json({
            status: true,
            data: post,
          });
        });
      };
// Update a Article by the id in the request
exports.update = (req, res) => {
    const id = req.params.postId;
    Post.update(
      {
        title: req.body.title,
        description: req.body.description,
        
      },
      { where: { id: req.params.postId } }
    ).then(() => {
      res.status(200).json({
          status: true,
          message: "article updated successfully with id = " + id
      });
    });
  };
// Delete a Article with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.postId;
    Post.destroy({
      where: { id: id },
    }).then(() => {
      res.status(200).json({
          status: true,
          message: "article deleted successfully with id = " + id
      });
    });
  };
// Delete all Articless from the database.
exports.deleteAll = (req, res) => {
  Post.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Posts were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all posts."
      });
    });
};

// Find all published posts
exports.findAllPublished = (req, res) => {
  Post.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
