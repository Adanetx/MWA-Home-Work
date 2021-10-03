const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    courseName: String,
    courseCode: Number
});
const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    GPA: Number,
    courses: [courseSchema]

});
const Student = mongoose.model("Student", studentSchema, "students")
module.exports = Student;