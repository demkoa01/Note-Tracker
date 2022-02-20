// require dependencies for application
const { urlencoded } = require('express');
const express = require('express');
const app = express();

// require routes
const apiRoutes = require('./routes/routes');
const htmlRoutes = require('./routes/htmlRoutes');

// set other variables
const PORT = process.env.PORT || 3000;

// parse data
app.use(express, urlencoded({ extended:true }));
app.use(express.json());

// make files in public folder available
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// make server listen
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});
