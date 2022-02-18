// require dependencies
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');

// HTML routes
// get notes & return notes.html
router.get('/notes', (req,res) => {
    res.json(path.join(__dirname, './public/notes.html'));
});

// return index.html
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// API routes
// get notes read from db.json file and return saved notes as JSON
router.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// post -> receive new note and add to db.json
router.post('/api/notes', (req,res) => {
    fs.read(path.join(__dirname, "./db/db.json", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const newNote = req.body;
        newNote.id = uuid.v4();
        notes.push(newNote);

        const createNote = JSON.stringify(notes);
        fs.writeFile(path.join(__dirname, "./db/db.json", (err, data) => {
            if (err) throw err;
        }));
        res.json(newNote);
    }));
});

// delete notes 
router.delete('/api/notes:id', (req,res) => {
    const noteId = req.body.id;
    fs.readFile(path.join(__dirname, "./db/db.json", (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        const notesArray = notes.filter(item => {
            return item.id !== noteId
        });
        fs.writeFile('./db/db.json', JSON.stringify(notesArray), (err, data) => {
        console.log("deleted");
        if (err) throw err;
        res.json(notesArray);
        });
    }));
});

module.exports = router;