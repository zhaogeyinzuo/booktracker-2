const express = require("express");
const fs = require("fs");
const route = express.Router();
const fileData = "server/data/books.json";

route.route("/")
    .get((req, res) => {
        const data = getAllBooks();
        res.status(200).send(data);
    })
    .post((req, res) => {
        let data = getAllBooks();
        const bookId = getNextAvailableId(data);
        const newBook = {
            bookID: bookId,
            title: req.body.title,
            author: req.body.author,
            publicationYear: req.body.publicationYear
        };
        data.push(newBook);
        saveBook(data);
        res.status(200).send(newBook);
    });

route.route("/:id")
    .get((req, res) => {
        let data = getAllBooks();
        const updateBookId = parseInt(req.params.id, 10);
        let updateBooks = data.filter(item => item.bookID === updateBookId);
        if(updateBooks.length === 0 || updateBooks == undefined || updateBooks == null)res.sendStatus(404);
        else{
            res.status(200).send(updateBooks[0]);
        }
    })
    .put((req, res) => {
        let data = getAllBooks();
        const updateBookId = parseInt(req.params.id, 10);
        let updateBooks = data.filter(item => item.bookID === updateBookId);
        if(updateBooks.length === 0 || updateBooks == undefined || updateBooks == null)res.sendStatus(404);
        else{
            updateBooks[0].title = req.body.title;
            updateBooks[0].author = req.body.author;
            updateBooks[0].publicationYear = req.body.publicationYear;

            saveBook(data);
            res.status(200).send(updateBooks[0]);
        }
    })
    .delete((req, res) => {
        let data = getAllBooks();
        const deleteBookId = parseInt(req.params.id, 10);
        let deleteBookIndex = data.findIndex(item => item.bookID === deleteBookId);
        if(deleteBookIndex == undefined || deleteBookIndex == null){
            console.log("deleteBookIndex", deleteBookIndex);
            res.sendStatus(404);}
        else {
            data.splice(deleteBookIndex, 1);
        }
        saveBook(data);
        res.status(200).send(data);
    });

function getAllBooks(){
    const data = fs.readFileSync(fileData, "utf-8");
    return JSON.parse(data);
}

function getNextAvailableId(allBooks){
    let maxId = 0;
    allBooks.forEach(element => {
       if(element.bookID > maxId) maxId = element.bookID; 
    });
    return ++maxId;
}

function saveBook(allBooks){
    fs.writeFile(fileData, JSON.stringify(allBooks, null, 4), (err) => {
        if(err)console.log(err);
    });
}

module.exports = route;