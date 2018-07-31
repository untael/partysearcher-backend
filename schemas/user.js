const mongoose = require('mongoose')
const Schema = mongoose.Schema

module.exports = mongoose.model('User', new Schema({
  id: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    default: '',
  },
  sex: {
    type: Boolean,
    default: false,
  },
  voice: {
    type: Boolean,
    default: false,
  },
}))