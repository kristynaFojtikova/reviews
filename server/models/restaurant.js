'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Restaurant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Restaurant.belongsTo(models.User, { foreignKey: 'ownerId' });
      Restaurant.hasMany(models.Review)
    }
  };
  Restaurant.init({
    name: { type: DataTypes.STRING, allowNull: false, },
    description: DataTypes.STRING,
    imageUrls: {
      type: DataTypes.STRING,
      get() {
        return this.getDataValue('imageUrls').split(';')
      },
      set(val) {
        this.setDataValue('imageUrls', val.join(';'));
      }
    }
  }, {
    sequelize,
    modelName: 'Restaurant',
  });
  return Restaurant;
};