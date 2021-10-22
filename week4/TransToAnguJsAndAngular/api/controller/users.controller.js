var mongoose = require("mongoose");
var User = mongoose.model("User");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

module.exports.register = function(req, res) {
    console.log("Registering user");
    console.log("the request body is ", req.body);
    var username = req.body.username;
    var name = req.body.name || null;
    console.log("req.body ", req.body);
    console.log("username ", username);
    console.log("name ", name);
    console.log("req.body.password ", req.body.password);
    var password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    console.log("password ", password);
    User.create({ username: username, name: name, password: password }, function(err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        } else {
            console.log("user created", user);
            res.status(201).json(user);
        }
    });
};

module.exports.login = function(req, res) {
    console.log("Logging in user");
    var username = req.body.username;
    var password = req.body.password;
    User.findOne({ username: username }).exec(function(err, user) {
        if (err) {
            console.log(err);
            res.status(400).json(err);
        }
        if (user) {
            console.log("user ", user);
            console.log("password ", password);
            console.log("user.password ", user.password);
            if (bcrypt.compareSync(password, user.password)) {
                console.log("user found", user);
                var token = jwt.sign({ username: user.username }, "cs572", { expiresIn: 3600 });
                res.status(200).json({ success: true, token: token });
            } else {
                console.log("Unauthorized");
                res.status(401).json("Unauthorized");
            }
        } else {
            console.log("user not found", user);
            res.status(401).json("Unauthorized");
        }
    });
};