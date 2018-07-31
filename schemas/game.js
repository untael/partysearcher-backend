const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('Game', new Schema({
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
}))