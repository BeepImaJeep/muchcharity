var express = require("express");
var app = express();
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));


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
		res.send(result);
	});

});

var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Listening on " + port);
});