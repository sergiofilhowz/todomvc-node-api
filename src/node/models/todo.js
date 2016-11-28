module.exports = function (sequelize, DataTypes) {
    'use strict';

    var Todo = sequelize.define('Todo', {
        todo_id : {
            type : DataTypes.BIGINT,
            autoIncrement : true,
            primaryKey : true
        },

        title : DataTypes.STRING,
        completed : DataTypes.BOOLEAN
    }, {
        timestamps : true,
        tableName : 'todo',

        classMethods : {
            associate : function (models) {
                /*
                 * You can use models.YouModelName to make associations
                 * In this case I'm using models.Sample just to show that
                 * we can have access to any model imported in this directory.
                 */
                // Sample.belongsTo(models.Sample, {
                //     as : 'Sample',
                //     foreignKey : 'sample_id'
                // });
            }
        }
    });

    return Todo;
};