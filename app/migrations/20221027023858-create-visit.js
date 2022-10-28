'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Visits', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      eventId: {
        type: Sequelize.UUID,
      },
      visitorId: {
        type: Sequelize.UUID,
      },
      visiteeId: {
        type: Sequelize.UUID,
      },
      itemsId: {
        type: Sequelize.UUID,
      },
      time: {
        type: Sequelize.DATE,
      },
      description: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Visits');
  },
};
