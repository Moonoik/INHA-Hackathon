var querystring = require('querystring'),
	express = require('express'),
	router = express.Router(),
	define = require('./gameRecommendation').gameRecommendation,
	game = new define();

router.get('/', function(req, res) {
	game.parseGame(function(retData){
		res.render('index', {data: retData});
	});
});

module.exports = router;