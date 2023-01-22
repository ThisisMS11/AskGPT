const mongoose = require('mongoose');
let { Schema, model } = require('mongoose');

const currentTime = new Date();
const localtime = currentTime.toLocaleString();


const DocumentSchema = new Schema({
    _id: String,
    data: Object,
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    creatorname:String,
    Record_date: {
        type: String,
        default: localtime
    }
})

const document = mongoose.model('documents', DocumentSchema);
module.exports = document;