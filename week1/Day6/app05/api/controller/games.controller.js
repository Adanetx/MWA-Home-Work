const mongoose = require("mongoose");
const Game = mongoose.model("Game");
const gamesGetAll = function(req, res) {
    let offset = 0;
    let count = 0;
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

const addOne = function(req, res) {
    let newGame = {}
    newGame.title = req.body.title;
    newGame.price = req.body.price;
    newGame.rate = req.body.rate;
    Game.create(newGame, function(err, data) {
        if (err) {
            res.status(400).json(err)
            return
        }
        res.status(200).json(data.ops)
    })
};

const deletGame = function(req, res) {
    const gameId = req.params.gameId;
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("Invalid game id");
        res.status(400).json({ "message": " Invalid game Id" })
    }

    if (!mongoose.isValidObjectId(gameId)) {
        console.log("Invalid game id");
        res.status(400).json({ "message": " Invalid game Id" })
    }


    console.log("DELETE gameId", gameId);
    Game.findByIdAndRemove(gameId).exec(function(err, deletedGame) {
        const response = {
            status: 200

        };
        if (err) {
            console.log("Error fiding game");
            response.status = 404;
            response.message = err;
        } else if (!deletGame) {
            response.status = 500;
            res.json({ "message": "game Id not found" })
        }
        res.status(404).json({ "message": "game already deleted" })
    });
};

const gameUpate = function(req, res) {
    console.log("update received");
    const gameId = req.params.gameId;

    if (!mongoose.isValidObjectId(req.params.gameId)) {
        console.log("Invalid game id");
        res.status(400).json({ "message": " Invalid game Id" })
        return;
    }


    Game.findById(gameId).exec(function(err, game) {
        //const response = { status: 204 }
        if (err) {

            console.log("Error finding game");
            // response.status = 500;
            // response.message = err;
            res.status(500).json(err);
        } else if (!game) {
            console.log("game not found");
            res.status(404).json({ "message": "Game Id not found" });


        } else {
            //     //if (response.status !== 200) {
            //         res.status(200).json()
            // }

            // }
            game.title = req.body.title;
            game.year = parseInt(req.body.year);
            game.price = parseFloat(req.body.price);

            // game.designer = req.body.designer;
            // game.rate = parseFloat(req.body.rate)
            game.save(function(err, updatedGame) {
                if (err) {
                    res.status(500).json(err);
                    console.log("saving error");
                } else {
                    console.log("game updated");
                    res.status(200).json(updatedGame);
                }
            });
        }
    });
};

module.exports = {
    gamesGetAll: gamesGetAll,
    gamesGetOne: gamesGetOne,
    addOne: addOne,
    deletGame: deletGame,
    gameUpate: gameUpate
}