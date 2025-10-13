const {DataTypes} = require('sequelize')
const sequelize = require('../db.js')
const persons = sequelize.define('persons',{
    name : {
        type : DataTypes.STRING
    },
    password : {
        type : DataTypes.STRING
    }
})
module.exports = persons