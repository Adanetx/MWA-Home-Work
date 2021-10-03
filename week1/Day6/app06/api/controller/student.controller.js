const mongoose = require("mongoose");
const Student = mongoose.model("Student");
const getALlStudents = function(req, res) {
    let offset = 0;
    let count = 5;
    let max = 20;
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
                console.log("founded student", students.length);
                res.json(students)
            }
        });
    } else
        res.status(500).json("out of limit")
}

const getOneStudent = function(req, res) {
    console.log("get one recieved");

    const studentId = req.params.studentId;

    if (!mongoose.isValidObjectId(studentId)) {
        console.log("Invalid student Id");
        res.status(400).json({ "message": " Invalid student Id" })
    }



    Student.findById(studentId).exec(function(err, student) {
        if (err) {
            console.log("error finding student");
            res.status(500).json(err)
        }
        console.log("the founded student is ", student);
        res.status(200).json(student);
    })
}

const addOneStudent = function(req, res) {
    let newStudent = { name: req.body.nam, GPA: praseFloat(req.body.GPA) }


    console.log("the inserted student is ", newStudent.name);
    Student.create(newStudent, function(err, data) {
        if (err) {
            res.status(400).json(err)
            return
        }
        console.log("the new posted student is", data)
        res.status(201).json(data)
    })
};

const deletStudent = function(req, res) {
    const studentId = req.params.studentId;
    if (!mongoose.isValidObjectId(studentId)) {
        console.log("Invalid  student Id");
        res.status(400).json({ "message": " Invalid  student Id" })
    }

    if (!mongoose.isValidObjectId(studentId)) {
        console.log("Invalid  student Id");
        res.status(400).json({ "message": " Invalid  student Id" })
    }


    console.log("DELETE  student Id", studentId);
    Student.findByIdAndRemove(studentId).exec(function(err, deletedStudent) {
        const response = {
            status: 200

        };
        if (err) {
            console.log("Error fiding student");
            response.status = 404;
            response.message = err;
        } else if (!deletedStudent) {
            response.status = 500;
            res.json({ "message": "student Id not found" })
        }
        res.status(404).json({ "message": "student already deleted" })
    });
};

const studentUpate = function(req, res) {
    console.log("update received");
    const studentId = req.params.studentId;

    if (!mongoose.isValidObjectId(req.params.studentId)) {
        console.log("Invalid student id");
        res.status(400).json({ "message": " Invalid student Id" })
        return;
    }


    Student.findById(studentId).exec(function(err, student) {

        if (err) {

            console.log("Error finding studnet");

            res.status(500).json(err);
        } else if (!student) {
            console.log("student not found");
            res.status(404).json({ "message": "student Id not found" });


        } else {

            student.name = req.body.name;
            student.GPA = parseInt(req.body.GPA);


            student.save(function(err, updatedStudent) {
                if (err) {
                    res.status(500).json(err);
                    console.log("saving error");
                } else {
                    console.log("student updated");
                    res.status(200).json(updatedStudent);
                }
            });
        }
    });
};

module.exports = {
    getALlStudents: getALlStudents,
    getOneStudent: getOneStudent,
    deletStudent: deletStudent,
    addOneStudent: addOneStudent,
    studentUpate: studentUpate
}