const {DataTypes} = require('sequelize')
const sequelize = require('./db.js')
const signup = sequelize.define('signup',{
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    email : {
        type : DataTypes.STRING,
        primaryKey : true
    },
    password : {
        type : DataTypes.STRING,
        notNull : false
    }
})
module.exports = signup