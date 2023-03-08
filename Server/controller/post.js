const asyncHandler = require('../middleware/asyncHandler');
const Post = require('../modals/posts');
const Comment = require('../modals/Comment')
const errorResponse = require('../utils/ErrorHandler')
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cloudinary = require('../utils/cloudinary');

exports.createNewPost = asyncHandler(async (req, res, next) => {

    // !to get the user id using middleware protect.

    req.body.user = req.user._id;

    // console.log(req.body);

    const newPost = await Post.create(req.body);

    const comments = await Comment.create({ post: newPost._id })
    // const postDetails = await Likes.create({ comment: comments._id })
    res.status(200).send({ success: true, data: newPost })
})



exports.updatePost = asyncHandler(async (req, res, next) => {
    const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (!updatePost) {
        return next(new errorResponse(`Post not found with id ${req.params.id}`, 401));
    }

    if (!(updatePost.user != req.user._id) && !(req.user.role === 'admin')) {
        return next(new errorResponse('Not authorized to update the post', 404));
    }

    res.status(200).send({ success: true, data: updatePost })
})

exports.deletePost = asyncHandler(async (req, res, next) => {
    const delpost = await Post.findById(req.params.id);

    if (!delpost) {
        return next(new errorResponse(`Post not found with id ${req.params.id}`, 401));
    }

    if (!(delpost.user != req.user._id) && !(req.user.role === 'admin')) {
        return next(new errorResponse('Not authorized to delete the post', 404));
    }

    // for(let i=0;i<delpost.photos.length;i++){
    //     fs.unlinkSync(`./public/images/${delpost.photos[i]}`);
    // }

    // for(let i=0;i<delpost.videos.length;i++){
    //     fs.unlinkSync(`../public/videos/${delpost.videos[i]}`);
    // }

    delpost.remove();

    res.status(200).send({ success: true, data: delpost })
})


//! to like a comment
exports.like = asyncHandler(async (req, res, next) => {
    let details = await Comment.findOne({ post: req.params.post_id });
    console.log("<------------------------req.user : ", req.user);
    // console.log('details.content : ', details.content);

    if (!details) {
        next(new errorResponse(`No comment found with post id ${req.params.post_id}`, 401));
    }
    details.content.map((item) => {
        // console.log('item_id = ',item._id);
        if (item._id == req.params.comment_id) {
            if (!item.likes.includes(req.user._id)) {
                item.likes.push(req.user._id);
            }
        }
    })
    details.save();


    const SpecificCommentDetails = details.content.filter((item) => item._id.equals(req.params.comment_id));
    res.status(200).send({ success: true, data: SpecificCommentDetails });
})

//! to unlike a comment
exports.unlike = asyncHandler(async (req, res, next) => {
    const details = await Comment.findOne({ post: req.params.post_id });

    if (!details) {
        next(new errorResponse(`No comment found with post id ${req.params.id}`, 401));
    }


    details.content.map((item) => {
        if (item._id == req.params.comment_id) {
            item.likes = item.likes.filter((like) => String(like) !== String(req.user._id));
        }
    })
    details.save();

    console.log('details.content : ', details.content);
    //* this filteration is to send the details of the specific comment only.
    const SpecificCommentDetails = details.content.filter((item) => item._id.equals(req.params.comment_id));

    console.log('SpecificCommentDetails : ', SpecificCommentDetails);
    res.status(200).send({ success: true, data: SpecificCommentDetails });
})




//! To create new comment over the existing post.
exports.comment = asyncHandler(async (req, res, next) => {

    console.log(req.user);

    const post = await Post.findById(req.params.postId);

    if (!post) {
        next(new errorResponse(`No post found with id ${req.params.postId}`, 401));
    }
    const comment = await Comment.findOne({ post: req.params.postId });
    comment.content.push({ user: req.user._id, comment: req.body.comment });
    comment.save();

    let { createdAt, likes, _id } = comment.content[comment.content.length - 1];

    let user = {
        name: req.user.name,
        profilePic: { url: req.user.profilePic.url },
        _id: req.user._id
    }

    const newcomment = {
        comment: req.body.comment,
        createdAt: createdAt,
        likes: likes,
        _id: _id,
        user: user
    }

    res.status(200).send({ success: true, data: newcomment });
})

//! Editing a comment
exports.editComment = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findOne({ post: req.params.postId });

    if (!comment) {
        next(new errorResponse(`No post found with id ${req.params.id}`, 401));
    }

    const commentIndex = comment.content.findIndex((item) => item._id == req.params.commentId);

    if (commentIndex == -1) {
        next(new errorResponse(`No comments found with id ${req.params.commentId}`, 401));
    }

    if (comment.content[commentIndex].user != req.user.id && req.user.role !== 'admin') {
        next(new errorResponse(`Not authorized to edit the comment`, 401));
    }

    comment.content[commentIndex].comment = req.body.comment;
    comment.save();

    res.status(200).send({ success: true, data: comment });
})


