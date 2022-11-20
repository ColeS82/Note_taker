const notes = require('express').Router();
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving all the feedback
notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
notes.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { note, noteTitle } = req.body;

  // If all the required properties are present
  if (note && noteTitle) {
    // Variable for the object we will save
    const newNote = {
      note,
      noteTitle,
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting feedback');
  }
});

module.exports = notes;
