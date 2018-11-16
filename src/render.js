var express = require('express');
//var app = express.createServer();
var app = express();
const swarmgw = require('swarmgw')(/* opts */)

app.use(express.static(__dirname + '/src'));

app.get('/', function(req, res) {

swarmgw.get('bzz-raw://441235131a5120fae1f4bdeee414ed2a87989c011a645e0950df65da1079b3bb', function (err, ret) {
  if (err) {
    abort('Failed to download: ' + err)
  } else {
    //console.log(ret)
    console.log("succssful retrival");
    res.send(ret);
  }
})
});

app.listen(8080, '127.0.0.1')