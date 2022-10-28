'use strict';
const { Model } = require('sequelize');
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
  }
  Visit.init(
    {
      eventId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      visitorId: DataTypes.STRING,
      visiteeId: DataTypes.STRING,
      itemsId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: DataTypes.DATE,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Visit',
    }
  );
  return Visit;
};
