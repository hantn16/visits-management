'use strict';
const { uuid } = require('uuidv4');
const { relationships } = require('./initial.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'relationships',
      relationships.map((group) => ({ id: uuid(), ...group, createdAt: new Date(), updatedAt: new Date() }))
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
