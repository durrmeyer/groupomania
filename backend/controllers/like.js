const db = require("../db/models");



exports.likeUser = async (req, res) => {
 const userId = req.body.userId;
  await db.Like.findOne({
    where: {
      PostId: req.params.id,
      UserId: userId,
    },
  }).then((like) => {
    if (!like) {
      console.log("pas trouvé");
      db.Like.create({
        UserId: userId,
        PostId: req.params.id,
      })
      .then(() => res.status(200).json({ message: "Post liké" }));
    } else {
      console.log(like, "like trouvé")
     db.Like.destroy(
        {
          where: {
            UserId: userId,
            PostId: req.params.id,
          },
        },
        { truncate: true }
      ).then(() => res.status(200).json({ message: "Post disliké" }));
    }
  });
}; // => res.status(200).json({ message: "ok!" }));

/* if (userLike) {
   
  } else {
    await */
