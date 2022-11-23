'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Review.belongsToMany(models.User, { foreignKey: 'userId' })
      Review.belongsToMany(models.Spot, { foreignKey: 'spotId' })
      Review.hasOne(models.ReviewImage, { foreignKey: 'reviewId' })
    }
  }
  Review.init({
    review: {
      type: DataTypes.STRING
    },
    stars: {
      type: DataTypes.INTEGER,
    },
    spotId: {
      type: DataTypes.INTEGER
    },
    userId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};