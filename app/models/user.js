'use strict';
const { Model } = require('sequelize');
const { uuid } = require('uuidv4');
const bcrypt = require('bcryptjs');

const { paginate } = require('./plugins');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Contact, {
        foreignKey: 'userId',
        as: 'contacts',
      });
      User.hasMany(models.Token, {
        foreignKey: 'userId',
        as: 'tokens',
      });
    }
    static paginate(query, options) {
      return paginate(this, query, options);
    }
    isPasswordMatch = function (password) {
      const user = this;
      return bcrypt.compare(password, user.password);
    };
    toJSON = function () {
      const values = Object.assign({}, this.get());
      delete values.password;
      delete values.tokens;
      return values;
    };
    static isEmailTaken = async function (email) {
      const user = await this.findOne({ where: { email } });
      return !!user;
    };
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      description: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeSave: async (user, options) => {
          if (user.changed('password')) {
            user.password = await bcrypt.hash(user.password, 8);
          }
          if (!user.id) {
            user.id = uuid();
          }
        },
        beforeBulkCreate: (users, options) => {
          users.forEach((user) => {
            user.password = bcrypt.hashSync(user.password, 8);
          });
        },
      },
    }
  );
  return User;
};
