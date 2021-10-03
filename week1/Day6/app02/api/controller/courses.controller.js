const mongoose = require("mongoose");
const Student = mongoose.model("Student");


const studentCourse = function(req, res) {
        console.log("get one recieved");

        const studentId = req.params.studentId;



        if (!mongoose.isValidObjectId(studentId)) {
            console.log("Invalid student id");
            res.status(400).json({ "message": " Invalid student Id" })
        }



        Student.findById(studentId).select("courses").exec(function(err, student) {
            if (err) {
                console.log("error finding students");
                res.status(500).json(err)
            }
            console.log("the founded studets is ", student);
            res.status(200).json(student.courses);
        })
    }
    //
const getOneCourse = function(req, res) {
    const studentId = req.params.studentId
    const courseId = parseInt(req.params.courseId)

    if (!mongoose.isValidObjectId(studentId)) {
        console.log("make sure you put valid student and course id valild");
        res.status(400).json({ "message": "invalid Id" })
        return
    } else {
        Student.findById(studentId).select("courses").exec(function(err, student) {
            if (err) {
                console.log(err);
                res.status(500).json(err)
                return
            } else {
                if (!student) {
                    console.log("Student Id not found");
                    res.status(404).json({ "message": "error" })
                    return
                } else {
                    console.log("courseId ", courseId);
                    res.status(200).json(student.courses.find(course => course.courseCode === courseId))
                }
            }
        })
    }
}

module.exports = {
    studentCourse: studentCourse,
    getOneCourse: getOneCourse
}