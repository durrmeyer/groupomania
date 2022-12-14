const db = require("../db/models");


exports.likeUser =  (req, res) => {
  console.log( req.body.UserId);
 db.Like.findOne({
    where: {
      PostId: req.params.id,
      UserId: req.body.UserId,
    },
  }).then((like) => {
    if (!like) {
      console.log( req.body.UserId);
      db.Like.create({
        UserId: req.body.UserId,
        PostId: req.params.id,
      }).then(() => res.status(200).json({ message: "Post liké" }));
    } else {
      db.Like.destroy(
        {
          where: {
            UserId: req.body.UserId,
            PostId: req.params.id,
          },
        },
       )
        .then(() => res.status(200).json({ message: "Post disliké" }))
        .catch((err) => {
          err;
        });
    }
  });
};
