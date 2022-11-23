'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = "Users"

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
