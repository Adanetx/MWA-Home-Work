const express = require("express");
const router = express.Router();
const calculateController = require("../controller/calculate")
router.route("/calculate").get(calculateController.calculate)

module.exports = router;