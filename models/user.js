'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Post);
      this.hasMany(models.Comment);
      this.hasMany(models.Additional);
    };
  };

  User.init({

    admin: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false
    },

    first_name: {
                type: DataTypes.STRING,
                allowNull: true
    },
    last_name: {
                type: DataTypes.STRING,
                allowNull: true
    },
    user_name: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
                notEmpty: true
    },
    password: {
                type: DataTypes.STRING,
                allowNull: true,
                notEmpty: true
    },
    email: {
                type: DataTypes.STRING,
                allowNull: true,
                unique: true,
                isEmail: true,
                notEmpty: true
    },
    address: {
                type: DataTypes.STRING,
                allowNull: true,
                notEmpty: true
    },
    state: {
                type: DataTypes.STRING,
                allowNull: true
    },
    city: {
                type: DataTypes.STRING,
                allowNull: true
        },
    zip_code: {
                type: DataTypes.INTEGER,
                allowNull: true,
                notEmpty: true
    },
    country: {
                type: DataTypes.STRING,
                allowNull: true
    },
    profile_pic: {
                type: DataTypes.STRING,
                defaultValue: null,
                allowNull: true
    },
    createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
                unique: false
    },
    updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
                unique: false
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};