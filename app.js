const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

mongoose.connect('mongodb://localhost:27017/todo-db')

const app = express();

const apiRouter = require('./router/router.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/static', express.static('static'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/static/index.html");
})

// put routes here

app.use('/api/todos/', apiRouter);

app.listen(3000, function () {
    console.log('Express running on http://localhost:3000/.')
});
