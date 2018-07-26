const mongoose = require('mongoose')
// const bcrypt = require('bcrypt');
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
//
//
// UserSchema.statics.authenticate = function (username, password, callback) {
//   // console.log(username, ' ', password)
//   User.findOne({ username: username })
//     .exec(function (err, user) {
//       if (err) {
//         return callback(err)
//       } else if (!user) {
//         var err = new Error('User not found.');
//         err.status = 401;
//         return callback(err);
//       }
//       bcrypt.compare(password, user.password, function (err, result) {
//         if (result === true) {
//           return callback(null, user);
//         } else {
//           return callback();
//         }
//       })
//     });
// }
//
// UserSchema.pre('save', function (next) {
//   var user = this;
//   bcrypt.hash(user.password, 10, function (err, hash){
//     if (err) {
//       return next(err);
//     }
//     user.password = hash;
//     next();
//   })
// });
//
// const User = mongoose.model('users', UserSchema)
// module.exports = User;
