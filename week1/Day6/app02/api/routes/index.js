const express = require("express");
const router = express.Router();
const courses = require("../controller/courses.controller")
const controllerStudents = require("../controller/students.controller");
router.route("/students").get(controllerStudents.studentsGetAll);
router.route("/students/:studentId").get(controllerStudents.studentsGetOne);
router.route("/students/:studentId/courses").get(courses.studentCourse)
router.route("/students/:studentId/courses/:courseId").get(courses.getOneCourse)

module.exports = router;