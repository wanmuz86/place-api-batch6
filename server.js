var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var Place = require('./place');
var mongoose = require('mongoose');
mongoose.connect('mongodb://wanmuz:abcd1234@ds241530.mlab.com:41530/rest-api')
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;


var router = express.Router();

router.get('/', function(req,res){
	res.json({message:"hooray, Welcome to my API"});
});

router.route('/places').post(function(req,res){
var place = new Place();
place.name = req.body.name;
place.description = req.body.description;
place.country = req.body.country;

place.save(function(err){
	if (err) res.send(err);
	res.json("Place has been added");
})
})
.get(function(req,res){
	Place.find(function(err, places){
		if (err) res.send(err);
		res.json(places);
	})
})

router.route('/places/:place_id')
.get(function(req,res){
	Place.findById(req.params.place_id, function(err,place){
		if (err) 
			{
				res.send(err)
			}
			else {
				res.json(place);
			}
	
	})
})
.post(function(req,res){
	Place.findById(req.params.place_id, function(err, place){
		if(err){
			res.send(err)
		}
		else {
			place.name = req.params.name;
			place.description = req.params.description;
			place.country = req.params.country;

			place.save(function(err){
				if(err)
					res.send(err);
				res.json({message:'Place updated'});
			})
		}
	})
})
.delete(function(req,res){
	Place.findById(req.params.id, function(err,place){
		if(err){
			res.send(err);
		}
		else {
	res.json({message:"Succesfully deleted! "})
		}
	})
})

app.use('/api',router);
app.listen(port);

console.log("Magic happens in port "+port);