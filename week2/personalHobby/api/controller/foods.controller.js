const mongoose = require("mongoose");
const Food = mongoose.model("Food");
const foodsGetAll = function(req, res) {
    let offset = 0;
    let count = 5;
    let max = 20;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10);
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10);
    }
    if (isNaN(offset) || isNaN(count)) {
        res
            .status(400)
            .json("message: queryString of offset and count should be a number");
    }
    if (count <= max) {
        Food.find()
            .skip(offset)
            .limit(count)
            .exec(function(err, foods) {
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

const foodsGetOne = function(req, res) {
    console.log("get one received");

    const foodId = req.params.foodId;
    console.log("the Id of requested food is ", foodId);

    if (!mongoose.isValidObjectId(foodId)) {
        console.log("Invalid food id");
        res.status(400).json({ message: " Invalid food Id" });
    }


    Food.findById(foodId).exec(function(err, food) {
        if (err) {
            console.log("error found");
            res.status(400).json(err);
        }

        console.log("the found food is ", food);
        res.status(200).json(food);
    });
};

const addFood = function(req, res) {
    let newFood = {
        name: req.body.name,
        origin: req.body.origin,
        calory: req.body.calory,
    };
    console.log("new food ", req.body.name);
    Food.create(newFood, function(err, data) {
        if (err) {
            res.status(500).json(err);
            return;
        }
        res.status(201).json(data);
    });
};

const deletFood = function(req, res) {
    const foodId = req.params.foodId;
    if (!mongoose.isValidObjectId(foodId)) {
        console.log("Invalid food id");
        res.status(400).json({ message: " Invalid food Id" });
    }

    console.log("DELETE food Id", foodId);
    Food.findByIdAndRemove(foodId).exec(function(err, deletedFood) {
        const response = {
            status: 204,
            message: [],
        };
        if (err) {
            console.log("Error fiding food");
            response.status = 404;
            response.message = err;
        } else if (!deletedFood) {
            response.status = 500;
            res.json({ message: "food Id not found" });
        }
        res.status(response.status).json({ message: "food already deleted" });
    });
};

const foodUpate = function(req, res) {
    console.log("update received");
    const foodId = req.params.foodId;

    if (!mongoose.isValidObjectId(req.params.foodId)) {
        console.log("Invalid food id");
        res.status(400).json({ message: " Invalid food Id" });
        return;
    }

    Food.findById(foodId).exec(function(err, food) {
        if (err) {
            console.log("Error finding food");

            res.status(500).json(err);
        } else if (!food) {
            console.log("food not found");
            res.status(404).json({ message: "food Id not found" });
        } else {
            food.name = req.body.name;
            food.origin = req.body.origin;
            food.calory = parseInt(req.body.calory);

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
    addFood: addFood,
    deletFood: deletFood,
    foodUpate: foodUpate,
};