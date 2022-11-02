'use strict';
const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

const { paginate } = require('./plugins');

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
        as: 'events',
      });
      AllCode.hasMany(models.Item, {
        foreignKey: 'typeId',
        as: 'items',
      });
    }
    static paginate(query, options) {
      return paginate(this, query, options);
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
      hooks: {
        beforeCreate: async (event, options) => {
          if (!event.id) {
            event.id = uuid();
          }
        },
      },
    }
  );
  return AllCode;
};
