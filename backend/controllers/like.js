const db = require("../db/models");
const authUser = require("../middleware/authUser");

exports.likeUser = async (req, res) => {
  await db.Like.findOne({
    where: {
      PostId: req.params.id,
      UserId: authUser,
    },
  }).then((like) => {
    if (!like) {
      console.log( req.body.userId);
      db.Like.create({
        UserId: req.body.userId,
        PostId: req.params.id,
      }).then(() => res.status(200).json({ message: "Post liké" }));
    } else {
      db.Like.destroy(
        {
          where: {
            UserId: req.body.userId,
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
