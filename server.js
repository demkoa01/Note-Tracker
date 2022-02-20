// require dependencies for application
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const { urlencoded } = require('body-parser');


// require routes
const routes = require('./routes/routes');

// set other variables
const PORT = process.env.PORT || 3001;

// parse data
app.use(express, urlencoded({ extended:true }));
app.use(express.json());

// // require routes.js file
// app.use('/', routes);

// make files in public folder available
app.use(express.static('public'));

// require dependencies
// const router = require('express').Router();
// const fs = require('fs');
// const path = require('path');
// const uuid = require('uuid');


// HTML routes
// get notes & return notes.html
app.get('/notes', (req,res) => {
    res.json(path.join(__dirname, './public/notes.html'));
});

// return index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

// API routes
// get notes read from db.json file and return saved notes as JSON
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, "./db/db.json"), (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        res.json(notes);
    });
});

// post -> receive new note and add to db.json
app.post('/api/notes', (req,res) => {
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
app.delete('/api/notes:id', (req,res) => {
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

// module.exports = router;






// make server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
