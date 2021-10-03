const express = require("express");
const router = express.Router();
const foodsController = require("../controller/foods.controller");
router.route("/foods").get(foodsController.foodsGetAll);
router.route("/foods/:foodId").get(foodsController.foodsGetOne);
router.route("/foods").post(foodsController.addFood);
router.route("/foods/:foodId").delete(foodsController.deletFood);
router.route("/foods/:foodId").put(foodsController.foodUpate);


module.exports = router;