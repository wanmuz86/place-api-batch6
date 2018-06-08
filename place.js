var mongoose = require('mongoose');
var Schema = mongoose.Schema

var PlaceSchema = new Schema({
	name: String,
	description: String,
	country: String,
	categories: [],
	createdAt: {type :Date, default:Date.now }
})

module.exports = mongoose.model('Place',PlaceSchema);