'use strict';
const { Model, Op } = require('sequelize');
const { uuid } = require('uuidv4');
const { paginate } = require('./plugins');
module.exports = (sequelize, DataTypes) => {
  class Relationship extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Relationship.hasMany(models.Relationship, {
        foreignKey: 'parentId',
        as: 'children',
      });
      Relationship.belongsTo(models.Relationship, {
        as: 'parent',
      });
      Relationship.belongsToMany(models.Contact, {
        through: 'ContactRelationships',
        as: 'contacts',
        foreignKey: 'contactId',
        otherKey: 'relationshipId',
      });
    }
    static paginate(query, options) {
      return paginate(this, query, options);
    }
  }
  Relationship.init(
    {
      name: DataTypes.STRING,
      nameEn: DataTypes.STRING,
      parentId: DataTypes.STRING,
      description: DataTypes.STRING,
      hasChild: {
        type: DataTypes.VIRTUAL,
        get() {
          return this.children?.length > 0;
        },
      },
    },
    {
      sequelize,
      modelName: 'Relationship',
      hooks: {
        beforeCreate: async (relationship, options) => {
          if (!relationship.id) {
            relationship.id = uuid();
          }
        },
      },
    }
  );
  return Relationship;
};
