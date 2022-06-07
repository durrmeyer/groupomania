'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {

  }
  Post.init({
    firstName: DataTypes.STRING,//userId
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    likes: DataTypes.INTEGER,
    dislikes: DataTypes.INTEGER,
    usersLiked: DataTypes.STRING,
    usersDisliked: DataTypes.STRING
  },
    {
      sequelize,
      modelName: 'Post',
    });
  return Post;
};