// require dependencies for application
const express = require('express');
const app = express();
const fs = require('fs)');
const path = require('path');

// require routes
const routes = require('./routes/routes');

// set other variables
const PORT = process.env.PORT || 3001;

// parse data
app.use(express, urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static('public'));

// require routes.js file
app.use('/', routes);

// make server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
