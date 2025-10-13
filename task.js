const {DataTypes} = require('sequelize')
const sequelize = require('../db.js')
const expense = sequelize.define('expense',{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    amount : {
        type : DataTypes.INTEGER,
        allowNull : false,
    },
    description : {
        type : DataTypes.STRING,
        allowNull : false,
    },
    category : {
        type : DataTypes.STRING,
        allowNull : false,
    }
})
module.exports = expense