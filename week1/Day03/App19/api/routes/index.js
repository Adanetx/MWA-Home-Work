const express = require("express");
const router = express.Router();
const calculateController = require("../controller/calculate")
router.route("/calculate/:Id").get(calculateController.calculate)

module.exports = router;