// =======================
// get the packages we need ============
// =======================
let express = require('express')
let app = express()
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let morgan = require('morgan')
let config = require('./config')
let cors = require('cors')
let jwt = require('jsonwebtoken')
let User = require('../schemas/user')
let Game = require('../schemas/game')

// =======================
// configuration =========
// =======================
let port = process.env.PORT || 3000 // used to create, sign, and verify tokens
mongoose.connect(config.database) // connect to database
app.set('superSecret', config.secret) // secret variable

app.use(cors())

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// use morgan to log requests to the console
app.use(morgan('dev'))

// =======================
// routes ================
// =======================

// basic route
app.get('/', function (req, res) {
  res.send('Hello! The API is at http://localhost:' + port + '/api')
})


// API ROUTES -------------------

// get an instance of the router for api routes
let apiRoutes = express.Router()
// route to show a random message (GET http://localhost:3000/api/)
apiRoutes.get('/', function (req, res) {
  res.json({ message: 'Server now is working' })
})


//USER ROUTES

// route to return all users (GET http://localhost:3000/api/users)
apiRoutes.get('/users', function (req, res) {
  User.find({}, function (err, users) {
    res.json(users)
  })
})

//User signup
app.post('/signup', function (req, res) {
  const user = new User({
    username: req.body.user.username,
    password: req.body.user.password,
  })
  user.save(function (err) {
    if (err) throw err
    console.log('User saved successfully')
    res.json({ success: true })
  })
})

//User login
apiRoutes.post('/login', function (req, res) {
  // console.log(req.body.user.password)
  // find the user
  User.findOne({
    username: req.body.user.username,
  }, function (err, user) {

    if (err) throw err

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.',
      })
    } else if (user) {

      // check if password matches
      if (user.password != req.body.user.password) {
        res.json({
          success: false,
          message: 'Authentication failed. Wrong password.',
        })
      } else {
        // console.log(user.username)
        // if user is found and password is right
        // create a token with only our given payload
        // we don't want to pass in the entire user since that has the password
        const payload = {
          admin: user.admin,
        }
        let token = jwt.sign(payload, app.get('superSecret'), {})
        // return the information including token as JSON
        res.json({
          username: user.username,
          id: user._id,
          success: true,
          message: 'Login successful!',
          token: token,
        })
      }
    }
  })
})

// route middleware to verify a token
apiRoutes.use(function (req, res, next) {
  // check header or url parameters or post parameters for token
  let token = req.body.token || req.query.token || req.headers['x-access-token']
  // console.log(token)
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), function (err, decoded) {
      if (err) {
        return res.json({
          success: false,
          message: 'Failed to authenticate token.',
        })
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded
        next()
      }
    })
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.',
    })
  }
})

//User profile data
apiRoutes.post('/profile-data', function (req, res) {
  User.findOne({
    _id: req.body.userId,
  }, function (err, user) {

    if (err) throw err

    if (!user) {
      res.json({
        success: false,
        message: 'Authentication failed. User not found.',
      })
    } else if (user) {
      // console.log(user)
      res.json({
        username: user.username,
        age: user.age,
        sex: user.sex,
        voice: user.voice,
      })
    }
  })
})


//GAME ACTIONS

//Get game list
apiRoutes.post('/gamelist', function (req, res) {
  Game.find({}).then(games => {
    // Presenter
    const gamesToPresent = games.map(game => {
      return {
        id: game._id,
        name: game.name,
        description: game.description,
      }
    })
    res.send(gamesToPresent)
    // console.log(games)
  })
})



// apply the routes to our application with the prefix /api
app.use('/api', apiRoutes)
// =======================
// start the server ======
// =======================
app.listen(port)
console.log('Magic happens at http://localhost:' + port)
