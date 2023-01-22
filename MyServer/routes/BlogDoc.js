require('dotenv').config();

const express = require('express');
const Document = require('../models/Document.js');
const blogcard = require('../models/Blogcard.js');
var ObjectId = require('mongodb').ObjectId;
const router = express.Router();
const fetchuser = require('../middlewares/fetchuser');
const { response } = require('express');

const JWT_SECRET = process.env.JWT_SECRET;

// Finding the document using
const defaultValue = ''

async function findorCreateDocument(id, userid,creatorname) {
    if (id == null) return

    const document = await Document.findById(id)
    if (document) return document;

    return await Document.create({ _id: id, data: defaultValue, userID: ObjectId(userid) ,creatorname:creatorname});

}

/*untied/unchained API calls (not user specific)*/
router.post('/createblog', async (req, res) => {
    // our middleware fetchuser has put req.user=data.user
    try {
        const document = await findorCreateDocument(req.body.documentId, req.body.userID,req.body.creatorname)

        if (document.data) return res.json({ "success": true, "msg": "existing document founded", document });

        return res.json({ "success": true, "msg": "new document created", document })

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})


router.put('/updatedoc/:id', async (req, res) => {
    const { data, userID ,creatorname} = req.body;
    const replacedoc = {};


    //!do it using a loop  write less write effective

    const currentTime = new Date();
    const localtime = currentTime.toLocaleString();

    if (req.params.id) { replacedoc._id = req.params.id }
    if (data) { replacedoc.data = data }
    if (userID) { replacedoc.userID = ObjectId(userID) }
    if (creatorname) { replacedoc.creatorname = creatorname }
    replacedoc.Record_date = localtime;


    // Find the doc to be updated and update it
    let doc = await Document.findById(req.params.id);
    if (!doc) {
        res.status(404).send("Not found ");
    }

    try {
        //checking whether the user trying to update the item is the same as the one who created it.
        if (doc.userID.toString() !== userID) {
            res.json({ success: false, result: "No Edit Rights for this blog" });;
        }

        updatedDoc = await Document.findByIdAndUpdate(req.params.id, { $set: replacedoc }, { new: true })

        res.json({ success: true, result: "document successfully updated", updatedDoc });

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})



// deleting the item
router.delete('/deletedoc/:id', async (req, res) => {
    let doc = await Document.findById(req.params.id);
    if (!doc) {
        res.status(404).send("Not found ");
    }

    try {
        //checking whether the user trying to update the note is the same as the one who created it.
        // if (doc.User.toString() !== req.user.id) {
        //     res.status(401).send("Not Allowed");
        // }

        doc = await Document.findByIdAndDelete(req.params.id);
        res.json({ success: true, result: "Document successfully deleted", doc });

    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error")
    }
})


module.exports = router;