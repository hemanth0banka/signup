const {Sequelize} = require('sequelize')
const sequelize = new Sequelize('mydb','root','1234',{
    host : '127.0.0.1',
    dialect : 'mysql'
});
(async ()=>{
    try
    {
        await sequelize.authenticate()
        console.log(`Connected to database...`)
    }
    catch(e)
    {
        console.log(e)
    }
})()
module.exports = sequelize