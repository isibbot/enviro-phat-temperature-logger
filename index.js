// index.js
const path = require('path')  
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const app = express();

// ------------------------ //
// Public middelware, css, js etc
// ------------------------ //
app.use(express.static(__dirname + '/app/public'));

// ------------------------ //
// Mongoose, mongo
// ------------------------ //

// Create a database
mongoose.connect('mongodb://localhost:27017/envirotemperature');

var Temperature = require('./app/models/temperature');

// Two test entries to... test with...
// Temperature.create({ created: new Date(), reading: 66.666}, function (err, temp){
//   if(err) return handleError(err);
//   //saved
//   console.log(temp.reading + ' has been saved.');
// })
// var dt = new Date();
// dt.setDate(dt.getDate() + 1);

// Temperature.create({ created: dt, reading: 99.65}, function (err, temp){
//   if(err) return handleError(err);
//   //saved
//   console.log(temp.reading + ' has been saved.');
// })

// ------------------------ //
// RESTful API
// ------------------------ //

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;  


// Add handlebars 
app.engine('.hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'app/views/layouts')
}))
app.set('view engine', '.hbs');  

app.set('views', path.join(__dirname, 'app/views'))  

// ------------------------ //
// Routing
// ------------------------ //

var router = express.Router(); 

app.get('/', (request, response) => {  
 response.render('home', {
   name: 'John'
 });
})

// Return all readings in json format
app.get('/api/temperatures', function(req, res) {
    Temperature.find(function(err, temps) {
        if (err)
            res.send(err);

        res.json(temps);
    });  
});

// Port listen
app.listen(3000, function () {
  console.log('Listening on port 3000!');
})
