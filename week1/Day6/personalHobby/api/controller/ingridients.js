const mongoose = require("mongoose");
const Food = mongoose.model("Food");
const getAllIngridient = function(req, res) {
    console.log("get request to all ingridients");

    let foodId = req.params.foodId;

    if (!mongoose.isValidObjectId(foodId)) {
        console.log("In valid Id");
        res.status(400).json("Invalid food Id");
        return;
    }
    Food.findById(foodId)
        .select("ingridients")
        .exec(function(err, food) {
            if (err) {
                console.log("error foud");
                res.status(500).res.json({ message: "there is error" });
            } else {
                if (!food) {
                    console.log("food id is not found");
                    res.status(400).json({ message: "food is not found" });
                } else {
                    res.status(200).json(food.ingridients);
                }
            }
        });
};
const addOne = function(req, res) {
    const foodId = req.params.foodId;

    console.log("the food Id is ", foodId);
    Food.findById(foodId).exec(function(err, food) {
        if (err) {
            console.log("there is error");
        } else if (!food) {
            res.status(400).json("food is not found");
        } else {
            const newfood = {
                substance: req.body.substance,
                amount: req.body.amount,
                catagory: req.body.catagory,
            };
            food.ingridients.push(newfood);
            food.save(function(err, result) {
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
const getOne = function(req, res) {
    const foodId = req.params.foodId;
    const ingridientId = req.params.ingridientId;
    if (!mongoose.isValidObjectId(foodId)) {
        console.log("In valid Id");
        res.status(400).json({ message: "put valid Id" });
        return;
    } else {
        Food.findById(foodId)
            .select("ingridients")
            .exec(function(err, food) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                    return;
                } else {
                    if (!food) {
                        console.log("student is not found");
                        res.status(404).json({ message: "there is not match food" });
                    } else {
                        console.log("Ingrident Id", ingridientId);

                        res.status(200).json(food.ingridients.id(ingridientId));
                    }
                }
            });
    }
};

const updateOne = function(req, res) {
    const foodId = req.params.foodId;
    const ingridientId = req.params.ingridientId;

    console.log("the food Id is ", foodId);
    Food.findById(foodId).exec(function(err, food) {
        if (err) {
            console.log("there is error");
        } else if (!food) {
            res.status(400).json("food is not found");
        } else {
            let index = -1;

            for (let i = 0; i < food.ingridients.length; i++) {
                if (food.ingridients[i].id === ingridientId) {
                    index = i;
                }
            }
            console.log("index ", index);

            food.ingridients[index].substance = req.body.substance;
            food.ingridients[index].amount = req.body.amount;
            food.ingridients[index].catagory = req.body.catagory;

            food.save(function(err, result) {
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
    const foodId = req.params.foodId;
    const ingridientId = req.params.ingridientId;

    console.log("the food Id is ", foodId);
    Food.findById(foodId).exec(function(err, food) {
        if (err) {
            console.log("there is error");
        } else if (!food) {
            res.status(400).json("food is not found");
        } else {
            let index = -1;

            for (let i = 0; i < food.ingridients.length; i++) {
                if (food.ingridients[i].id === ingridientId) {
                    index = i;
                }
            }
            console.log("index ", index);

            food.ingridients.splice(index, 1);

            food.save(function(err, result) {
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
    getAllIngridient: getAllIngridient,
    addOne: addOne,
    getOne: getOne,
    updateOne: updateOne,
    deleteOne: deleteOne
};