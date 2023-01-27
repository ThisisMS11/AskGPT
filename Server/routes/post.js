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

const router = express.Router();


router.route('/').post(protect, createNewPost);

router.route('/:id').delete(protect, deletePost).get(getPostDetails)

router.route('/like/:comment_id/:post_id').put(protect, like);

router.route('/unlike/:comment_id/:post_id').put(protect, unlike);

router.route('/comment/:postId/:commentId').put(protect, editComment).delete(protect, deleteComment).get(getCommentDetails);

router.route('/comment/:postId').put(protect, comment);
 
router.route('/update/:id').put(protect, updatePost);


module.exports = router;