"use strict";

var mongoose = require("mongoose"); // 


var publisherSchema = new mongoose.Schema({
    name: String,
    country: String
});
var gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    price: Number,
    designer: [String],
    player: {
        type: Number,
        min: 1,
        max: 10
    },
    rate: {
        type: Number,
        min: 1,
        max: 5,
        "default": 1
    },
    publisher: publisherSchema
});
var Game = mongoose.model("Game", gameSchema, "games");
module.exports = Game;