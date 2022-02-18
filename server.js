// require dependencies for application
const express = require('express');
const app = express();
const fs = require('fs)');
const path = require('path');

// set other variables
const PORT = 3001;

// parse data
app.use(express, urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static(__dirname));

// require routes.js file
require('./routes/routes')(app);

// make server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
