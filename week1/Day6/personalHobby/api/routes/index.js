const express = require("express");
const router = express.Router();
const IngController = require("../controller/ingridients")
const foodsController = require("../controller/foods.controller");
router.route("/foods").get(foodsController.foodsGetAll);
router.route("/foods/:foodId").get(foodsController.foodsGetOne);
router.route("/foods").post(foodsController.addFood);
router.route("/foods/:foodId").delete(foodsController.deletFood);
router.route("/foods/:foodId").put(foodsController.foodUpate);
router.route("/foods/:foodId/ingridients").get(IngController.getAllIngridient);
router.route("/foods/:foodId/ingridients").post(IngController.addOne);
router.route("/foods/:foodId/ingridients/:ingridientId").put(IngController.updateOne);
router.route("/foods/:foodId/ingridients/:ingridientId").get(IngController.getOne);
router.route("/foods/:foodId/ingridients/:ingridientId").delete(IngController.deleteOne);



module.exports = router;