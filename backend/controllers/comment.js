const db = require("../server/models");

const Comment = db.Comment;
const Article = db.Article;


    /** création d'un commentaire **/

  exports.createComment =  (articleId, comment) => {
    try {
      const comment = await Comment.create({
        firstName: comment.firstName,
        text: comment.text,
        articleId: articleId,
      });
      console.log(" Created comment: " + JSON.stringify(comment, null));
      return comment;
    } catch (err) {
      console.log(" Error while creating comment: ", err);
    }
  };
  exports.findCommentById = async (id) => {
    try {
      const comment = await Comment.findByPk(id, { include: ["article"] });
      return comment;
    } catch (err) {
      console.log(" Error while finding comment: ", err);
    }
  };
