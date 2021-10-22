const mongoose = require("mongoose")
const locationSchema = new mongoose.Schema({
    city: {
        type: String
    },
    zipCode: {
        type: Number
    },
    state: {
        type: String
    },
    coutry: {
        type: String
    }
})
const jobSearchingSchema = new mongoose.Schema({
    title: {
        type: String
    },
    salary: {
        type: Number,
    },
    description: {
        type: String
    },
    skill: {
        type: [String]
    },
    postDate: {
        type: Date

    },
    locations: [locationSchema]
})

mongoose.model("JobSearch", jobSearchingSchema);