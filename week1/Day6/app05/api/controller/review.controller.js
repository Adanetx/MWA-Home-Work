const mongoose = require("mongoose");
const Game = mongoose.model("Game");
const getAllReviews = function(req, res) {
    console.log("get request to all reviews");

    let gameId = req.params.gameId;

    if (!mongoose.isValidObjectId(gameId)) {
        console.log("In valid Id");
        res.status(400).json("Invalid game Id");
        return;
    }
    Game.findById(gameId)
        .select("reviews")
        .exec(function(err, game) {
            console.log("game I got with review is ", game)
            if (err) {
                console.log("error foud");
                res.status(500).res.json({ message: "there is error" });
            } else {
                if (!game) {
                    console.log("review id is not found");
                    res.status(400).json({ message: "review is not found" });
                } else {
                    res.status(200).json(game.reviews);
                }
            }
        });
};
const addOne = function(req, res) {
    const gameId = req.params.gameId;

    console.log("the game Id is ", gameId);
    Game.findById(gameId).exec(function(err, game) {

        if (err) {
            console.log("there is error");
            res.status(500).json(err)
        } else if (!game) {
            res.status(400).json("game is not found");
        } else {
            const newReview = {
                name: req.body.name,
                review: req.body.review,
                date: req.body.date
            };
            if (game.reviews.length() == 0) {

            }
            console.log(" new review is ", newReview)
            game.reviews.push(newReview);
            game.save(function(err, result) {
                console.log("result", result)
                if (err) {
                    console.log("can not save due to error");
                    res.status(500).json(err);
                } else {
                    res.status(200).json(result);
                }
            });
        }
    });
};
const getOne = function(req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;
    if (!mongoose.isValidObjectId(gameId)) {
        console.log("In valid Id");
        res.status(400).json({ message: "put valid Id" });
        return;
    } else {
        Game.findById(gameId)
            .select("reviews")
            .exec(function(err, game) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                    return;
                } else {
                    if (!game) {
                        console.log("review is not found");
                        res.status(404).json({ message: "there is not match" });
                    } else {
                        console.log("review Id Id", reviewId);

                        res.status(200).json(game.reviews.id(reviewId));
                    }
                }
            });
    }
};

const updateOne = function(req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;

    console.log("the review Id is ", reviewId);
    Game.findById(gameId).exec(function(err, game) {
        if (err) {
            console.log("there is error");
        } else if (!game) {
            res.status(400).json("game is not found");
        } else {
            let index = -1;

            for (let i = 0; i < game.reviews.length; i++) {
                if (game.reviews[i].id === reviewId) {
                    index = i;
                }
            }
            console.log("index ", index);

            game.reviews[index].name = req.body.name;
            game.reviews[index].review = req.body.review;
            game.reviews[index].date = req.body.date;

            game.save(function(err, result) {
                if (err) {
                    console.log("there is error");
                    res.status(500).json(err);
                } else {
                    res.status(200).json(result);
                }
            });
        }
    });
};

const deleteOne = function(req, res) {
    const gameId = req.params.gameId;
    const reviewId = req.params.reviewId;

    console.log("the game Id is ", gameId);
    Game.findById(gameId).exec(function(err, game) {
        if (err) {
            console.log("there is error");
        } else if (!game) {
            res.status(400).json("game is not found");
        } else {
            let index = -1;

            for (let i = 0; i < game.reviews.length; i++) {
                if (game.reviews[i].id === reviewId) {
                    index = i;
                }
            }
            console.log("index ", index);

            game.reviews.splice(index, 1);

            game.save(function(err, result) {
                if (err) {
                    console.log("there is error");
                    res.status(500).json(err);
                } else {
                    res.status(200).json(result);
                }
            });
        }
    });
};

module.exports = {
    getReviews: getAllReviews,
    addOne: addOne,
    getOne: getOne,
    updateOne: updateOne,
    deleteOne: deleteOne
};