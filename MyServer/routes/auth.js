require('dotenv').config();

const express = require('express');
const User = require('../models/User.js');
const cloudinary = require('../utils/Cloudinary.js');
const router = express.Router();

const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

const { body, validationResult } = require('express-validator');

const fetchuser = require('../middlewares/fetchuser')

const JWT_SECRET = process.env.JWT_SECRET;


router.post('/register', [
    body('username', 'Enter a valid name').isLength({ min: 5 }),
    // ? Doubt area whether institute id considered to be valid gmail id..
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter at least a 5 character password').isLength({ min: 5 })
], async (req, res) => {



    const errors = validationResult(req);
    let success = false;
    /* this will come in if there are some errors regarding our user inputs.*/
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    const { username, password, email, displayname } = req.body;


    try {
        let user = await User.findOne({ email: req.body.email });

        if (user) {
            res.json({ success: true, result: "User Already Exists" })
        }

        // !Creating the webtoken from here on.
        // generating the salt to make our password even more stronger
        const salt = await bcrypt.genSalt(10);

        // generating the hash from the password.
        const secPass = await bcrypt.hash(password, salt);


        if (req.body.image) {
            const uploadRes = await cloudinary.uploader.upload(req.body.image, {
                upload_preset: 'BlogYouUsers'
            })

            if (uploadRes) {
                // uploadRes will contain information about the uploaded image.
                    user = await User.create({
                    username: username,
                    email: email,
                    displayname: displayname,
                    password: secPass,
                    image: uploadRes
                });

                // !The data to be used in signing our web token is here
                const data = {
                    user: {
                        id: user.id
                    }
                }

                // ! Signing the web token with payload and our secret code.
                const authtoken = jwt.sign(data, JWT_SECRET);
                res.json({ success: true, authtoken, user });
            }
        }
    
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }

})

router.post('/login', async (req, res) => {

    let success = false;

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });

        // if we didn't find any user then user=False; !user=True
        if (!user) {
            return res.status(400).json({ success, error: "please try to login with correct credentials" })
        }

        // !  converting the hash code that is our user.password into normal terms and comparing it with the req.body.password

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({ success, error: "please try to login with correct credentials" })
        }

        const data = {
            user: {
                id: user.id
            }
        }
        
        // generating a fresh auth token.(Auth Token is not saved in the database we create a new one every time user logins)
        console.log('our jwt secret:-', JWT_SECRET);

        const authtoken = jwt.sign(data, JWT_SECRET);
        res.json({ success: true, authtoken, user })

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }

})

// for getting userinfo using the authtoken provided at the time of login and signup
router.get('/userinfo', fetchuser, async (req, res) => {
    // res.json({ success: true, authtoken })
    let success = true;

    try {
        const userId = req.user.id;
        // All data except the user password is getting selected here
        const user = await User.findById(userId).select("-password");

        res.json({ success: true, user });

    } catch (error) {
        success = false;
        console.log(error);
        res.json({ success: false, error });
    }
})

module.exports = router;