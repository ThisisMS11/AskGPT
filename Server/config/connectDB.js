const mongoose = require('mongoose')

const connectDB = async () => {
    const conn = await mongoose.connect(process.env.DB_URL_LOCAL)

    console.log(`MongoDB connected`);

}

module.exports = connectDB;