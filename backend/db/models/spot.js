'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, { foreignKey: 'ownerId' });
      Spot.belongsToMany(models.User, { through: models.Booking });
      Spot.hasMany(models.User, { foreignKey: 'spotId' });
      Spot.hasOne(models.SpotImage, { foreignKey: 'spotId' })
    }
  }
  Spot.init({
    address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    city: {
      allowNull: false,
      type: DataTypes.STRING
    },
    state: {
      allowNull: false,
      type: DataTypes.STRING
    },
    country: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lat: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    lng: {
      allowNull: false,
      type: DataTypes.FLOAT,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    description: {
      allowNull: false,
      type: DataTypes.STRING
    },
    price: {
      allowNull: false,
      type: DataTypes.FLOAT
    },
    ownerId: {
      allowNull: false,
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};