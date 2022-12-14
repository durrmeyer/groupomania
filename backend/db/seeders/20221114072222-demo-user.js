'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [{
      firstName: 'Camille',
      lastName: 'Techer',
      imageUrl:'',
      email: 'camille@groupomania.com',
      password:'Groupomaniatest974.',
      RoleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      firstName: 'Pascal',
      lastName: 'Dupond',
      email: 'pascal@groupomania.com',
      password:'pascalTestGroup.',
      RoleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
