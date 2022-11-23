'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = "Users"

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users'
    await queryInterface.addColumn(
      options,
      'firstName',
      {
        allowNull: false,
        type: Sequelize.STRING
      }, options),
      await queryInterface.addColumn(
        options,
        'lastName',
        {
          allowNull: false,
          type: Sequelize.STRING
        },
        options)
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users'
    await queryInterface.removeColumn(options, 'firstName', options),
      await queryInterface.removeColumn(options, 'lastName', options)
  }
};
