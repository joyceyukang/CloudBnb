'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Users',
      'firstName',
      {
        allowNull: false,
        type: Sequelize.STRING
      }),
      await queryInterface.addColumn(
        'Users',
        'lastName',
        {
          allowNull: false,
          type: Sequelize.STRING
        })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'firstName'),
      await queryInterface.removeColumn('Users', 'lastName')
  }
};
