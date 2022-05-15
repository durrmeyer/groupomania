const { DataTypes } = require('sequelize')
const DB = require('../config//db.config')


    const Role = DB.define('Roles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        
      },
    },
      {
        paranoid: true
      });
module.exports = Role