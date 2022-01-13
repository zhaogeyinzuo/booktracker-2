const express = require("express");
const route = express.Router();
let fs = require("fs");

route.route("/500")
    .get((req, res) => {
        res.status(500).send("Book Tracker server error.");
    });

route.route("/401")
    .get((req, res) => {
        res.status(401).send("Book Tracker unauthorized.");
    });

module.exports = route;