const express = require("express");
const router = express.Router();
const calculateController = require("../controller/controller")
router.route("/calulate/:Id").get(calculateController.calculate)
module.exports = router;