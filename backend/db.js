// db.js
const mongoose=require('mongoose')

const mongoURI='mongodb://localhost:27017/inotebook'

const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log('successfully connected to mongo')
    })
}

module.exports= connectToMongo
