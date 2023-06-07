//! Step 1: create server.js
//setup the usual dependencies (express to start the npm packages and create an express server, PORT to listen on the local PORT after deployed and DEV_PORT for developer, path and fs (nodemon) to write and read the db.json and serving the static files)
const DEV_PORT = 3001;
const PORT = process.env.PORT || DEV_PORT;
const express = require('express');
const app = express();
const fs = require('fs'); // can use 'npm install -g nodemon' and 'nodemon server.js'
const path = require('path'); // can use 'npm install -g nodemon' and 'nodemon server.js'
const uuid = require('uuid'); // to generate unique id for each note
const notes = require('./db/db.json'); // to read the db.json file
const dbPath = './db/db.json';
if (!fs.existsSync(dbPath)) {
    fs.writeFileSync(dbPath, '[]');
} // if the db.json file does not exist, create it with an empty array
try {
    JSON.parse(fs.readFileSync(dbPath));
} catch (err) {
    fs.writeFileSync(dbPath, '[]');
} // if not a JSON file, create an empty array

//! MIDDLEWARE (to parse incoming request bodies in a middleware before your handlers, available under the req.body property)
app.use(express.urlencoded({ extended: true })); //setup the middleware via the built in function in Express
app.use(express.json()); // adds middleware to parse JSON
app.use(express.static('public')); // to use the directory from which we we serve the static files

//! GET request 
// (using req and res to send and receive data and the async/await keyword to wait for the response without stopping the execution of the code)
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
app.get('/api/notes', (req, res) => {
    res.json(notes);
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
}); // If no matching route is found default to home

//! POST request 
// (using req and res to send and receive data)
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = uuid.v4();
    notes.push(newNote);
    res.json(newNote);

    fs.writeFileSync(dbPath, JSON.stringify(notes)); // adding the new note to the data array
    console.log('New note added to the database 📝');
});

//! DELETE request - ** optional **
// This was a bonus for the assignment: "DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file"
app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id; // getting the notes with relative id from the request parameters
    const notesNew = notes.filter((note) => note.id !== id); // filtering the notes array to get the notes with id different from the one we want to delete

    fs.writeFileSync(dbPath, JSON.stringify(notesNew), (err) => {
        err ? console.error(err) : console.log('Note deleted from the database 🗑️');
    });
    res.json(notesNew);
});

//! LISTENER 
// to listen to the user requests on local PORT
app.listen(PORT, () => {
console.log(`App now listening on PORT: ${PORT}`)
});