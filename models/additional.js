'use strict'
const {Model} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Additional extends Model {
        static associate(models) {
            this.belongsTo(models.User);
        };
    };

    Additional.init ({

        article: {
            type: DataTypes.TEXT('long'),
            allowNull: true
        },

     }, {
        sequelize,
        modelName: 'Additional'
        
        });
    return Additional;
};
