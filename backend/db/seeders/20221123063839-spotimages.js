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
        url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
        preview: true,
        spotId: 1
      },
      {
        url: 'https://cdnb.artstation.com/p/assets/images/images/052/859/757/original/clo-challenge-13-room-05-animado.gif?1660837128',
        preview: true,
        spotId: 2
      },
      {
        url: 'https://cdna.artstation.com/p/assets/images/images/055/676/644/large/tutu-.jpg?1667492960',
        preview: true,
        spotId: 3
      },
      {
        url: 'https://cdna.artstation.com/p/assets/images/images/052/771/872/large/griva_avirg-room-jpeg.jpg?1660644816',
        preview: true,
        spotId: 4
      },
      {
        url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
        preview: true,
        spotId: 5
      },
      {
        url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
        preview: true,
        spotId: 6
      },
      {
        url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
        preview: true,
        spotId: 7
      },
      {
        url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
        preview: true,
        spotId: 8
      },
      {
        url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
        preview: true,
        spotId: 9
      },
      {
        url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
        preview: true,
        spotId: 10
      },
      {
        url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
        preview: true,
        spotId: 11
      },
      {
        url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
        preview: true,
        spotId: 12
      },
      {
        url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
        preview: true,
        spotId: 13
      },
      {
        url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
        preview: true,
        spotId: 14
      },
      {
        url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
        preview: true,
        spotId: 15
      },
      {
        url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
        preview: true,
        spotId: 16
      },
      {
        url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
        preview: true,
        spotId: 17
      },
    ], {})

  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      [Op.or]: [
        {
          url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
          preview: true,
          spotId: 1
        },
        {
          url: 'https://cdnb.artstation.com/p/assets/images/images/052/859/757/original/clo-challenge-13-room-05-animado.gif?1660837128',
          preview: true,
          spotId: 2
        },
        {
          url: 'https://cdna.artstation.com/p/assets/images/images/055/676/644/large/tutu-.jpg?1667492960',
          preview: true,
          spotId: 3
        },
        {
          url: 'https://cdna.artstation.com/p/assets/images/images/052/771/872/large/griva_avirg-room-jpeg.jpg?1660644816',
          preview: true,
          spotId: 4
        },
        {
          url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
          preview: true,
          spotId: 5
        },
        {
          url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
          preview: true,
          spotId: 6
        },
        {
          url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
          preview: true,
          spotId: 7
        },
        {
          url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
          preview: true,
          spotId: 8
        },
        {
          url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
          preview: true,
          spotId: 9
        },
        {
          url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
          preview: true,
          spotId: 10
        },
        {
          url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
          preview: true,
          spotId: 11
        },
        {
          url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
          preview: true,
          spotId: 12
        },
        {
          url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
          preview: true,
          spotId: 13
        },
        {
          url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
          preview: true,
          spotId: 14
        },
        {
          url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
          preview: true,
          spotId: 15
        },
        {
          url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
          preview: true,
          spotId: 16
        },
        {
          url: 'https://cdnb.artstation.com/p/assets/images/images/045/701/061/large/bella-quarto-fofo.jpg?1643312182',
          preview: true,
          spotId: 17
        },
      ]
    }, {})
  }
};
