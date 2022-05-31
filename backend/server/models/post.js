'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    // static associate(models) {
    // define association here
    //models.Article.belongsTo(models.User, {
    //  foreignKey: {
    //  allowNull: false
    //  }, onDelete:'CASCADE', 
    //  }),
    //  models.Post.hasMany(models.Comment )
    // models.Post.hasMany(models.Like)

    // }
  }
  Post.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    published: DataTypes.BOOLEAN,
    comment_id: DataTypes.STRING,
    //link: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};