// index.js
const path = require('path')  
const express = require('express')  
const exphbs = require('express-handlebars')
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const app = express();

// ------------------------ //
// Public middelware, css, js etc
// ------------------------ //
app.use(express.static(__dirname + '/public'));

// ------------------------ //
// Mongoose, mongo
// ------------------------ //

// Create a database
mongoose.connect('mongodb://localhost:27017/enviro=temperature');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!

console.log('Connected to db');

// create a temperature schema
var temperatureSchema = new Schema({value: 'string'});

var tp = mongoose.model('temperature', temperatureSchema);

tp.create({ value: 'TOM'}, function (err, tom){
	if(err) return handleError(err);
	//saved
console.log(tom.value + ' has been sames');
})

});

// Add handlebars 
app.engine('.hbs', exphbs({  
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, 'app/views/layouts')
}))
app.set('view engine', '.hbs');  

app.set('views', path.join(__dirname, 'app/views'))  

// Route
app.get('/', (request, response) => {  

  // find all temperatures
//  Temp.find({}, function(err, temp) {
//  if (err) throw err;
//    console.log(temp);
//  })
 response.render('home', {
   name: 'John'
 })
})

// Port listen
app.listen(3000, function () {
  console.log('Listening on port 3000!');
})
