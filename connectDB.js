const connect = connectDB() {
  const mongoose = require('mongoose')
//connect to db by URL
  mongoose.connect('mongodb://localhost/psdb')
  //to succesful start
    .then(() => console.log('MongoDB has started ...'))
    //to errors
    .catch(e => console.log(e))
}
module.exports.connect = connect;
