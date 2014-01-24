var express = require("express");
var app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));


var http = require('http');

var dogecoin = require('node-dogecoin')()


var test = dogecoin.getbalance('DLVhazsZNfZX3qAJ9wRfcKSqCwFnuQFCDt', function(err, result){
	console.log(err, result);
});

console.log(test);

app.get('/', function(req, res) {
	res.render('../index.html');
});

app.get('/test', function(req, res){
	dogecoin.getbalance('DLVhazsZNfZX3qAJ9wRfcKSqCwFnuQFCDt', function(err, result){
		res.send({ success : result, error : err});
	});

});

app.get('/test2', function(req,res){


	var options = {
	  host: 'http://dogechain.info',
	  path: '/chain/Dogecoin/q/addressbalance/DLVhazsZNfZX3qAJ9wRfcKSqCwFnuQFCDt'
	};

	http.get("http://dogechain.info/chain/Dogecoin/q/addressbalance/DLVhazsZNfZX3qAJ9wRfcKSqCwFnuQFCDt", function(resp){
	  resp.on('data', function(chunk){
	    res.send(chunk);
	  });
	}).on("error", function(e){
	  res.send("Got error: " + e.message);
	});



})

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});