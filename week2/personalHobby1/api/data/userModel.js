const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String
    },
    password: {
        type: String,
        require: true
    },

})
mongoose.model("User", userSchema)