'use strict';


/** @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

options.tableName = 'Spots'

module.exports = {
  async up (queryInterface, Sequelize) {
      await queryInterface.bulkInsert(options, [
        {
          ownerId: 1,
          address: '1234',
          city: 'Diamond Bar',
          state: 'CA',
          country: 'United States of America',
          lat: 34.0286,
          lng: 117.8103,
          name: 'Suburban Oasis',
          description: 'A beautiful three-story home in the suburban hills of Diamond Bar',
          price: 450,
        },
        {
          ownerId: 3,
          address: '5678',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States of America',
          lat: 34.0522,
          lng: 118.2437,
          name: 'City Getaway',
          description: 'Chic studio in downtown LA near famous museums and restaurants authentic to the city.',
          price: 300,
        },
        {
          ownerId: 1,
          address: '9012',
          city: 'Fullerton',
          state: 'CA',
          country: 'United States of America',
          lat: 33.8704,
          lng: 117.9242,
          name: 'Cottage Core',
          description: 'A dainty cottage home in the quiet neighborhoods of Fullerton.',
          price: 500,
        },
        {
          ownerId: 2,
          address: '1357',
          city: 'MIAMI',
          state: 'FL',
          country: 'United States of America',
          lat: 50.8704,
          lng: 120.9242,
          name: 'Beach House',
          description: 'A relaxing getaway by the white beaches of Florida.',
          price: 575,
        }
      ], {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      [Op.or]: [
      {
        ownerId: 1,
        address: '1234',
        city: 'Diamond Bar',
        state: 'CA',
        country: 'United States of America',
        lat: 34.0286,
        lng: 117.8103,
        name: 'Suburban Oasis',
        description: 'A beautiful three-story home in the suburban hills of Diamond Bar',
        price: 450,
      },
      {
        ownerId: 3,
        address: '5678',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States of America',
        lat: 34.0522,
        lng: 118.2437,
        name: 'City Getaway',
        description: 'Chic studio in downtown LA near famous museums and restaurants authentic to the city.',
        price: 300,
      },
      {
        ownerId: 1,
        address: '9012',
        city: 'Fullerton',
        state: 'CA',
        country: 'United States of America',
        lat: 33.8704,
        lng: 117.9242,
        name: 'Cottage Core',
        description: 'A dainty cottage home in the quiet neighborhoods of Fullerton.',
        price: 500,
      },
      {
        ownerId: 2,
        address: '1357',
        city: 'MIAMI',
        state: 'FL',
        country: 'United States of America',
        lat: 50.8704,
        lng: 120.9242,
        name: 'Beach House',
        description: 'A relaxing getaway by the white beaches of Florida.',
        price: 575,
      }
    ]}, {})
  }
};
