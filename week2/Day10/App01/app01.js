require("dotenv").config({ "path": ".env" })
const express = require("express");
require("./api/data/db")
const routes = require("./api/routes")

const path = require("path");

const app = express();
const PORT = process.env.PORT || 600;
app.set("port", PORT);

app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));

app.use('/node_modules', express.static(path.join(__dirname, "node_modules")))
app.use(express.static(path.join(__dirname, "public")))

app.use("/api", routes);
const server = app.listen(app.get("port"), function() {
    console.log("listening to the port " + process.env.PORT)
})