// =======================
// get the packages we need ============
// =======================
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

// =======================
// configuration =========
// =======================

// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// use morgan to log requests to the console
app.use(morgan('dev'))

// =======================
// routes ================
// =======================

// basic route
app.get('/', (req, res) => res.send('Hello World!'))

// display contact
app.get('/display', function (req, res) {
  const contact = {
    name: 'Petrov',
    surname: 'Sergei',
    middlename: 'Ivanovich',
    birthday: 'Sep 26 2018',
    gender: 'Male',
    family: 'Single',
    country: 'Belarus',
    city: 'Minsk',
    zip: '110000',
    address: 'Valenova 37-4/1',
    email: 'testmail@mail.com',
    website: 'testsite',
    job: 'Programmer',
    about: 'Programming 99 years',
  }
  console.log(contact)
  res.send(contact)
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
