// import files and packages up here
const express = require('express');
const topSpots = require('./data.json');
const app = express();
const morgan = require('morgan');
app.use(morgan('dev'));
const path = require('path');



// add your routes and middleware below
app.get('/', (req, res) => {
    res.status(200).sendFile(path.join(__dirname, 'index.html'));
});

app.get('/data', (req, res) => {
    res.status(200).json(topSpots);
});

app.get('/style.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'style.css'));
});

app.get('/main.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'main.js'));
});

// finally export the express application
module.exports = app;
