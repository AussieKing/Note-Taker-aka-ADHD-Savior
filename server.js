//! Step 1: create server.js
//setup the usual dependencies (express to start the npm packages and create an express server, PORT to listen on the local PORT after deployed and DEV_PORT for developer, path and fs (nodemon) to write and read the db.json and serving the static files)
const DEV_PORT = 3001;
const PORT = process.env.PORT || DEV_PORT;
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const uuid = require('uuid');
const dbPath = './db/db.json';

// Create the db.json file if it doesn't exist
if (!fs.existsSync(dbPath)) {
  fs.writeFileSync(dbPath, '[]');
}

//! MIDDLEWARE (to parse incoming request bodies in a middleware before your handlers, available under the req.body property)app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Read the notes from db.json
function readNotes() {
  const notesData = fs.readFileSync(dbPath, 'utf-8');
  return JSON.parse(notesData);
}

// Write the notes to db.json
function writeNotes(notes) {
  fs.writeFileSync(dbPath, JSON.stringify(notes));
}

//! GET request routes
// (using req and res to send and receive data)
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => {
  const notes = readNotes();
  res.json(notes);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

//! POST request route
// (using req and res to send and receive data)

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.id = uuid.v4();
  const notes = readNotes();
  notes.push(newNote);
  writeNotes(notes);
  console.log('New note added to the database 📝');
  res.json(newNote);
});

//! DELETE request route ** OPTIONAL**
// This was a bonus for the assignment: "DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file"

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  let notes = readNotes();
  const notesNew = notes.filter((note) => note.id !== id);
  writeNotes(notesNew);
  console.log('Note deleted from the database 🗑️');
  res.json(notesNew);
});

//! LISTENER 
// to listen to the user requests on local PORT
app.listen(PORT, () => {
  console.log(`App now listening on PORT: ${PORT}`);
});
