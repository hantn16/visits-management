'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contact.belongsTo(models.User);
      Contact.hasOne(models.Visit, {
        foreignKey: 'visitorId',
      });
      Contact.hasOne(models.Visit, {
        foreignKey: 'visiteeId',
      });
      Contact.belongsToMany(models.Relationship, {
        through: 'ContactRelationships',
        as: 'relationships',
        foreignKey: 'contactId',
        otherKey: 'relationshipId',
      });
    }
  }
  Contact.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      ownerId: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Contact',
    }
  );
  return Contact;
};
