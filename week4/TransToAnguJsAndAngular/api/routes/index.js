const controllerPublisher = require("../controller/publisher.controller")
const reviews = require("../controller/review.controller")
const controllerUsers = require("../controller/users.controller");

const express = require("express");
const router = express.Router();
const controllerGames = require("../controller/games.controller");
router.route("/games").get(controllerGames.gamesGetAll);
router.route("/games/:gameId").get(controllerGames.gamesGetOne);
router.route("/games").post(controllerGames.addOne);
router.route("/games/:gameId").delete(controllerGames.deletGame);
router.route("/games/:gameId").put(controllerGames.gameUpate);
router.route("/games/:gameId/publisher").get(controllerPublisher.getAllPublisher)
router.route("/games/:gameId/reviews").get(reviews.getReviews);
router.route("/games/:gameId/reviews").post(reviews.addOne);
router.route("/games/:gameId/reviews/:reviewId").get(reviews.getOne);
router.route("/games/:gameId/reviews/:reviewId").put(reviews.updateOne);
router.route("/games/:gameId/reviews/:reviewId").delete(reviews.deleteOne);
router.route("/users/register").post(controllerUsers.register);

router.route("/users/login").post(controllerUsers.login)
module.exports = router;