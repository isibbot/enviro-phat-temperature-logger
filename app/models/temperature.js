
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var TemperatureSchema   = new Schema({
    created: Date,
    reading: Number
});

module.exports = mongoose.model('Temperature', TemperatureSchema);