
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type:Sequelize.INTEGER(10),
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      types:Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      types:Sequelize.STRING,
      allowNull: false,
    },
    email: {
      types:Sequelize.STRING,
      allowNull: false
    },
    password: {
      types:Sequelize.STRING,
      allowNull: false
    },


  });
  return User;
};
