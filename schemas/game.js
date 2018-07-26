const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameSchema = new Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
})

const Game = mongoose.model('game', GameSchema)
module.exports = Game;