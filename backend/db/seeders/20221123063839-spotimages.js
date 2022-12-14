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
        url: 'https://live.staticflickr.com/33/46332737_45532d3cbc_n.jpg',
        preview: true,
        spotId: 1
      },
      {
        url: 'https://live.staticflickr.com/3107/3129380746_1b1d4aec81_n.jpg',
        preview: true,
        spotId: 2
      },
      {
        url: 'https://live.staticflickr.com/6008/5944226551_b244292223_n.jpg',
        preview: true,
        spotId: 3
      },
      {
        url: 'https://live.staticflickr.com/16/19871161_85ae9ae99e_n.jpg',
        preview: true,
        spotId: 4
      }
    ], {})

  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      [Op.or]: [
        {
          url: 'https://live.staticflickr.com/33/46332737_45532d3cbc_n.jpg',
          preview: true,
          spotId: 1
        },
        {
          url: 'https://live.staticflickr.com/3107/3129380746_1b1d4aec81_n.jpg',
          preview: true,
          spotId: 2
        },
        {
          url: 'https://live.staticflickr.com/6008/5944226551_b244292223_n.jpg',
          preview: true,
          spotId: 3
        },
        {
          url: 'https://live.staticflickr.com/16/19871161_85ae9ae99e_n.jpg',
          preview: true,
          spotId: 4
        }
      ]
    }, {})
  }
};
