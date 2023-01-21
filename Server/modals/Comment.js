const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
    content: [{
        user: { type: mongoose.Schema.ObjectId, ref: 'Users', },
        comment: { type: String },
        likes: [{
            type: mongoose.Schema.ObjectId
        }]
    }],
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Posts',
        required: true
    }

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }

)

module.exports = mongoose.model('Comments', commentSchema);