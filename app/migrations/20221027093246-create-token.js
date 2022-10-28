'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tokens', {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      token: {
        type: Sequelize.STRING,
      },
      userId: {
        type: Sequelize.UUID,
      },
      type: {
        type: Sequelize.STRING,
      },
      expires: {
        type: Sequelize.DATE,
      },
      blacklisted: {
        type: Sequelize.TINYINT(1),
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
    await queryInterface.dropTable('Tokens');
  },
};
