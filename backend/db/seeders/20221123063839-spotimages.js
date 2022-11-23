'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = "SpotImages"

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert(options, [
      {
        url: 'diammondbar.png',
        preview: true,
        spotId: 1
      },
      {
        url: 'losangeles.png',
        preview: true,
        spotId: 2
      },
      {
        url: 'fullerton.png',
        preview: true,
        spotId: 3
      },
      {
        url: 'miami.png',
        preview: true,
        spotId: 4
      }
    ])

  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.delete(options, {
      [Op.or]: [
        {
          url: 'diammondbar.png',
          preview: true,
          spotId: 1
        },
        {
          url: 'losangeles.png',
          preview: true,
          spotId: 2
        },
        {
          url: 'fullerton.png',
          preview: true,
          spotId: 3
        },
        {
          url: 'miami.png',
          preview: true,
          spotId: 4
        }
      ]
    }, {})
  }
};
