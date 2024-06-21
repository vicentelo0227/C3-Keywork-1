const express = require('express') // 取用express框架
const { engine } = require('express-handlebars') // 取用視圖引擎
const app = express() // function
const port = 3000 // localhost-server
const restaurants = require('./public/json/restaurant.json').results // 根據json格式取用results

app.engine('.hbs', engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.set('views', './views');
app.use(express.static('public'))


//always redirect to homepage (/restaurants)
app.get('/', (req, res) => {
  res.redirect('/restaurants')
})

//index listing all restaurants
//memo: HTML_<form>_action should always equals to route "/restaurants" for the outcome /restaurants?keyword=XXX
app.get('/restaurants', (req, res) => {
  const keyword = req.query.keyword?.replace(/\s+/g, '').trim()
  const matchedRestaurants = keyword
    ? restaurants.filter((restaurant) =>
      Object.entries(restaurant).some(([key, value]) => {
        if (typeof value === 'string' && key !== 'image' && key !== 'google_map') {
          return value.toLowerCase().replace(/\s+/g, '').includes(keyword.toString().toLowerCase())
        }
        return false
      })
    )
    : restaurants
  res.render('index', { cssFile: 'index.css', restaurants: matchedRestaurants, keyword })
})

//show target restaurant & details
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const targetRestaurant = restaurants.find((tR) => tR.id.toString() === id.toString())
  res.render('show', { cssFile: 'show.css', targetRestaurant })
})


app.listen(port, () => {
  console.log(`see http://localhost:${port}`)
})