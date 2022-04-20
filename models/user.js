'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Post, {
        foreignKey: 'id' 
      });
    };
  };

  User.init({

    first_name: {
            type: DataTypes.STRING,
            allowNull: false
      },
    last_name: {
            type: DataTypes.STRING,
            allowNull: false
    },
    user_name: {
            type: DataTypes.STRING,
            allowNull: false
    },
    password: {
            type: DataTypes.STRING,
            allowNull: false
    },
    email: {
            type: DataTypes.STRING,
            allowNull: false
    },
    address: {
            type: DataTypes.STRING,
            allowNull: false
    },
    state: {
            type: DataTypes.STRING,
            allowNull: false
    },
    city: {
            type: DataTypes.STRING,
            allowNull: false
    },
    zip_code: {
            type: DataTypes.INTEGER,
            allowNull: false
    },
    country: {
            type: DataTypes.STRING,
            allowNull: false
    }
    
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};