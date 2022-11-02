'use strict';
const { Model } = require('sequelize');
const { uuid } = require('uuidv4');

const { paginate } = require('./plugins');

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contact.belongsTo(models.User, {
        as: 'user',
      });
      Contact.hasOne(models.Visit, {
        foreignKey: 'visitorId',
        as: 'visitings',
      });
      Contact.hasOne(models.Visit, {
        foreignKey: 'visiteeId',
        as: 'visiteds',
      });
      Contact.belongsToMany(models.Relationship, {
        through: 'ContactRelationships',
        as: 'relationships',
        foreignKey: 'contactId',
        otherKey: 'relationshipId',
      });
    }
    static paginate(query, options) {
      return paginate(this, query, options);
    }
  }
  Contact.init(
    {
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      phone: DataTypes.STRING,
      userId: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Contact',
      hooks: {
        beforeCreate: async (contact, options) => {
          if (!contact.id) {
            contact.id = uuid();
          }
        },
      },
    }
  );
  return Contact;
};
