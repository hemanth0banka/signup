const {DataTypes} = require('sequelize')
const sequelize = require('../db.js')
const persons = sequelize.define('persons',{
    userId : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        allowNull : false,
        autoIncrement : true
    },
    name : {
        type : DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING
    }
})
module.exports = persons