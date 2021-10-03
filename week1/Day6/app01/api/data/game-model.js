const mongoose = require("mongoose");
// 
const gameSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: Number,
    price: Number,
    designer: [String],
    palyer: {
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

});
const Game = mongoose.model("Game", gameSchema, "games")
module.exports = Game;