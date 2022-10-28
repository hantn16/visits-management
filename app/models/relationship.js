'use strict';
const { Model } = require('sequelize');
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
      });
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
          return !!Relationship.findOne({
            where: {
              parentId: this.parentId,
            },
          });
        },
      },
    },
    {
      sequelize,
      modelName: 'Relationship',
    }
  );
  return Relationship;
};
