const jobIn = require("../controller/myController")
const express = require("express");

const router = express.Router();

router.route("/jobs").get(jobIn.getAllJobs);
router.route("/jobs/:jobId").get(jobIn.jobGetOne);
router.route("/jobs").post(jobIn.addJob);
router.route("/jobs/:jobId").delete(jobIn.deleteJob);
router.route("/jobs/:jobId").put(jobIn.jobUpdate);
module.exports = router;