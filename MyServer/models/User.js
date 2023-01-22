const mongoose = require('mongoose');
const { Schema } = mongoose;

const currentTime = new Date();
const localtime = currentTime.toLocaleString();

const UserSchema = new Schema({

    username: {
        type: String,
        required: true,
    },

    displayname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true
    },
    image:{
        type:Object
    },
    password: {
        type: String,
        required: true,
        unique: true
    },

    RegistrationTime: {
        type: String,
        default: localtime
    }
})
// Users is the collection where users data is going to be stored.

const User = mongoose.model('Users', UserSchema);
module.exports = User;