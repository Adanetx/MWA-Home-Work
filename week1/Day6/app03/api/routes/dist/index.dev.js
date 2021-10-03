"use strict";

var express = require("express");

var router = express.Router();

var controllerGames = require("../controller/games.controller");

router.route("/games").get(controllerGames.gamesGetAll);
router.route("/games/:gameId").get(controllerGames.gamesGetOne);
router.route("/games").post(controllerGames.addOne);
router.route("/games/:gameId")["delete"](controllerGames.deletGame);
router.route("/games/:gameId").put(controllerGames.gameUpate);
module.exports = router;