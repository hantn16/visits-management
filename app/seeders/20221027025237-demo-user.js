'use strict';
const { users } = require('./initial.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Users',
      users.map((user) => ({ ...user, createdAt: new Date(), updatedAt: new Date() }))
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
