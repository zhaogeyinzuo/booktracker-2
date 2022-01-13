const express = require("express");
const route = express.Router();
const fs = require("fs");
const dataFile = "server/data/readers.json";


route.route("/")
    .get((req, res) => {
        try {
            const data = getAllReaders();
            res.status(200).send(data);            
        } catch (error) {
            console.error(error);
            res.sendStatus(404);
        }
    })

    .post((req, res) => {
        try {
            let readers = getAllReaders();
            const readerID = getNextAvailableId(readers);
            const reader = {
                readerID: readerID,
                name: req.body.name,
                weeklyReadingGoal: parseInt(req.body.weeklyReadingGoal, 10),
                totalMinutesRead: parseInt(req.body.totalMinutesRead, 10)
            }
            readers.push(reader);
            saveData(readers);
            res.status(200).send(reader);   
        } catch (error) {
            console.error(error);
            res.sendStatus(404);
        }
    })

route.route("/:id")
    .get((req, res) => {
        const readers = getAllReaders();
        const theId = parseInt(req.params.id, 10);
        const results = readers.filter(item => item.readerID === theId);
        console.log("results", results);
        if(results.length === 0 || results == undefined || results == null)res.sendStatus(404);
        else res.status(200).send(results[0]);
    })
    .put((req, res) => {
        const readers = getAllReaders();
        const theReader = {
            readerID: parseInt(req.params.id, 10),
            name: req.body.name,
            weeklyReadingGoal: parseInt(req.body.weeklyReadingGoal, 10),
            totalMinutesRead: parseInt(req.body.totalMinutesRead, 10)
        }
        const index = readers.findIndex(item => item.readerID === theReader.readerID);
        readers.splice(index, 1, theReader);
        saveData(readers);
        res.status(200).send(theReader);
    })
    .delete((req, res) => {
        let readers = getAllReaders();
        const theId = parseInt(req.params.id, 10);
        const index = readers.findIndex(item => item.readerID === theId);
        readers.splice(index, 1);
        saveData(readers);
        console.log("readers", readers);
        res.status(200).send(readers);
    })

function getAllReaders(){
    try {
        const allReaders = fs.readFileSync(dataFile, "utf-8");
        return JSON.parse(allReaders); 
    } catch (error) {
        throw error;
    }
}

function saveData(data){
    fs.writeFile(dataFile, JSON.stringify(data, null, 4), (error) => {
        if(error)console.log(error);
    })
}

function getNextAvailableId(data){
    let maxId = 0;
    data.forEach(item => {
        if(item.readerID > maxId)maxId = item.readerID;
    });

    return ++maxId;
}

module.exports = route;