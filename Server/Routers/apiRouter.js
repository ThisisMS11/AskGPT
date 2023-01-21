const express = require("express");
const router = express.Router();
const chatiController = require("../controllers/api");
router.post("/getAns", chatiController.chai);
module.exports = router;
