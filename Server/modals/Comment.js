const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({

    // !content is an object that has the user_id of the user who made the comment , comment data(string),and the likes array which contains the ids of the all the users who liked the comment.

    content: [{
        user: { type: mongoose.Schema.ObjectId, ref: 'Users', },
        comment: { type: String },
        likes: [{
            type: mongoose.Schema.ObjectId
        }]
    }],

    //! post here signifies the post corresponding to which the comment
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