//! To delete any comment
exports.deleteComment = asyncHandler(async (req, res, next) => {
    const comment = await Comment.findOne({ post: req.params.postId });

    if (!comment) {
        return next(new errorResponse(`No post found with id ${req.params.id}`, 401));
    }

    const commentIndex = comment.content.findIndex((item) => item._id == req.params.commentId);

    if (commentIndex == -1) {
        return next(new errorResponse(`No comments found with id ${req.params.commentId}`, 401));
    }

    // ! only admin and the respective user is supposed to delete the comment

    if (comment.content[commentIndex].user != req.user.id && req.user.role !== 'admin') {
        return next(new errorResponse(`Not authorized to delete the comment`, 401));
    }

    comment.content.splice(commentIndex, 1);
    comment.save();

    res.status(200).send({ success: true, data: comment._id });
})


// To get the details of a post
exports.getPostDetails = asyncHandler(async (req, res, next) => {
    let data = await Post.findById(req.params.id).populate([
        { path: 'user', select: 'name profilePic.url' },
    ]);;

    //! finding post instance in Comment modal as we know that for each post there exists one comment instance in the comment collection containing all the comments info for that specific post.
    if (!data) {
        next(new errorResponse(`No post found with id ${req.params.id}`, 401));
    }

    res.status(200).send({ success: true, data: [{ MainQuestion: data.MainQuestion, data: data.data, createdAt: data.createdAt, user: data.user }] });
})


//! to get all the posts of the user
exports.getAllPosts = asyncHandler(async (req, res, next) => {


    let posts = await Post.find({ user: req.user.id }).populate([
        {
            path: 'comments', select: 'content id',
            populate: {
                path: 'content.user',
                select: 'name profilePic.url'
            }
        },

    ]);
    // console.log(posts)
    const data = posts.map((item) => {
        return {
            MainQuestion: item.MainQuestion,
            data: item.data,
            created_at: item.createdAt,
            comments: item.comments.map((item) => {
                return item.content.map((item) => {
                    return item.comment;
                })
            }),
            // likes: item.likes.map((item) => {
            //     return item.likes.length;
            // })
        }
    })


    res.status(200).send({ success: true, data, posts });

})

exports.getCommentDetails = asyncHandler(async (req, res, next) => {
    let comment = await Comment.findById(req.params.commentId);

    if (!comment) {
        next(new errorResponse(`No comment found with id ${req.params.id}`, 401));
    }

    comment = Comment.findById(req.params.id).populate([

        { path: 'likes', select: 'likes' }

    ]);

    let data = await comment;

    // console.log(data);
    // const com = data.comments.map((item) => {
    //     return item.content.map((item) => {
    //         return item.comment;
    //     })
    // })

    // const likesLength = data.likes.map((item) => {
    //     return item.likes.length;
    // })

    // console.log(likesLength)

    res.status(200).send({ success: true, data: { title: data.title, description: data.description, created_at: data.createdAt } });
})

//! To Get All the comments for any given postid 
exports.getAllComments = asyncHandler(async (req, res, next) => {
    let comments = await Comment.find({ post: req.params.postId }).populate([
        { path: 'content.user', select: 'name profilePic.url' },
    ])
    res.status(200).send({ success: true, comments });

})


exports.getEveryPosts = asyncHandler(async (req, res, next) => {

    //! here populating the post virtual attribute comments which signifies all the comments that are posted on the post specifically.

    let posts = await Post.find().select('-data').populate([
        // ! Writing optimized code only asking for essential data to reduce app time.
        { path: 'comments', select: 'content._id id' },
        //! you can give multiple keys to includes by giving a space in between like this here name , profilePic will be included one while populating the user in post modal.
        { path: 'user', select: 'name profilePic.url' }

    ]);
    // console.log(posts)
    // !this data response will only send the comments array with the comment data and no more stuff related to the comments which posts does so it can be considered to a shorter response data 

    // const data = posts.map((item) => {
    //     return {
    //         MainQuestion: item.MainQuestion,
    //         data: item.data,
    //         created_at: item.createdAt,
    //         comments: item.comments.map((item) => {
    //             return item.content.map((item) => {
    //                 return item.comment;
    //             })
    //         }),
    //         // likes: item.likes.map((item) => {
    //         //     return item.likes.length;
    //         // })
    //     }
    // })
    res.status(200).send({ success: true, posts });

})