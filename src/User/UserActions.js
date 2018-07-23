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
let router = express.Router();
let cors = require('cors')
let app = express()
let session = require('express-session')
app.use(cors())

const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
//use sessions for tracking logins
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}));

//connect model to use Schema
require('../../schemas/user')
const User = mongoose.model('users')

app.post('/create-user', function (req, res) {
  const user = new User({
    username: req.body.user.username,
    password: req.body.user.password,
  })
  user.save(function (err) {
    if (err) return handleError(err)
  })
  res.send(user)
})

app.get('/userlist', function (req, res) {
  User.find({}).then(users => {
    // Presenter
    const usersToPresent = users.map(user => {
      return {
        id: user._id,
        username: user.username,
        password: user.password,
      }
    })
    res.send(usersToPresent)
    // console.log(users)
  })
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!')
})