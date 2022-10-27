'use strict';
const { allcode } = require('./initial.json');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      'AllCodes',
      allcode.map((item) => ({
        ...item,
        createdAt: new Date(),
        updatedAt: new Date(),
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('AllCodes', null, {});
  },
};
