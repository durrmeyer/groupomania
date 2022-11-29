const db = require("../db/models");
const fs = require("fs");

exports.likeUser = (req, res) => {
  db.Like.findOne({
    where: {
      UserId: req.body.userId,
      PostId: req.params.id,
    },
  });
  console.log(req.body.userId, "tdvhyujftyuftyu");
  console.log(req.body, "LIKEUSER");

  // Si oui on le supprime de la BDD
  db.Like.destroy(
    {
      where: {
        UserId: req.body.userId,
        PostId: req.params.id,
      },
    },
    { truncate: true }
  );
  res.status(200).json({ message: "Post disliké" });

  // Sinon le rajoute
  db.Like.create({
    PostId: req.params.id,
  });
  res.status(201).json({ messageRetour: "Post liké" });
};
