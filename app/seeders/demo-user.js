'use strict';
const { uuid } = require('uuidv4');
const bcrypt = require('bcryptjs');
const { users } = require('./initial.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'Users',
      users.map((user) => ({
        id: uuid(),
        ...user,
        password: bcrypt.hashSync(user.password, 8),
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
