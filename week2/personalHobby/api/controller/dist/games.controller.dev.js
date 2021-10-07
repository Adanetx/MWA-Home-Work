"use strict";

var mongoose = require("mongoose");

var Food = mongoose.model("Food");

var foodsGetAll = function foodsGetAll(req, res) {
    var offset = 0;
    var count = 5;
    var max = 12;

    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }

    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }

    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json("message: queryString of offset and count should be a number");
    }

    if (count <= max) {
        Food.find().skip(offset).limit(count).exec(function(err, foods) {
            if (err) {
                console.log("error finding foods");
                res.status(500).json(err);
            } else {
                console.log("founded food", foods.length);
                res.json(foods);
            }
        });
    } else res.status(500).json("out of limit");
};

var foodsGetOne = function foodsGetOne(req, res) {
    console.log("get one recieved");
    var foodId = req.params.foodId;

    if (!mongoose.isValidObjectId(foodId)) {
        console.log("Invalid food id");
        res.status(400).json({
            "message": " Invalid food Id"
        });
    }

    Food.findById(foodId).exec(function(err, food) {
        if (err) {
            console.log("error finding food");
            res.status(500).json(err);
        }

        console.log("the founded foods is ", food);
        res.status(200).json(food);
    });
};

var addOne = function addOne(req, res) {
    var newFood = {};
    newFood.title = req.body.title;
    newFood.price = req.body.price;
    newFood.rate = req.body.rate;
    Food.create(newFood, function(err, data) {
        if (err) {
            res.status(400).json(err);
            return;
        }

        res.status(200).json(data.ops);
    });
};

var deletFood = function deletFood(req, res) {
    var foodId = req.params.foodId;

    if (!mongoose.isValidObjectId(foodId)) {
        console.log("Invalid food id");
        res.status(400).json({
            "message": " Invalid food Id"
        });
    }

    if (!mongoose.isValidObjectId(foodId)) {
        console.log("Invalid food id");
        res.status(400).json({
            "message": " Invalid food Id"
        });
    }

    console.log("DELETE foodId", foodId);
    Food.findByIdAndRemove(foodId).exec(function(err, deletedFood) {
        var response = {
            status: 200
        };

        if (err) {
            console.log("Error fiding food");
            response.status = 404;
            response.message = err;
        } else if (!deletFood) {
            response.status = 500;
            res.json({
                "message": "food Id not found"
            });
        }

        res.status(404).json({
            "message": "food already deleted"
        });
    });
};

var foodUpate = function foodUpate(req, res) {
    console.log("update received");
    var foodId = req.params.foodId;

    if (!mongoose.isValidObjectId(req.params.foodId)) {
        console.log("Invalid food id");
        res.status(400).json({
            "message": " Invalid food Id"
        });
        return;
    }

    Food.findById(foodId).exec(function(err, food) {
        //const response = { status: 204 }
        if (err) {
            console.log("Error finding food"); // response.status = 500;
            // response.message = err;

            res.status(500).json(err);
        } else if (!food) {
            console.log("food not found");
            res.status(404).json({
                "message": "Food Id not found"
            });
        } else {
            //     //if (response.status !== 200) {
            //         res.status(200).json()
            // }
            // }
            food.title = req.body.title;
            food.year = parseInt(req.body.year);
            food.price = parseFloat(req.body.price); // food.designer = req.body.designer;
            // food.rate = parseFloat(req.body.rate)

            food.save(function(err, updatedFood) {
                if (err) {
                    res.status(500).json(err);
                    console.log("saving error");
                } else {
                    console.log("food updated");
                    res.status(200).json(updatedFood);
                }
            });
        }
    });
};

module.exports = {
    foodsGetAll: foodsGetAll,
    foodsGetOne: foodsGetOne,
    addOne: addOne,
    deletFood: deletFood,
    foodUpate: foodUpate
};