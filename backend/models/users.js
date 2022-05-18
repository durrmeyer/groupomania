'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {


  }
  User.init({
    id: {
      type: DataTypes.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,

      required: true
    },
    lastName: {
      type: DataTypes.STRING,

      required: true
    },
    email: {
      type: DataTypes.STRING,

      unique: true
    },
    password: {
      type: DataTypes.STRING,

      required: true
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
    }

  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};