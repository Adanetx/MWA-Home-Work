const mongoose = require("mongoose");
const Job = mongoose.model("JobSearch");
const getAllJobs = (req, res) => {
    console.log("Debug test")
    let offset = 0;
    let count = 5;
    let max = 15;
    if (req.query && req.query.offset) {
        offset = parseInt(req.query.offset);
    }
    console.log("out query", req.query.count)
    if (req.query && req.query.count) {
        console.log("query", req.query.count)
        count = parseInt(req.query.count);
    }


    if (isNaN(offset) || isNaN(count)) {
        res.status(400).json("invalid query")
        return
    }


    if (count <= max) {
        console.log('count back2 ', count);
        console.log('offset back2 ', offset);
        Job.find().skip(offset).limit(count).exec((err, jobs) => {
            if (err) {
                console.log("there is error");
                res.json(err)
            } else {
                console.log("it works well");
                res.status(200).json(jobs)
            }
        })
    } else {
        res.status(500).json("there is Internal server error.");
    }
}
const jobGetOne = (req, res) => {
    console.log("get one received");
    const jobId = req.params.jobId
    if (!mongoose.isValidObjectId(jobId)) {
        console.log("Invalid  id");
        res.status(400).json({ message: " Invalid Id" });
    }
    Job.findById(jobId).exec((err, job) => {
        if (err) {

            console.log("erro found");
            res.status(400).json(err)
        }
        console.log("the fouded job is", job);
        res.status(200).json(job)
    })
}
const addJob = (req, res) => {
    let newJob = {
        title: req.body.title,
        salary: req.body.salary,
        description: req.body.description,
        // skill: req.body.skill,
        postDate: req.body.postDate

    };
    console.log("new job ", newJob);
    Job.create(newJob, (err, job) => {
        if (err) {
            console.log("data creation error");
            res.status(500).json(err)
            return
        }
        res.status(201).json(job)
    })
}
const deleteJob = (req, res) => {
    const jobId = req.params.jobId;
    if (!mongoose.isValidObjectId(jobId)) {
        console.log("Invalid  id");
        res.status(400).json({ message: " Invalid Id" });
    }
    console.log("element deleted");
    Job.findByIdAndRemove(jobId).exec((err, deletedJob) => {
        const response = {
            status: 204,
            message: []
        };
        if (err) {
            console.log(" there is error");
            response.status = 404;
            response.message = err;
        } else if (!deletedJob) {
            response.status = 500;
            res.json("job do not find")
        }
        res.status(response.status).json({ message: "already deleted" })
    })
}

const jobUpdate = (req, res) => {
    console.log("update received");
    const jobId = req.params.jobId;

    if (!mongoose.isValidObjectId(req.params.foodId)) {
        console.log("Invalid  id");
        res.status(400).json({ message: " Invalid Id" });
        return;
    }
    Job.findById(jobId).exec((err, job) => {
        if (err) {
            console.log("there is no food");
            res.status(500).json(err)
        } else {

            job.title = req.body.title,
                console.log(job.title);
            job.salary = req.body.salary,
                job.description = req.body.description,
                // skill = req.body.skill,
                job.postDate = req.body.postDate
            job.save((err, updated) => {

                if (err) {
                    res.status(500).json(err);
                    console.log("saving error");
                } else {
                    console.log("job updated");
                    res.status(200).json(updated);
                }
            })
        }

    })
}
module.exports = {
    getAllJobs: getAllJobs,
    jobGetOne: jobGetOne,
    addJob: addJob,
    deleteJob: deleteJob,
    jobUpdate: jobUpdate
}