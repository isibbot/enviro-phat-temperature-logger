// index.js
const path = require('path')  
const express = require('express')  
const exphbs = require('express-handlebars')

const app = express()

// Add handlebars 
app.engine('.hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'views/layouts')
}))
app.set('view engine', '.hbs')  

app.set('views', path.join(__dirname, 'views'))  

// Route and test data
app.get('/', (request, response) => {  
  response.render('home', {
    name: 'John'
  })
})

// Port listen
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
