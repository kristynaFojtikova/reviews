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
      Review.belongsTo(models.User, { foreignKey: 'reviewerId' });
      Review.belongsTo(models.Restaurant, { foreignKey: 'restaurantId' });
    }
  };
  Review.init({
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userComment: DataTypes.STRING,
    ownerComment: DataTypes.STRING,
    status: {
      allowNull: false,
      type: DataTypes.ENUM("PENDING", "APPROVED", "DISAPPROVED")
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};