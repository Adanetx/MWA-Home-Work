const mongoose = require("mongoose");
// 
const reviewSchema = new mongoose.Schema({
    name: {
        type: Stirng
    },
    review: {
        type: String
    },
    date: {
        type: Date
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