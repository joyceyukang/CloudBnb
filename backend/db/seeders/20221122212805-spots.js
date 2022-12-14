'use strict';


/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Spots'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '1234',
        city: 'Scranton',
        state: 'PA',
        country: 'United States of America',
        lat: 34.0286,
        lng: 117.8103,
        name: 'Scranton',
        description: 'A beautiful six-story office in the urban streets of Scranton',
        price: 450,
      },
      {
        ownerId: 3,
        address: '5678',
        city: 'Nashua',
        state: 'NH',
        country: 'United States of America',
        lat: 34.0522,
        lng: 118.2437,
        name: 'Nashua',
        description: 'Chic office in downtown Nashua near famous museums and restaurants authentic to the city.',
        price: 300,
      },
      {
        ownerId: 1,
        address: '9012',
        city: 'Buffalo',
        state: 'NY',
        country: 'United States of America',
        lat: 33.8704,
        lng: 117.9242,
        name: 'Buffalo',
        description: 'A dainty vintage office in the quiet neighborhoods of Buffalo.',
        price: 500,
      },
      {
        ownerId: 2,
        address: '1357',
        city: 'Stamford',
        state: 'CT',
        country: 'United States of America',
        lat: 50.8704,
        lng: 120.9242,
        name: 'Stamford',
        description: 'A relaxing getaway by the calming nature of Conneticut.',
        price: 575,
      }
    ], {})
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      [Op.or]: [
        {
          ownerId: 1,
          address: '1234',
          city: 'Scranton',
          state: 'PA',
          country: 'United States of America',
          lat: 34.0286,
          lng: 117.8103,
          name: 'Scranton',
          description: 'A beautiful six-story office in the urban streets of Scranton',
          price: 450,
        },
        {
          ownerId: 3,
          address: '5678',
          city: 'Nashua',
          state: 'NH',
          country: 'United States of America',
          lat: 34.0522,
          lng: 118.2437,
          name: 'Nashua',
          description: 'Chic office in downtown Nashua near famous museums and restaurants authentic to the city.',
          price: 300,
        },
        {
          ownerId: 1,
          address: '9012',
          city: 'Buffalo',
          state: 'NY',
          country: 'United States of America',
          lat: 33.8704,
          lng: 117.9242,
          name: 'Buffalo',
          description: 'A dainty vintage office in the quiet neighborhoods of Buffalo.',
          price: 500,
        },
        {
          ownerId: 2,
          address: '1357',
          city: 'Stamford',
          state: 'CT',
          country: 'United States of America',
          lat: 50.8704,
          lng: 120.9242,
          name: 'Stamford',
          description: 'A relaxing getaway by the calming nature of Conneticut.',
          price: 575,
        }
      ]
    }, {})
  }
};
