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
        name: 'Pixel Studio',
        description: 'A beautiful pixelated studio to keep you cozy.',
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
        name: '8 Bit Pad',
        description: 'Chic pad that offers a good time with your friends.',
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
        name: '5D Shack',
        description: 'A dainty shack for a quick getaway.',
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
        name: 'Virtual Abode',
        description: 'A modern abode that is picture perfect for your social media needs!',
        price: 575,
      },
      {
        ownerId: 4,
        address: '1111',
        city: 'Rochester',
        state: 'NY',
        country: 'United States of America',
        lat: 51.8704,
        lng: 122.9242,
        name: 'AI Lounge',
        description: 'A futuristic, fully functioning AI home 🤖.',
        price: 300,
      },
      {
        ownerId: 2,
        address: '2222',
        city: 'Eastvale',
        state: 'CA',
        country: 'United States of America',
        lat: 53.8704,
        lng: 124.9242,
        name: 'Robotics Central',
        description: 'Built by a mechanical engineer in the fields of Eastvale.',
        price: 100,
      },
      {
        ownerId: 3,
        address: '3333',
        city: 'Diamond Bar',
        state: 'CA',
        country: 'United States of America',
        lat: 53.8705,
        lng: 124.9246,
        name: 'V-Hub',
        description: 'Come grub in the hub with the homies.',
        price: 200,
      },
      {
        ownerId: 1,
        address: '4444',
        city: 'Los Angeles',
        state: 'CA',
        country: 'United States of America',
        lat: 53.8706,
        lng: 124.9243,
        name: 'Modern Bit',
        description: 'Vibe of vintage 8-bit but modern furnishings of the best in interior design!',
        price: 150,
      },
      {
        ownerId: 2,
        address: '5555',
        city: 'Pasadena',
        state: 'CA',
        country: 'United States of America',
        lat: 53.8704,
        lng: 124.9242,
        name: 'Virtually Spanish',
        description: 'You wont believe you are in the states with all the beautiful spanish architecture. Bienvenidos!',
        price: 1000,
      },
      {
        ownerId: 4,
        address: '6666',
        city: 'Philadelphia',
        state: 'PA',
        country: 'United States of America',
        lat: 53.8710,
        lng: 124.9272,
        name: 'Tech Deck',
        description: 'Beautifully engineered tech-y home.',
        price: 624,
      },
      {
        ownerId: 2,
        address: '7777',
        city: 'Houston',
        state: 'TX',
        country: 'United States of America',
        lat: 53.8711,
        lng: 124.9343,
        name: 'Texas Saavy',
        description: 'Everything is bigger in Texas.',
        price: 75,
      },
      {
        ownerId: 1,
        address: '8888',
        city: 'Miami',
        state: 'FL',
        country: 'United States of America',
        lat: 53.8712,
        lng: 124.9253,
        name: 'Sunshine House',
        description: 'Cozy and warm house by the sunny beaches.',
        price: 350,
      },
      {
        ownerId: 3,
        address: '9999',
        city: 'Seattle',
        state: 'WA',
        country: 'United States of America',
        lat: 53.8713,
        lng: 124.9263,
        name: 'Modern Home',
        description: 'Come experience a modern home in the city.',
        price: 400,
      },
      {
        ownerId: 4,
        address: '1010',
        city: 'Kansas City',
        state: 'MO',
        country: 'United States of America',
        lat: 53.9704,
        lng: 124.1242,
        name: 'Pixel Perfect',
        description: 'Pixel perfect home in the suburbs of KC.',
        price: 215,
      },
      {
        ownerId: 1,
        address: '2020',
        city: 'San Francisco',
        state: 'CA',
        country: 'United States of America',
        lat: 83.1704,
        lng: 124.8242,
        name: 'HouseDrive',
        description: '',
        price: 100,
      },
      {
        ownerId: 3,
        address: '3030',
        city: 'San Diego',
        state: 'CA',
        country: 'United States of America',
        lat: 93.8704,
        lng: 144.9242,
        name: 'Chippy Home',
        description: 'Experience a mini home certainly not as small as a microchip.',
        price: 50,
      },
      {
        ownerId: 2,
        address: '4040',
        city: 'Boston',
        state: 'MA',
        country: 'United States of America',
        lat: 73.8704,
        lng: 244.9242,
        name: 'Giga Home',
        description: 'A mansion in the heart of Boston.',
        price: 5000,
      },
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
          name: 'Pixel Studio',
          description: 'A beautiful pixelated studio to keep you cozy.',
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
          name: '8 Bit Pad',
          description: 'Chic pad that offers a good time with your friends.',
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
          name: '5D Shack',
          description: 'A dainty shack for a quick getaway.',
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
          name: 'Virtual Abode',
          description: 'A modern abode that is picture perfect for your social media needs!',
          price: 575,
        },
        {
          ownerId: 4,
          address: '1111',
          city: 'Rochester',
          state: 'NY',
          country: 'United States of America',
          lat: 51.8704,
          lng: 122.9242,
          name: 'AI Lounge',
          description: 'A futuristic, fully functioning AI home 🤖.',
          price: 300,
        },
        {
          ownerId: 2,
          address: '2222',
          city: 'Eastvale',
          state: 'CA',
          country: 'United States of America',
          lat: 53.8704,
          lng: 124.9242,
          name: 'Robotics Central',
          description: 'Built by a mechanical engineer in the fields of Eastvale.',
          price: 100,
        },
        {
          ownerId: 3,
          address: '3333',
          city: 'Diamond Bar',
          state: 'CA',
          country: 'United States of America',
          lat: 53.8705,
          lng: 124.9246,
          name: 'V-Hub',
          description: 'Come grub in the hub with the homies.',
          price: 200,
        },
        {
          ownerId: 1,
          address: '4444',
          city: 'Los Angeles',
          state: 'CA',
          country: 'United States of America',
          lat: 53.8706,
          lng: 124.9243,
          name: 'Modern Bit',
          description: 'Vibe of vintage 8-bit but modern furnishings of the best in interior design!',
          price: 150,
        },
        {
          ownerId: 2,
          address: '5555',
          city: 'Pasadena',
          state: 'CA',
          country: 'United States of America',
          lat: 53.8704,
          lng: 124.9242,
          name: 'Virtually Spanish',
          description: 'You wont believe you are in the states with all the beautiful spanish architecture. Bienvenidos!',
          price: 1000,
        },
        {
          ownerId: 4,
          address: '6666',
          city: 'Philadelphia',
          state: 'PA',
          country: 'United States of America',
          lat: 53.8710,
          lng: 124.9272,
          name: 'Tech Deck',
          description: 'Beautifully engineered tech-y home.',
          price: 624,
        },
        {
          ownerId: 2,
          address: '7777',
          city: 'Houston',
          state: 'TX',
          country: 'United States of America',
          lat: 53.8711,
          lng: 124.9343,
          name: 'Texas Saavy',
          description: 'Everything is bigger in Texas.',
          price: 75,
        },
        {
          ownerId: 1,
          address: '8888',
          city: 'Miami',
          state: 'FL',
          country: 'United States of America',
          lat: 53.8712,
          lng: 124.9253,
          name: 'Sunshine House',
          description: 'Cozy and warm house by the sunny beaches.',
          price: 350,
        },
        {
          ownerId: 3,
          address: '9999',
          city: 'Seattle',
          state: 'WA',
          country: 'United States of America',
          lat: 53.8713,
          lng: 124.9263,
          name: 'Modern Home',
          description: 'Come experience a modern home in the city.',
          price: 400,
        },
        {
          ownerId: 4,
          address: '1010',
          city: 'Kansas City',
          state: 'MO',
          country: 'United States of America',
          lat: 53.9704,
          lng: 124.1242,
          name: 'Pixel Perfect',
          description: 'Pixel perfect home in the suburbs of KC.',
          price: 215,
        },
        {
          ownerId: 1,
          address: '2020',
          city: 'San Francisco',
          state: 'CA',
          country: 'United States of America',
          lat: 83.1704,
          lng: 124.8242,
          name: 'HouseDrive',
          description: '',
          price: 100,
        },
        {
          ownerId: 3,
          address: '3030',
          city: 'San Diego',
          state: 'CA',
          country: 'United States of America',
          lat: 93.8704,
          lng: 144.9242,
          name: 'Chippy Home',
          description: 'Experience a mini home certainly not as small as a microchip.',
          price: 50,
        },
        {
          ownerId: 4,
          address: '4040',
          city: 'Boston',
          state: 'MA',
          country: 'United States of America',
          lat: 73.8704,
          lng: 244.9242,
          name: 'Giga Home',
          description: 'A mansion in the heart of Boston.',
          price: 5000,
        },
      ]
    }, {})
  }
};
