const db = require("../db/models")
const authUser = require("../middleware/authUser");

exports.likeUser = (req, res) => {
  const UserId = authUser;
 
 db.Like.findOne({
  attributes: [ "PostId", "UserId"],
    where: {
      UserId: UserId,
      PostId: PostId,
    },
  });
  if (userLike) {
    db.Like.destroy(
      { where: { UserId: UserId, PostId: postId } },
      { truncate: true }
    )
      .then(() => {
        res.status(200).json({
          message: "vous n'aimez plus ce post"

        });
      });
  } else {
    db.Like.create({
      UserId: UserId,
      PostId: req.params.postId,
    })
      .then(() => {
        res.status(201).json({
          message: "like ce post"
        })
      })
      .catch((error) => res.status(400).json({
        error
      }))
  };
};