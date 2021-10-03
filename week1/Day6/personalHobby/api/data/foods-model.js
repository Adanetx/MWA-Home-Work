const mongoose = require("mongoose");
// 
const ingridentSchema = new mongoose.Schema({
    substance: String,
    amount: String,
    catagory: String

});
const foodSchema = new mongoose.Schema({
    name: String,
    origin: String,
    calory: Number,
    ingridient: [ingridentSchema]

});
mongoose.model("Food", foodSchema, "foods");