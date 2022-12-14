'use strict';

/** @type {import('sequelize-cli').Migration} */

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'michaelscott@gmail.com',
        username: 'michaelscott',
        hashedPassword: bcrypt.hashSync('password1'),
        firstName: 'Michael',
        lastName: 'Scott',
      },
      {
        email: 'jimhalpert@gmail.com',
        username: 'jimhalpert',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'Jim',
        lastName: 'Halpert',
      },
      {
        email: 'dwightschrute@gmail.com',
        username: 'dwightschrute',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Dwight',
        lastName: 'Schrute',
      }
    ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['michaelscott', 'jimhalpert', 'dwightschrute'] }
    }, {});
  }
};
