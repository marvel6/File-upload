const user = require('../models/Product')
const {StatusCodes} = require('http-status-codes')


const create = async(req,res)=>{
   const create = await user.create(req.body)
   res.status(StatusCodes.CREATED).json({file:create})
}

const getAllImage = async (req,res)=>{
    const getImage = await user.find({})
    res.status(StatusCodes.OK).json({Images:getImage,counts:getImage.length})
}



module.exports = {
    create,
    getAllImage
}