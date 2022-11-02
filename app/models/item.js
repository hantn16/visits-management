'use strict';
const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

const { paginate } = require('./plugins');

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
    static paginate(query, options) {
      return paginate(this, query, options);
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
      hooks: {
        beforeCreate: async (event, options) => {
          if (!event.id) {
            event.id = uuid();
          }
        },
      },
    }
  );
  return Item;
};
