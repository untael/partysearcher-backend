//mongoose for mongodb
const mongoose = require('mongoose')

//connect to db by URL
mongoose.connect('mongodb://localhost/psdb')
//to succesful start
  .then(() => console.log('MongoDB has started ...'))
//to errors
.catch(e => console.log(e))

//connect model to use Schema
require('./schemas/game.model')

const Game = mongoose.model('games')

const game = new Game ({
  name: 'Path of exile',
  description: 'RPG game'
})

game.save()
  .then(game => {
    console.log(game)
  })
  .catch(e => console.log(e))