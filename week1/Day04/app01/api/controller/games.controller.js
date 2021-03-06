const { json } = require("express");
const dbConnection = require("../data/dbconnection.js");

const gamesGetAll = function(req, res) {
    const db = dbConnection.get();
    const collection = db.collection("games");
    let offset = 0;
    let count = 6;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);

    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (count <= 9) {
        collection.find().skip(offset).limit(count).toArray(function(err, docs) {
            console.log("found games", docs);
            res.status(200).json(docs);
        })
    } else {
        res.status(500).json({ error: "put input less than 9" })
    }
}


// 
module.exports = {

    gamesGetAll: gamesGetAll
}