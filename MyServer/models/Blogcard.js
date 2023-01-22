const mongoose = require('mongoose');
let { Schema, model } = require('mongoose');


const BlogcardSchema = new Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userid'
    },
    blogID: String,
    title: String,
    description: String,
    image: Object,
    tag: String,
    datetime: {
        type: Date,
        default: Date.now
    }
})

const blogcard = mongoose.model('blogcards', BlogcardSchema);
module.exports = blogcard;