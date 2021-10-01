const express = require("express");
const router = express.Router();
const controllerGames = require("../controller/games.controller");
router.route("/games").get(controllerGames.gamesGetAll);
// router.route("/games").get(controllerGames.gamesGetSome);
// router.route("/games/:Id").get(controllerGames.gamesGetOne);
// router.route("/games/new").post(controllerGames.gamesAddOne)
module.exports = router;