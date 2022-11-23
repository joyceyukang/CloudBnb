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
        email: 'joyceyukang@gmail.com',
        username: 'joyceyukang',
        hashedPassword: bcrypt.hashSync('password1'),
        firstName: 'Joyce',
        lastName: 'Kang',
      },
      {
        email: 'johnwsmith@gmail.com',
        username: 'jsmith1',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'John',
        lastName: 'Smith',
      },
      {
        email: 'katiedoe@gmail.com',
        username: 'katiedough2',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Katie',
        lastName: 'Doe',
      }
    ], {});
  },
  
  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['joyceyukang', 'jsmith1', 'katiedough2'] }
    }, {});
  }
};
