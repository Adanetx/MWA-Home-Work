const mongoose = require("mongoose")
const dbName = 'Food';
const dburl = "mongodb://localhost:27017/" + dbName
const game = require("./foods-model")
mongoose.connect(dburl);
mongoose.connection.on("connected", function() {
    console.log("Mongoose connected to " + dburl);
});
mongoose.connection.on("diconnected", function() {
    console.log("Mongoose diconnected");
});
mongoose.connection.on("error", function(err) {
    console.log("Mongoose error " + err);
});
process.on("SIGINT", function() {
    mongoose.connection.close(function() {
        console.log("mongoose disconnected");
        process.exit(0)
    })
});
process.on("SIGTERM", function() {
    mongoose.connection.close(function() {
        console.log("Mongoose disconneted by app termination");
        process.exit(0);
    })
});

process.on("SIGUSR2", function() {
    mongoose.connection.close(function() {
        console.log("mongoose disconnected");
        process.kill((process.pid, "SIGUSR2"))
    })
});