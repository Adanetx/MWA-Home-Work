const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcrypt");
const register = function(req, res) {
    console.log("registering user");
    let username = req.body.username;
    let name = req.body.name || null;
    let password = req.body.password
    User.create({ username: username, name: name, password: password },
        function(err, user) {
            if (err) {
                console.log(err);
                res.status(400).json(err);
            }
        }
    );
};
const login = function(req, res) {
    console.log("logging in user");
    let username = req.body.username;
    let password = req.body.password;
    User.findOne({ username: username }).exec(function(err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        }
        if (user) {
            if (bcrypt.compareSync(password, user.password)) {
                console.log("user found", user);
                res.status(200).json(user);
            } else {
                res.status(200).json("unautorized");
            }
        } else {
            console.log("user not foud", user);
            res.status(400).json("Unauthorized");
        }
    });
};
module.exports = {
    register: register,
    login: login
};