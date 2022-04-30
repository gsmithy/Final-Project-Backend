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
            type: DataTypes.STRING,
            allowNull: true
        },

     }, {
        sequelize,
        modelName: 'Comment'
        
        });
    return Comment;
};
