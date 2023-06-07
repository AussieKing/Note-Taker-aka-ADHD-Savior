//! Step 1: create server.js

//setup the usual dependencies (express to start the npm packages and create an express server, PORT to listen on the local PORT, path and fs (nodemon) to write and read the db.json and serving the static files)
const htmlRoutes = require('./routes/html-routes');
const apiRoutes = require('./routes/api-routes');
const PORT = process.env.PORT || 3306;
const express = require('express');
const app = express();

const fs = require('fs');
const path = require('path'); // can use 'npm install -g nodemon' and 'nodemon server.js'

//setup the middleware via the built in function in Express
app.use(express.urlencoded({ extended: false })); // set to false to parse the data with the querystring library
app.use(express.json()); // adds middleware

app.use(express.static('public')); // to indicate the directory from which we we serve the static files

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

//setup the listener
app.listen(PORT, () => {
    console.log(`App now listening on PORT: ${PORT}`);
    });