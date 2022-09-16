const express = require('express');
const router = express.Router();

const {uploadImage} = require('../controllers/uploadsController');
const {create,getAllImage} = require('../controllers/productController')

router.route('/upload').post(uploadImage)
router.route('/').post(create).get(getAllImage)

module.exports = router