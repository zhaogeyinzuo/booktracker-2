const express = require("express");
const app = express();
const path = require("path");
const favicon = require("serve-favicon");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const books = require("./server/routes/books");
const readers = require("./server/routes/readers");
const errores = require("./server/routes/errores");

app.use(favicon(path.join(__dirname, "dist/booktracker-2/favicon.ico")));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "dist/booktracker-2")));

app.use("/api/readers", readers);
app.use("/api/books", books);
app.use("/api/errores", errores);
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist/booktracker-2/index.html"));
});

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    next(err);
});

if(app.get("env") === "development"){
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render("error", {
            message: err.message,
            error: err
        })
    });
}

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render("error", {
        message: err.message,
        error: err
    });
});

const debug = require("debug")("server");

app.set("port", process.env.PORT || 3000);
app.listen(app.get("port"));

console.log("Listening on Port: " + app.get("port"));

module.exports = app;