'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Visit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Visit.init({
    type: DataTypes.NUMBER,
    visitorId: DataTypes.NUMBER,
    visiteeId: DataTypes.NUMBER,
    itemsId: DataTypes.NUMBER,
    time: DataTypes.DATE,
    description: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Visit',
  });
  return Visit;
};