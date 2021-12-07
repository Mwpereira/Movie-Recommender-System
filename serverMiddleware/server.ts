import express from 'express'

const rounds: number = 12

const bcrypt = require('bcrypt')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// ===================================================================================================================
/**
 * Will use localstorage as our mock database to store user data
 */
// ===================================================================================================================

app.post('/register', async (req, res) => {
  try {
    if (req.body.username < 3) {
      return res.status(400).json({
        error: 'Username must be greater than 3 characters',
      })
    }
    if (req.body.password > 32) {
      return res.status(400).json({
        error: 'Username must be less than 32 characters',
      })
    }
    if (req.body.password < 3) {
      return res.status(400).json({
        error: 'Password must be between greater than 3 characters',
      })
    }
    if (req.body.password > 32) {
      return res.status(400).json({
        error: 'Password must be between less than 64 characters',
      })
    }

    const db: any = {}

    let accounts = {}

    if (req.body.db !== null) {
      accounts = req.body.db.accounts

      if (accounts[`${req.body.username}`]) {
        return res.status(400).json({
          error: 'User Already Exists',
        })
      }
    }

    accounts[`${req.body.username}`] = {
      username: req.body.username,
      password: '',
      ratings: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    }

    await bcrypt.hash(req.body.password, rounds).then((hash) => {
      accounts[`${req.body.username}`].password = hash
      db.accounts = accounts

      return res.status(201).json({
        msg: 'User Created',
        db,
      })
    })
  } catch (error) {
    return res.status(500).json({
      error: 'Server Error',
    })
  }
})

app.post('/login', async (req, res) => {
  try {
    if (
      req.body.db === null ||
      req.body.username < 3 ||
      req.body.username > 32 ||
      req.body.password < 3 ||
      req.body.password > 64
    ) {
      return res.status(400).json({
        error: 'Invalid Credentials',
      })
    }

    await bcrypt
      .compare(
        req.body.password,
        req.body.db.accounts[req.body.username].password
      )
      .then((result) => {
        if (result) {
          return res.status(200).json({
            msg: 'User Authorized',
          })
        } else {
          return res.status(400).json({
            error: 'Invalid Credentials',
          })
        }
      })
  } catch {
    return res.status(500).json({
      error: 'Server Error',
    })
  }
})

//
// app.post('/rate', (req, res) => {
//
// })

module.exports = app
