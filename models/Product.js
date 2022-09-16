const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
    name:{
     type:String,
     required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})



module.exports = mongoose.model('UserUpload',uploadSchema)