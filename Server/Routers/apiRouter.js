const express = require("express");
const router = express.Router();
const chatiController = require("../controller/api");
router.post("/getAns", chatiController.chai);
module.exports = router;
