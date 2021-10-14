const http = require("http")
const url = require("url");
const fs = require("fs")
const path = require("path")
const server = http.createServer((req, res) => {
    if (req.url == "/page1") {


        fs.readFile("./page1.html", function(err, data) {
            if (err) {
                res.end("404 Not Found")
            } else {
                res.writeHead(200, { "content-Type": "text/html" })
                console.log(data);
                res.send(data)
            }
        })
        res.end()
    }
    if (req.url == "/page2") {

        fs.readFile("./page2.html", function(err, data) {
            if (err) {
                res.end("404 Not Found")
            } else {
                res.writeHead(200, { "content-Type": "text/html" })

                console.log(data);
                res.send(data)
            }
        })
        res.end()
    }
    if (req.url == "/page3") {

        fs.readFile("./page3.html", function(err, data) {
            if (err) {
                res.end("404 Not Found")
            } else {

                res.writeHead(200, { "content-Type": "text/html" })
                console.log(data);
                res.send(data)
            }
        })
        res.end()
    } else {

        res.end('Invalid Request!');
    }
})

server.listen(3000)
console.log("server is runnig at 3000 port");