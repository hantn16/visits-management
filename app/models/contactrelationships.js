'use strict';
const { Model } = require('sequelize');

const Contact = require('./contact');
const Relationship = require('./relationship');

module.exports = (sequelize, DataTypes) => {
  class ContactRelationships extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ContactRelationships.init(
    {
      contactId: {
        type: DataTypes.STRING,
        references: {
          model: Contact,
          key: 'id',
        },
      },
      relationshipId: {
        type: DataTypes.STRING,
        references: {
          model: Relationship,
          key: 'id',
        },
      },
    },
    {
      sequelize,
      modelName: 'ContactRelationships',
    }
  );
  return ContactRelationships;
};
