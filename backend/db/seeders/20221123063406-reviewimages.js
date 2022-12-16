'use strict';

/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = "ReviewImages"

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        url: 'nashua.png',
        reviewId: 1
      },
      {
        url: 'scranton.png',
        reviewId: 2
      },
      {
        url: 'stamford.png',
        reviewId: 3
      },
      {
        url: 'buffalo.png',
        reviewId: 4
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      [Op.or]: [
        {
          url: 'nashua.png',
          reviewId: 1
        },
        {
          url: 'scranton.png',
          reviewId: 2
        },
        {
          url: 'stamford.png',
          reviewId: 3
        },
        {
          url: 'buffalo.png',
          reviewId: 4
        },
    ]}, {})
  }
};
