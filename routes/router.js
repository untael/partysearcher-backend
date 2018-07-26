const express = require('express')
const router = express.Router()
const User = require('../schemas/user')
const Game = require('../schemas/game')
const GameRoom = require('../schemas/gameRoom')


//USER ACTIONS
// GET route for reading data
router.get('/', function (req, res, next) {
  console.log(req.session.userId)
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error)
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!')
          err.status = 400
          return next(err)
        } else {

        }
      }
    })

})

//Save registered user to database
router.post('/register', function (req, res) {
  const user = new User({
    username: req.body.user.username,
    password: req.body.user.password,
  })
  user.save(function (err) {
    if (err) return handleError(err)
  })
  res.send(user)
})

router.get('/check-user', function (req, res, next) {
  console.log(req.session.userId)
  User.findById(req.session.userId)
    .exec(function (error, user) {
      if (error) {
        return next(error)
      } else {
        if (user === null) {
          var err = new Error('Not authorized! Go back!')
          err.status = 400
          return next(err)
        } else {
          console.log(user)
          res.send(user)
        }
      }
    })
})


router.post('/login', function (req, res, next) {
  User.authenticate(req.body.user.username, req.body.user.password, function (error, user) {
    if (error || !user) {
      var err = new Error('Wrong username or password.')
      err.status = 401
      return next(err)
    } else {
      console.log(req.session)
      req.session.userId = user._id
      res.redirect('/check-user')
    }
  })
})

// GET route after registering
// router.get('/profile', function (req, res, next) {
//   User.findById(req.session.userId)
//     .exec(function (error, user) {
//       if (error) {
//         return next(error)
//       } else {
//         if (user === null) {
//           var err = new Error('Not authorized! Go back!')
//           err.status = 400
//           return next(err)
//         } else {
//           console.log(req.session)
//         }
//       }
//     })
// })

// GET for logout logout
router.get('/logout', function (req, res, next) {
  // console.log(req.session)
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err)
      } else {
        res.send('Session destroyed')
        // return res.redirect('/')
      }
    })
  }
})

//GAMEROOM ACTIONS
router.post('/create-gameroom', function (req, res) {
  const gameRoom = new GameRoom({
    username: req.body.gameRoom.username,
    game: req.body.gameRoom.game,
    description: req.body.gameRoom.description,
  })
  gameRoom.save(function (err) {
    if (err) return handleError(err)
  })
  res.send(gameRoom)
})

router.get('/gameroomlist', function (req, res) {
  GameRoom.find({}).then(gameRooms => {
    // Presenter
    const gameRoomsToPresent = gameRooms.map(gameRoom => {
      return {
        id: gameRoom._id,
        username: gameRoom.username,
        game: gameRoom.game,
        description: gameRoom.description,
      }
    })
    res.send(gameRoomsToPresent)
    // console.log(gameRooms)
  })
})

router.get('/gameroomexplorer', function (req, res) {
  GameRoom.find({}).then(gameRooms => {
    // Presenter
    const gameRoomsToPresent = gameRooms.map(gameRoom => {
      return {
        id: gameRoom._id,
        username: gameRoom.username,
        game: gameRoom.game,
        description: gameRoom.description,
      }
    })
    res.send(gameRoomsToPresent)
    // console.log(gameRooms)
  })
})

//GAME ACTIONS
router.get('/gamelist', function (req, res) {
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

router.post('/create-game', function (req, res) {
  const game = new Game({
    name: req.body.game.name,
    description: req.body.game.description,
  })
  game.save(function (err) {
    if (err) return handleError(err)
  })
  res.send(game)
})

router.post('/delete-game', function (req, res) {
  const game = new Game({
    id: req.body.game.id,
    name: req.body.game.name,
    description: req.body.game.description,
  })
  Game.find({
    _id: game.id,
  })
    .remove().then(_ => console.log('Removed'))
  res.send(game)
})

router.post('/update-game', function (req, res) {
  const game = new Game({
    id: req.body.game.id,
    name: req.body.game.name,
    description: req.body.game.description,
  })
  Game.findByIdAndUpdate(game.id, {
    $set: {
      name: req.body.game.name,
      description: req.body.game.description,
    },
  }, { new: true }, function (err, game) {
    if (err) return handleError(err)
    res.send(game)
  })
})

module.exports = router