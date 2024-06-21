const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const port = 3000
const restaurant = require('./public/json/restaurant.json').results


app.use(express.static('public'))


app.get('/', (req, res) => {
  res.send(`successful created！`)
})


app.listen(port, () => {
  console.log(`see http://localhost:${port}`)
})