const express = require("express");
const path = require("path");
const routes = require("./api/routes")
require("./api/data/dbconnection.js").open()
const app = express();
app.set("port", 3000);
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: false }))
app.use(express.json({ extended: false }))
app.use("/api", routes);

const server = app.listen(app.get("port"), function() {
    const port = server.address().port;
    console.log("Listening to port " + port)
})