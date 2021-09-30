const gamesData = require("../data/games.json")

const gamesGetAll = function(re, res) {
        console.log("Get All Games");
        res.status(200).json(gamesData);
    }
    // below here are not for the assignment  they are for practice to me. 
    // but exposrt gamesGetAll is included in my assignment.
const gamesGetSome = function(req, res) {
    console.log(req.query);
    var offset = 0;
    var count = 5;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10)
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10)
    }
    const pageGames = gamesData.slice(offset, offset + count)
    res.status(200).json(pageGames)
}
const gamesGetOne = function(req, res) {
    console.log("get one game")
    const gameId = req.params.Id;
    const theGame = gamesData[gameId]
    console.log("get game with gameId " + gameId);
    res.status(200).json(theGame)
}
const gamesAddOne = function(req, res) {
    console.log("POST new games");
    console.log(req.body);
    res.status(200).json(req.body)
}

module.exports = {
    gamesGetSome: gamesGetSome,
    gamesGetOne: gamesGetOne,
    gamesAddOne: gamesAddOne,
    gamesGetAll: gamesGetAll
}