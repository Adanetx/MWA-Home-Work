const mongoose = require("mongoose");
const Game = mongoose.model("Game");
const gamesGetAll = function(req, res) {
    let offset = 0;
    let count = 5;
    let max = 12;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10)
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10)
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json("message: queryString of offset and count should be a number")
    }
    if (count <= max) {

        Game.find().skip(offset).limit(count).exec(function(err, games) {
            if (err) {
                console.log("error finding games");
                res.status(500).json(err)
            } else {
                console.log("founded game", games.length);
                res.json(games)
            }
        });
    } else
        res.status(500).json("out of limit")
}

const gamesGetOne = function(req, res) {
    console.log("get one recieved");

    const gameId = req.params.gameId;


    if (!mongoose.isValidObjectId(gameId)) {
        console.log("Invalid game id");
        res.status(400).json({ "message": " Invalid game Id" })
    }



    Game.findById(gameId).exec(function(err, game) {
        if (err) {
            console.log("error finding game");
            res.status(500).json(err)
        }
        console.log("the founded games is ", game);
        res.status(200).json(game);
    })
}

module.exports = {
    gamesGetAll: gamesGetAll,
    gamesGetOne: gamesGetOne
}