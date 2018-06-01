const mongoose = require('mongoose')
const Schema = mongoose.Schema

const GameRoomSchema = new Schema({
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

mongoose.model('gameRooms', GameRoomSchema)
