"use strict";

var express = require("express");

var router = express.Router();

var controllerFoods = require("../controller/foods.controller");

router.route("/foods").get(controllerFoods.foodsGetAll);
router.route("/foods/:foodId").get(controllerFoods.foodsGetOne);
router.route("/foods").post(controllerFoods.addOne);
router.route("/foods/:foodId")["delete"](controllerFoods.deletFood);
router.route("/foods/:foodId").put(controllerFoods.foodUpate);
module.exports = router;