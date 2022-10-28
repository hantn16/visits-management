'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AllCode extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      AllCode.hasMany(models.Event, {
        foreignKey: 'typeId',
      });
      AllCode.hasMany(models.Item, {
        foreignKey: 'typeId',
      });
    }
  }
  AllCode.init(
    {
      key: DataTypes.STRING,
      value: DataTypes.STRING,
      type: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'AllCode',
    }
  );
  return AllCode;
};
