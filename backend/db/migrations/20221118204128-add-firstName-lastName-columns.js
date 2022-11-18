'use strict';


let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn(
      'Users',
      'firstName',
      {
        allowNull: false,
        type: Sequelize.STRING
      }, options),
      await queryInterface.addColumn(
        'Users',
        'lastName',
        {
          allowNull: false,
          type: Sequelize.STRING
        },
        options)
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'firstName', options),
      await queryInterface.removeColumn('Users', 'lastName', options)
  }
};
