'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = "Bookings"

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        startDate: new Date("2023-06-19"),
        endDate: new Date("2023-06-21"),
        spotId: 2,
        userId: 2
      },
      {
        startDate: new Date("2023-08-08"),
        endDate: new Date("2023-08-11"),
        spotId: 1,
        userId: 3
      },
      {
        startDate: new Date("2023-10-21"),
        endDate: new Date("2023-10-24"),
        spotId: 4,
        userId: 1
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      [Op.or]: [
        {
          startDate: new Date("2023-06-19"),
          endDate: new Date("2023-06-21"),
          spotId: 2,
          userId: 2
        },
        {
          startDate: new Date("2023-08-08"),
          endDate: new Date("2023-08-11"),
          spotId: 1,
          userId: 3
        },
        {
          startDate: new Date("2023-10-21"),
          endDate: new Date("2023-10-24"),
          spotId: 4,
          userId: 1
        }
      ]
    }, {});
  }
};
