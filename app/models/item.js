'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Item.belongsTo(models.Visit, {
        as: 'visit',
      });
      Item.belongsTo(models.AllCode, {
        as: 'type',
      });
    }
  }
  Item.init(
    {
      visitId: DataTypes.STRING,
      typeId: DataTypes.STRING,
      amount: DataTypes.NUMBER,
      unit: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Item',
    }
  );
  return Item;
};
