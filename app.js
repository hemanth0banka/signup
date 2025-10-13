const express = require('express')
const app = express()
const db = require('./db.js')
const model = require('./model.js')
const path = require('path')
const port = 1000
const cors = require('cors')
const bcrypt = require('bcrypt')
app.use(express.static(path.join(__dirname,"public")))
app.use(express.json())
app.use(cors())
app.post('/create',async (req,res)=>{
    try
    {
        await bcrypt.hash(req.body.password,10,async (err,hash)=>{
            if(!err)
            {
                try
                {
                    let a = await model.create({
                        name : req.body.name,
                        password : hash
                    })
                    res.status(200).send(a)
                }
                catch(e)
                {
                    console.log(e)
                }
                
            }
            else
            {
                res.status(500).send(err)
            }
        })
    }
    catch(e)
    {
        console.log(e)
    }
})
app.get('/',async (req,res)=>{
    try
    {
        res.status(200).sendFile(path.join(__dirname,"/public","/index.html"))
    }
    catch(e)
    {
        res.status(200).send(e)
    }
})
app.post('/',async (req,res)=>{
    try
    {
        let r = await model.findOne({
            where : {
                name : req.body.name
            }
        })
                if(!r)
                {
                    res.status(200).send('user not found')
                }
                else
                {
                    try
                    {
                        bcrypt.compare(req.body.password,r.password,(err,result)=>{
                            if(err)
                            {
                                res.status(200).send(err)
                            }
                            else
                            {
                                if(result)
                                {
                                    res.status(200).send('login success')
                                }
                                else
                                {
                                    res.status(200).send('incorrect password')
                                }
                            }
                        })
                    }
                    catch(e)
                    {
                        console.log(e)
                    }
                }
    }
    catch(e)
    {
        res.status(500).send(e)
    }
})
app.use((req,res)=>{
    res.status(404).send('<html><body>Page not Found...</body></html>')
})
db.sync({alter:true}).then(
    app.listen(port ,()=>{
    console.log("server running")
})).catch(e=>{console.log(e)})