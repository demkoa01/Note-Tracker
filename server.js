// require dependencies for application
const { urlencoded } = require('express');
const express = require('express');
const app = express();
// const fs = require('fs');
const path = require('path');
// const uuid = require('uuid');
// const database = require("./db/db.json");

// set other variables
const PORT = process.env.PORT || 3000;

// parse data
app.use(express, urlencoded({ extended:true }));
app.use(express.json());

// require routes.js file
// app.use('/', routes);

// require routes
require('./routes/routes')(app);
require('./routes/htmlRoutes')(app);

// make files in public folder available
app.use(express.static('public'));

// make server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
