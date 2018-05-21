//-----------todo To Module
const mongoose = require('mongoose')
//connect to db by URL
mongoose.connect('mongodb://localhost/psdb')
//to succesful start
  .then(() => console.log('MongoDB has started ...'))
  //to errors
  .catch(e => console.log(e))
//-----------------
var express = require('express');
var cors = require('cors')
var app = express();
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

require('./schemas/game.model')
const Game = mongoose.model('games')

app.get('/gamelist', function (req, res) {
  Game.find({}).then(games => {
    // Presenter
    const gamesToPresent = games.map(game => {
      return {
        id: game._id,
        name: game.name,
        description: game.description
      }
    })
    res.send(gamesToPresent)
    console.log(games)
  })
});

app.listen(3002, function () {
  console.log('Example app listening on port 3002!');
});