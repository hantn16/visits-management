'use strict';
const { Model } = require('sequelize');
const { uuid } = require('uuidv4');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.hasMany(models.Visit, {
        foreignKey: 'eventId',
        as: 'visits',
      });
      Event.belongsTo(models.AllCode, {
        as: 'type',
      });
    }
  }
  Event.init(
    {
      name: DataTypes.STRING,
      typeId: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Event',
      hooks: {
        beforeCreate: async (event, options) => {
          if (!event.id) {
            event.id = uuid();
          }
        },
      },
    }
  );
  return Event;
};
