const express = require("express");
const router = express.Router();
const controllerGames = require("../controller/games.controller");
router.route("/games").get(controllerGames.gamesGetAll);
router.route("/games/:gameId").get(controllerGames.gamesGetOne);
module.exports = router;