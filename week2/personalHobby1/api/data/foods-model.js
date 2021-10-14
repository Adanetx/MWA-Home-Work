const mongoose = require("mongoose");
// 
const ingridentSchema = new mongoose.Schema({
    substance: {
        type: String
    },
    amount: {
        type: String
    },
    catagory: {
        type: String
    }

});

const foodSchema = new mongoose.Schema({
    name: {
        type: String
    },
    origin: {

        type: String
    },
    calory: {
        type: Number
    },
    ingridients: [ingridentSchema],


});
mongoose.model("Food", foodSchema, "foods");