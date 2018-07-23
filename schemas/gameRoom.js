const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameRoomSchema = new Schema({
  id: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  game: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
    required: true,
  },
})

const GameRoom = mongoose.model('gameRoom', GameRoomSchema)
module.exports = GameRoom;