"use strict";

var mongoose = require("mongoose");

var Game = mongoose.model("Game");

var getAllPublisher = function getAllPublisher(req, res) {
  console.log("get request to publisher received");
  var gameId = req.params.gameId;

  if (!mongoose.isValidObjectId(gameId)) {
    console.log("In valid game Id");
    res.status(400).json("In valid game Id");
    return;
  }

  Game.findById(gameId).select("publisher").exec(function (err, game) {
    if (err) {
      console.log("error found");
      res.status(500).json(err);
    } else {
      if (!game) {
        console.log("game Id not found");
        res.status(404).json({
          message: "game with not found"
        });
      } else {
        res.status(200).json(game.publisher);
      }
    }
  });
};

module.exports = {
  getAllPublisher: getAllPublisher
};