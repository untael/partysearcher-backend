//-----------todo To Module
const mongoose = require('mongoose')
//connect to db by URL
mongoose.connect('mongodb://localhost/psdb')
//to succesful start
  .then(() => console.log('MongoDB has started ...'))
  //to errors
  .catch(e => console.log(e))
//-----------------

let express = require('express')
let cors = require('cors')
let app = express()
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//connect model to use Schema
require('../../schemas/game.model')
const Game = mongoose.model('games')
require('../../schemas/gameRoom.model')
const GameRoom = mongoose.model('gameRooms')

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

app.post('/create-game', function (req, res) {
  const game = new Game({
    name: req.body.game.name,
    description: req.body.game.description,
  })
  game.save(function (err) {
    if (err) return handleError(err)
  })
  res.send(game)
})

app.post('/delete-game', function (req, res) {
  const game = new Game({
    id: req.body.game.id,
    name: req.body.game.name,
    description: req.body.game.description,
  })
  Game.find({
    _id: game.id,
  })
    .remove().then(_ => console.log('Removed'))
  res.send(game)
})

app.post('/update-game', function (req, res) {
  const game = new Game({
    id: req.body.game.id,
    name: req.body.game.name,
    description: req.body.game.description,
  })
  Game.findByIdAndUpdate(game.id, {
    $set: {
      name: req.body.game.name,
      description: req.body.game.description,
    },
  }, { new: true }, function (err, game) {
    if (err) return handleError(err)
    res.send(game)
  })
})

app.post('/create-gameroom', function (req, res) {
  const gameRoom = new GameRoom({
    username: req.body.gameRoom.username,
    game: req.body.gameRoom.game,
    description: req.body.gameRoom.description,
  })
  gameRoom.save(function (err) {
    if (err) return handleError(err)
  })
  res.send(gameRoom)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})