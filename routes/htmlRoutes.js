const path = require('path');

module.exports = function(app) {

    // HTML routes
    // get notes & return notes.html
    app.get('/notes', (req,res) => {
        res.json(path.join(__dirname, "../public/notes.html"));
    });

    // return index.html
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

}