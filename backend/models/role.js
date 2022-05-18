'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {

    static associate(models) {

    }
  }
  Role.init({
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: { type: DataTypes.STRING },
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};