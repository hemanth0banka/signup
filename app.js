const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const sequelize = require('./db.js')
const expense = require('./model/task.js')
const persons = require('./model/persons.js')
const bcrypt = require('bcrypt')

let port = 1000
app.use(express.json())
app.use(cors())
app.use(express.static(path.join(__dirname,'public')))
app.get('/',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'./public','/login.html'))
})
app.get('/app',(req,res)=>{
    res.status(200).sendFile(path.join(__dirname,'./public','/home.html'))
})
app.post('/register',async (req,res)=>{
    try
    {
        bcrypt.hash(req.body.password,10,async (err,result)=>{
            if(err)
            {
                res.status(500).send(err)
            }
            else
            {
                try
                {
                    let a = await persons.create({
                        name : req.body.name,
                        password : result
                    })
                    res.status(200).send(a)
                }
                catch(e)
                {
                    res.status(500).send(e)
                }
            }
        })
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})
app.post('/login',async (req,res)=>{
    try
    {
        let r = await persons.findOne({
            where : {
                name : req.body.name
            }
        })
        if(!r)
        {
            res.status(404).send('user not found')
        }
        else
        {
            try
            {
                bcrypt.compare(req.body.password,r.password,(err,result)=>{
                    if(err)
                    {
                        res.status(500).send('something went wrong')
                    }
                    else
                    {
                        if(result)
                        {
                            res.status(200).send(result)
                        }
                        else
                        {
                            res.status(400).send('wrong password')
                        }
                    }
                })
            }
            catch(e)
            {
                res.status(500).send(e)
            }
        }
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})
app.get('/task',async (req,res)=>{
    try
    {
        let data = await expense.findAll()
        res.status(200).json(data)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})
app.post('/task',async (req,res)=>{
    try
    {
        let {amount,description,category} = req.body
        let data = await expense.create({
            amount : amount,
            description : description,
            category : category
        })
        res.status(201).json(data)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})
app.put('/task',async (req,res)=>{
    try
    {
        let {id,name,description,category} = req.body
        let data = await expense.findByPk(id)
        data.name = name;
        data.description = description;
        data.category = category;
        await data.save()
        res.status(200).json(data)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})
app.delete('/task',async (req,res)=>{
    try
    {
        let {id} = req.body
        let data = await expense.destroy({where:{
            id : id
        }})
        res.status(201).json(data)
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})
sequelize.sync({alter:true}).then(
    ()=>{app.listen(port,()=>{
    console.log(`Listening at https://localhost:${port}`)
})}).catch(e=>console.log(e))
module.exports = port