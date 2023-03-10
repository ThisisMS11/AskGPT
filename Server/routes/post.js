const express = require('express');
const { createNewPost,
    deletePost,
    like,
    unlike,
    comment,
    getPostDetails,
    updatePost,
    deleteComment,
    editComment,
    getCommentDetails,
    getAllComments
} = require('../controller/post');


const { protect } = require('../middleware/auth')
const { Setcomments } = require('../middleware/RedisHelper')

const router = express.Router();

// *protect is middleware that ensures that only authenticated users are allowed to write a post.

//! for creating new post
router.route('/').post(protect, createNewPost);


router.route('/:id').get(getPostDetails)

router.route('/:id').delete(protect, deletePost).get(getPostDetails)

router.route('/like/:comment_id/:post_id').put(protect, like);

router.route('/unlike/:comment_id/:post_id').put(protect, unlike);

router.route('/comment/:postId/:commentId').put(protect, editComment).delete(protect, deleteComment).get(getCommentDetails);

router.route('/comment/:postId').get(Setcomments,getAllComments);

router.route('/comment/:postId').put(protect, comment);

router.route('/update/:id').put(protect, updatePost);


module.exports = router;