const User = require('../models/Product')
const {StatusCodes} = require('http-status-codes')
const path = require('path')
const customError= require('../errors')
const cloudinary = require('cloudinary').v2
const fs = require('fs')


//If you want to save the work on the sever instead

const uploadImages = async (req, res) => {

     if(!req.files){
        throw new customError.BadRequestError('please upload file')
     }
     
    const imageFile = req.files.image

    const imagePath = path.join(__dirname,'../public/uploads/' + `${imageFile.name}`)

    if(!imageFile. mimetype.startsWith('image')){
        throw new customError.BadRequestError('File not supported')
    }
    
  const maxSize = 1024 * 1024

  if(imageFile > maxSize){
     throw new customError.BadRequestError('please upload a smaller image of 1kb')
  }


    await imageFile.mv(imagePath)
    

    res.status(StatusCodes.OK).json({image:{src:`/uploads/${imageFile.name}`}})
    
}


//uploaded to cloudinary using cloudinary API(hosted on cloud)
const uploadImage = async(req,res)=>{
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath,{
        use_filename:true,
        folder:"file-uploads"
    });
    fs.unlinkSync(req.files.image.tempFilePath)

    res.status(StatusCodes.OK)
    .json({image:{src:result.secure_url}})
}


module.exports = {uploadImage};