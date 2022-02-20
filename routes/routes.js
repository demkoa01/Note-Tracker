// require dependencies
// const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const notesData = require('../db/db.json');
// const uuid = require('uuid');

module.exports = function(app) {
// API routes

    function writeNotes(notes) {
        // convert new JSON arrary to string
        notes = JSON.stringify(notes)
        console.log(notes);
        // write back to db.json
        fs.writeFile('./db/db.json', notes, function(err){
            if (err) throw err;
        });
    }

    // get notes read from db.json file and return saved notes as JSON
    app.get('/api/notes', (req, res) => {
        res.json(notesData);
        // fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
        //     if (err) throw err;
        //     const notes = JSON.parse(data);
        //     res.json(notes);
        // });
    });

    // post -> receive new note and add to db.json
    app.post('/api/notes', (req,res) => {
        // Set unique id to entry
        if (notesData.length == 0){
            req.body.id = "0";
        } else{
            req.body.id = JSON.stringify(JSON.parse(notesData[notesData.length - 1].id) + 1);
        }
        
        console.log("req.body.id: " + req.body.id);

        // Pushes Body to JSON Array
        notesData.push(req.body);

        // Write notes data to database
        writeToDB(notesData);
        console.log(notesData);

        // returns new note in JSON format.
        res.json(req.body);

        // fs.read(path.join(__dirname, "./db/db.json", (err, data) => {
        //     if (err) throw err;
        //     const notes = JSON.parse(data);
        //     const newNote = req.body;
        //     newNote.id = uuid.v4();
        //     notes.push(newNote);

        //     const createNote = JSON.stringify(notes);
        //     fs.writeFile(path.join(__dirname, "./db/db.json", (err, data) => {
        //         if (err) throw err;
        //     }));
        //     res.json(newNote);
        // }));
    });

    // delete notes 
    app.delete('/api/notes:id', (req,res) => {
        // Obtains id and converts to a string
        let id = req.params.id.toString();
        console.log(id);

        // Goes through notesArray searching for matching ID
        for (i=0; i < notesData.length; i++){
           
            if (notesData[i].id == id){
                console.log("match!");
                // responds with deleted note
                res.send(notesData[i]);

                // Removes the deleted note
                notesData.splice(i,1);
                break;
            }
        }
        writeToDB(notesData);
        // const noteId = req.body.id;
        // fs.readFile(path.join(__dirname, "./db/db.json", (err, data) => {
        //     if (err) throw err;
        //     const notes = JSON.parse(data);
        //     const notesArray = notes.filter(item => {
        //         return item.id !== noteId
        //     });
        //     fs.writeFile('./db/db.json', JSON.stringify(notesArray), (err, data) => {
        //     console.log("deleted");
        //     if (err) throw err;
        //     res.json(notesArray);
        //     });
        // }));
    });

}
