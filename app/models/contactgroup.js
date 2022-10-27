'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactGroup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ContactGroup.init(
    {
      name: DataTypes.STRING,
      nameEn: DataTypes.STRING,
      parentId: DataTypes.NUMBER,
      description: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'ContactGroup',
    }
  );
  return ContactGroup;
};
