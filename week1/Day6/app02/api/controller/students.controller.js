const mongoose = require("mongoose");
const Student = mongoose.model("Student");
const studentsGetAll = function(req, res) {
    let offset = 0;
    let count = 5;
    let max = 12;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset, 10)
    }
    if (req.query && req.query.count) {
        count = parseInt(req.query.count, 10)
    }
    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json("message: queryString of offset and count should be a number")
    }
    if (count <= max) {

        Student.find().skip(offset).limit(count).exec(function(err, students) {
            if (err) {
                console.log("error finding students");
                res.status(500).json(err)
            } else {
                console.log("founded students", students.length);
                res.json(students)
            }
        });
    } else
        res.status(500).json("out of limit")
}

const studetsGetOne = function(req, res) {
    console.log("get one recieved");

    const studentId = req.params.studentId;

    console.log('studentId  ', studentId);

    if (!mongoose.isValidObjectId(studentId)) {
        console.log("Invalid student id");
        res.status(400).json({ "message": " Invalid student Id" })
    }



    Student.findById(studentId).exec(function(err, student) {
        console.log(student);
        if (err) {
            console.log("error finding student");
            res.status(500).json(err)
        }
        console.log("the founded studet is ", student);
        res.status(200).json(student);
    })
}

module.exports = {
    studentsGetAll: studentsGetAll,
    studentsGetOne: studetsGetOne
}