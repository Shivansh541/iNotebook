// index.js
// const connectToDatabase = require('./db');
const { default: mongoose } = require('mongoose')
const connectToMongo=require('./db')
const express=require('express')
const app=express()
const port=5000
const cors = require('cors')

app.use(cors())

mongoose.set('strictQuery', true);
connectToMongo()

app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/',(req,res)=>{
    res.send("hello World")
})

app.listen(port, ()=>{
    console.log(`iNotebook backend listening at http://localhost:${port}`)
})
