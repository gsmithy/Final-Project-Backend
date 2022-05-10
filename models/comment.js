'use strict'
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        static associate(models) {
            this.belongsTo(models.Post);
            this.belongsTo(models.User);
        };
    };

    Comment.init ({

        comment: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        like: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        love: {
            type: DataTypes.INTEGER,
            allowNull: true
        }

     }, {
        sequelize,
        modelName: 'Comment'
        
        });
    return Comment;
};
