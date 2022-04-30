'use strict';
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
     static associate(models) {
        this.belongsTo(models.User);
        this.hasMany(models.Comment);
    };
  };

  Post.init({
    
    user_name: {
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true
                            
    },
    location: {
                type: DataTypes.STRING,
                allowNull: true
    },
    description: {
                type: DataTypes.STRING(250),
                allowNull: false,
                notEmpty: true
    }
  }, {
    sequelize,
    modelName: 'Post',
  });

  return Post;
};