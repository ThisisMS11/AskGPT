const User = require('../modals/users');
const mongoose = require('mongoose');
const errorResponse = require('../utils/ErrorHandler');
const asyncHandler = require('../middleware/asyncHandler');
const bcrypt = require('bcrypt');
const jwt = require('json-web-token');
const sendEmail = require('../utils/emailHandler');
const crypto = require('crypto');
const emailValidator = require('email-validator');
const cloudinary = require('../utils/cloudinary');

exports.login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new errorResponse('Please provide an email and password', 400));
    }

    // ! searching for user with req.body parameters
    let user = await User.findOne({ email: req.body.email }).select('+password')

    if (!user) {
        return next(new errorResponse('User not Registered', 400));
    }

    // if (!user.isVerified) {
    //     return next(new errorResponse('Please verify your email', 401));
    // }

    const matchPassword = await user.matchPassword(req.body.password);

    if (!matchPassword) {
        return next(new errorResponse('Invalid Input', 404));
    }

    // !this will set the token cookie and send back the response status and token generated
    sendTokenResponse(user, 200, res)
})



exports.register = asyncHandler(async (req, res, next) => {
    // console.log('registration body : ',req.body)
    const { name, email, password, image } = req.body;

    let newuser = await User.findOne({ email: req.body.email });

    if (newuser) {
        return next(new errorResponse('User already exists with given email', 400));
    }

    newuser = await User.findOne({ name: req.body.name });

    if (newuser) {
        return next(new errorResponse('User already exists with given name', 400));
    }

    let profilePic = {
        public_id: 'profilePic/defaultMentor_aucyyg',
        url: 'https://res.cloudinary.com/dbatsdukp/image/upload/v1673782839/profilePic/defaultMentor_aucyyg.jpg'
    }

    let uploadRes;
    if (req.body.image) {
        uploadRes = await cloudinary.uploader.upload(image, {
            upload_preset: 'BlogYou'
        })
        // ! image is given then image is uploaded and thus user further too give public_id and url.
        if (uploadRes) {
            // uploadRes will contain information about the uploaded image.
            profilePic = {
                public_id: uploadRes.public_id,
                url: uploadRes.url
            }
        }
    }
    
    newuser = await User.create({
        name: name,
        email: email,
        password: password,
        profilePic: profilePic
    });
    


    // const token = user.getVerificationToken();

    await newuser.save({ validateBeforeSave: false });

    sendTokenResponse(newuser, 200, res)

    //const verificationUrl = `${req.protocol}://${req.get(
    //     'host',
    // )}/api/v1/auth/resetpassword/${token}`;

    // const message = `Please verify your email by clicking on the link below: \n\n ${verificationUrl}`;

    // try {
    //     await sendEmail({
    //         email: req.body.email,
    //         subject: 'Email Verification',
    //         message
    //     })
    //     res.status(200).json({ success: true, data: 'Email sent' });
    // } catch (err) {
    //     console.log(err);
    //     user.verificationToken = undefined;
    //     user.verificationTokenExpire = undefined;
    //     await user.save({ validateBeforeSave: false });
    //     return next(new errorResponse('Email could not be sent', 500));
    // }
})

exports.verifyEmail = asyncHandler(async (req, res, next) => {
    const verificationToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

    const user = await User.findOne({ verificationToken: verificationToken, verificationTokenExpire: { $gt: Date.now() } }).select('+password');
    // console.log(user)


    user.isVerified = true;
    user.email = user.unverifiedEmail;
    user.unverifiedEmail = undefined;
    user.verificationToken = undefined;
    user.verificationTokenExpire = undefined;

    await user.save({ validateBeforeSave: false });

    if (!user) {
        return next(new errorResponse('Invalid Token', 400));
    }

    sendTokenResponse(user, 200, res);

})

//! this function takes the user information (if found) / created and generates a token with some expiry time and sets token cookie to that token and populate the response object with status and token to send back to client. 

const sendTokenResponse = (user, statusCode, res) => {

    //! this getSignedJwtToken is in users model where it signs the token with the user.id ,jwt secret and the expiry time
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true,
    }

    res.status(statusCode).send({ status: true, token: token });
}






exports.updatePassword = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.user.email }).select('+password');

    if (!user) {
        return next(new errorResponse('Invalid Input', 404));
    }

    const matchPassword = await user.matchPassword(req.body.currentPassword);
    if (!matchPassword) {
        return next(new errorResponse('Incorrect Password', 404));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
})
exports.updateUserCrediantials = asyncHandler(async (req, res, next) => {
    if (req.body.password || req.body.role) {
        return next(new errorResponse('Not authorized to change password,role', 404));
    }
    const newuser = await User.findById(req.user._id);

    const user = await User.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true });
    res.status(200).json({ data: user })

    // else {
    //     req.body.unverifiedEmail = req.body.email;
    //     const request = req.body;
    //     delete request.email;
    //     let user = await User.findByIdAndUpdate(req.user._id, request, { new: true, runValidators: true });


    //     const token = user.getVerificationToken();
    //     await user.save({ validateBeforeSave: false });

    //     if (user) {
    //         user = await User.findByIdAndUpdate(req.user._id, { isVerified: false }, { new: true, runValidators: true });
    //     }

    //     const verificationUrl = `http://127.0.0.1:5173/editemailverification/${token}`;

    //     const message = `Please verify your email by clicking on the link below: \n\n ${verificationUrl}`;

    //     try {
    //         await sendEmail({
    //             email: request.unverifiedEmail,
    //             subject: 'Email Verification',
    //             message
    //         })
    //         return res.status(200).json({ success: true, data: 'Email sent', user });
    //     } catch (err) {
    //         console.log(err);
    //         user.verificationToken = undefined;
    //         user.verificationTokenExpire = undefined;
    //         await user.save({ validateBeforeSave: false });
    //         return next(new errorResponse('Email could not be sent', 500));
    //     }

    //     res.status(200).json({ status: true, data: user });
    // }
})

exports.forgotPasswordToken = asyncHandler(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new errorResponse('User not found with given email', 404));
    }

    const resetToken = user.getResetPasswordToken();
    const resetUrl = `${req.protocol}://${req.get(
        'host',
    )}/api/v1/user/resetpassword/${resetToken}`;

    await user.save({ validateBeforeSave: false });

    const options = {
        email: req.body.email,
        subject: 'Reset Password',
        message: `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`
    }

    try {
        await sendEmail(options);

        res.status(200).json({ success: true, data: 'Email sent' });
    } catch (err) {
        console.log(err);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new errorResponse('Email could not be sent', 500));
    }

})

exports.resetPassword = asyncHandler(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

    const user = await User.findOne({ resetPasswordToken: resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });

    if (!user) {
        return next(new errorResponse('Invalid Token', 404));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendTokenResponse(user, 200, res);
})

exports.logout = asyncHandler(async (req, res, next) => {

    // ! Setting the token to none on user logging out.
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    })

    res.status(200).send({ status: "success", data: {} })

})