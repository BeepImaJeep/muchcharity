var express = require("express");
var app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));


var http = require('http');

app.get('/', function(req, res) {
	//res.render('muchcharity.html');
	res.redirect('/dogefordogs');
});

app.get('/dogefordogs', function(req, res){
	res.render('dogefordogs.html');
});

app.get('/getbalance/:addr', function(req,res){
	http.get("http://dogechain.info/chain/Dogecoin/q/addressbalance/"+req.params.addr, function(resp){
		resp.on('data', function(chunk){
			res.send(200, chunk);
		});
	}).on("error", function(e){
		res.send(500, e.message);
	});
})

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});