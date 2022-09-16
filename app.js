require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

const fileUpload = require('express-fileupload')
const cloudinary = require('cloudinary').v2
const helmet = require('helmet')
const cors = require('cors')
const xss = require('xss-clean')
const exp = require('express-rate-limit')

const swagger = require('swagger-ui-express')
const YAML = require('yamljs')
const swagger_content = YAML.load('./swaggers.yaml')

cloudinary.config({
  cloud_name:process.env.Cloud_Name,
  api_key:process.env.API_Key,
  api_secret:process.env.API_Secret
})

// database
const connectDB = require('./db/connect');

//route
const uploadImage = require('./routes/productRoutes')

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1)
app.use(exp({
  windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100,
}))

app.use(express.json())
app.use(fileUpload({useTempFiles:true}))
app.use(express.static('./public'))


app.use(helmet())
app.use(cors())
app.use(xss())






app.get('/', (req, res) => {
  res.send('<h1>API Docs</h1><a href="/api-docs">documentation</a>');
});


app.use('/api-docs',swagger.serve,swagger.setup(swagger_content))


app.use('/api', uploadImage);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);



const port = process.env.PORT || 8080;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
