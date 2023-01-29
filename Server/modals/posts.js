const mongoose = require('mongoose');
const cloudinary = require('../utils/cloudinary');

const postSchema = new mongoose.Schema({
    MainQuestion: {
        type: String,
        required: [true, 'Please Write a summary of your Question'],
        trim: true,
        maxlength: 100
    },
    data: {
        type: Object,
        required: [true, "Please Describe your problem"],
        default: ''
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'Users',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
}
)

// !to delete all the comments of the corresponding deleted post.
postSchema.pre('remove', async function (next) {
    await this.model('Comments').deleteMany({ post: this._id });

    next();
})

//! to populate the comments this is a virtual attribute that represent all the comments of the respective post.
postSchema.virtual('comments', {
    ref: 'Comments',
    localField: '_id',
    foreignField: 'post',
    justOne: false
})



module.exports = mongoose.model('Posts', postSchema);