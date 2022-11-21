const notes = require('express').Router();
const uuidv1 = require("uuidv1");
const fs = require("fs");
const path = require("path");
const db = require("../db/db.json");
const { readFromFile, readAndAppend } = require('../helpers/fsUtils');

// GET Route for retrieving all the feedback
notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// POST Route for submitting feedback
notes.post('/', (req, res) => {
  // Destructuring assignment for the items in req.body
  const { title, text } = req.body;

  // If all the required properties are present
  if (title && text) {
    // Variable for the object we will save
    const newNote = {
      id: uuidv1(),
      title,
      text,
    };

    readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});


notes.delete("/:id", (req, res) => {
  const id = req.params.id;
  const savedNotes = db;
  // const newNotes = savedNotes.filter(note => note.id !==id)
  for (let index = 0; index < savedNotes.length; index++) {
      if (savedNotes[index].id === id) {
          savedNotes.splice(index, 1)
      }
      
      console.log('deleted')
  }
  fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(savedNotes))
  res.json(savedNotes)
})



module.exports = notes;
