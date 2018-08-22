const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('GameRoom', new Schema({
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
  users: {
    type: Array,
    required: false,
  },
}))
