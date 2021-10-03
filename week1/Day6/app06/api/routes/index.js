const express = require("express");
const router = express.Router();
const studentsController = require("../controller/student.controller");
router.route("/students").get(studentsController.getALlStudents);
router.route("/students/:studentId").get(studentsController.getOneStudent);
router.route("/students").post(studentsController.addOneStudent);
router.route("/students/:studentId").delete(studentsController.deletStudent);
router.route("/students/:studentId").put(studentsController.studentUpate);


module.exports = router;