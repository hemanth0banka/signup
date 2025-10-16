const sequelize = require('../db.js')
const jwt = require('jsonwebtoken')
const users = require('../model/users.js')
const data = require('../model/data.js')
const payment = require('../model/payment.js')
const expensesget = async (req,res)=>{
    try
    {
        const token = req.headers.authorization.split(' ')[1]
        const user = jwt.verify(token,'securitykey')
        const r = await data.findAll({
            where : {
                userUserId : user.userId
            }
        })
        const pay = await payment.findOne({
            where : {
                userUserId : user.userId
            }
        })
        let pro = false
        if(pay)
        {
            if(pay.paymentStatus == 'Success')
            {
                pro = true
            }
        }
        res.status(200).json({
            message : 'token is valid',
            data : r,
            pro : pro
        })
    }
    catch(e)
    {
        res.status(500).json({
            message : 'token is invalid',
            data : e
        })
    }
}
const expensespost = async (req,res)=>{
    try
    {
        let token = req.headers.authorization.split(' ')[1]
        let user = jwt.verify(token,'securitykey')
        let r = await data.create({
            userUserId : user.userId,
            amount : req.body.amount,
            description : req.body.description,
            category : req.body.category
        })
        let u = await users.findOne({
            where : {
                userId : user.userId
            }
        })
        u.total += Number(req.body.amount)
        await u.save()
        res.status(200).send(r)
    }
    catch(e)
    {
        res.status(500).json({
            message : 'server error',
            data : e
        })
    }
}
const expensesdelete = async (req,res)=>{
    let t = await sequelize.transaction()
    try
    {
        let token = req.headers.authorization.split(' ')[1]
        let user = jwt.verify(token,'securitykey')
        let r = await data.destroy({
            where : {
                id : req.body.id
            },
            transaction : t
        })
        let d =  await users.findOne({
            where : {
                userId : user.userId
            },
            transaction : t
        })
        d.total -= Number(req.body.amount)
        await d.save({transaction : t})
        await t.commit()
        res.status(200).send(r)
    }
    catch(e)
    {
        await t.rollback()
        console.error("Error during expense deletion:", e);
        res.status(500).json({ success: false, message: "An error occurred while deleting the expense." });
    }
}
module.exports = {expensesget,expensespost,expensesdelete}