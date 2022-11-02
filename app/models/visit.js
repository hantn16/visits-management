'use strict';
const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

const { paginate } = require('./plugins');

module.exports = (sequelize, DataTypes) => {
  class Visit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Visit.belongsTo(models.Event, {
        as: 'event',
      });
      Visit.belongsTo(models.Contact, {
        as: 'visitee',
      });
      Visit.belongsTo(models.Contact, {
        as: 'visitor',
      });
      Visit.hasMany(models.Item, {
        as: 'items',
        foreignKey: 'visitId',
      });
    }
    static paginate(query, options) {
      return paginate(this, query, options);
    }
  }
  Visit.init(
    {
      eventId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      visitorId: DataTypes.STRING,
      visiteeId: DataTypes.STRING,
      time: DataTypes.DATE,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Visit',
      hooks: {
        beforeCreate: async (event, options) => {
          if (!event.id) {
            event.id = uuid();
          }
        },
      },
    }
  );
  return Visit;
};
