const express = require('express');

// Import our modular routers for /tips and /feedback
const homeRouter = require('./home');
const notesRouter = require('./notes');

const app = express();

app.use('/home', homeRouter);
app.use('/noes', notesRouter);

module.exports = app;
