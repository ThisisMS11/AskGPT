const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/connectDB');
const { Server } = require('http');
const mongoose = require('mongoose')
const morgan = require('morgan');
const errorResponse = require('./middleware/errorHandler')
const allPosts = require('./routes/allposts')
const user = require('./routes/user');
const users = require('./routes/users');
const post = require('./routes/post')
const cookieParser = require('cookie-parser')
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const cors = require('cors');
const hpp = require('hpp');
const fileUpload = require('express-fileupload');
const bodyParser = require("body-parser");

mongoose.set('strictQuery', true);
dotenv.config({ path: './config/config.env' })
dotenv.config({ path: '.env' })

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(xss());
app.use(hpp())
app.use(cors());
app.use(mongoSanitize());
const cai = require('./Routers/apiRouter')
app.use('/quistion', cai);

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

app.use('/api/v1/user', user);
app.use('/api/v1/posts', post);
app.use('/api/v1/all_posts', allPosts);
app.use('/api/v1/adminusers', users);
app.use(errorResponse)
connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    Server.close(() => { process.exit(1) });
})