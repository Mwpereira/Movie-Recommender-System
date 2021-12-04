import express from 'express'

const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.post('/invert', (req, res) => {

})

app.post('/search', (req, res) => {

})


module.exports = app
