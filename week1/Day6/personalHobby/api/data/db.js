const mongoose = require("mongoose")
const url = `${process.env.DATABASE_URL}/${process.env.DATA_BASE}`
const game = require("./foods-model")
mongoose.connect(url);
mongoose.connection.on("connected", function() {
    console.log("Mongoose connected to " + url);
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