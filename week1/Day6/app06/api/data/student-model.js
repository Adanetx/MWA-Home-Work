const mongoose = require("mongoose");
// 
const studentSchema = new mongoose.Schema({
    name: {
        type: String

    },
    GPA: {
        type: Number

    }
})

mongoose.model("Student", studentSchema, "students")