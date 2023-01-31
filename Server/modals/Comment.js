const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({

    // !content is an object that has the user_id of the user who made the comment , comment data(string),and the likes array which contains the ids of the all the users who liked the comment.

    content: [{
        user: { type: mongoose.Schema.ObjectId, ref: 'Users', },
        comment: {
            type: Object,
            required: [true, "Please type something for comment"],
            default: ''
        },
        likes: [{
            type: mongoose.Schema.ObjectId
        }],
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],

    //! post here signifies the post corresponding to which the comment
    post: {
        type: mongoose.Schema.ObjectId,
        ref: 'Posts',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

},
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }

)

module.exports = mongoose.model('Comments', commentSchema);