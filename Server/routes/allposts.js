const express = require('express');
const router = express.Router();
const { protect, authorisation } = require('../middleware/auth');
const { getAllPosts, getEveryPosts } = require('../controller/post');

router.route('/').get(protect, getAllPosts);
router.route('/every').get(getEveryPosts);

module.exports = router;