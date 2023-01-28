const express = require('express');
const router = express.Router();

const { login, register, updatePassword, updateUserCrediantials, forgotPasswordToken, resetPassword, verifyEmail, logout } = require('../controller/auth');
const { getProfile, uploadProfilePic, deleteProfilePic, addBio } = require('../controller/user');
const { protect, authorisation } = require('../middleware/auth');

//! Protect is a middlewares that we have defined to ensure that the respective user trying to access the route is authenticated. 

router.get('/', protect, getProfile);
router.put('/generateResetToken', forgotPasswordToken);
router.post('/resetPassword/:resetToken', resetPassword);
router.post('/login', login);
router.post('/register', register);
router.route('/update').put(protect, updateUserCrediantials)
router.route('/updatePassword').put(protect, updatePassword)
// router.route('/verify/:token').get(verifyEmail);

router.route('/logout').get(protect, logout);
router.route('/uploadProfilePic').put(protect, uploadProfilePic);
router.route('/deleteProfilePic').delete(protect, deleteProfilePic);
router.route('/addBio').put(protect, addBio);


module.exports = router;