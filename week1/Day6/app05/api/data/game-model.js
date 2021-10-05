const mongoose = require("mongoose");
// 
const reviewSchema = new mongoose.Schema({
    name: {
        type: String
    },
    review: {
        type: String
    },
    date: {
        type: Date,
        min: "2020-09-28",
        max: "2026-05-23"
    }
})
const publisherSchema = new mongoose.Schema({
    name: String,
    country: String
})
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

    reviews: [reviewSchema],
    publisher: publisherSchema

});
const Game = mongoose.model("Game", gameSchema, "games")
module.exports = Game;