const express = require('express')
const app = express()
const cors = require('cors')
const port = 1000
const sequelize = require('./db.js')
const signup = require('./model.js')
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.status(200).send('<html><body><h1>Sign Up Success</h1></body></html>')
})
app.post('/',async (req,res)=>{
    try
    {
        let r = await signup.create(req.body)
        res.status(201).send(r)
    }
    catch(e)
    {
        console.log(e)
    }
})
app.post('/login',async (req,res)=>{
    try
    {
        let n = await signup.findOne({
            where : {
                name : req.body.name
            }
        })
        res.status(200).send(n)

    }
    catch(e)
    {
        console.log(e)
    }
})
app.use((req,res)=>{
    res.status(404).send('Page not Found...')
})
sequelize.sync({alter:true}).then(()=>{
    app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`)
})}).catch(e=>console.log(e))
