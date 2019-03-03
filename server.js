var express = require('express'),
  app = express(),
  port = 3002;

var path = require('path');

app.listen(port);

app.use( function(req, res, next){
  res.header( "Access-Control-Allow-Origin", "*" );
  res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});


app.listen(3000, function () {
  console.log('polython 2019 app listening on port ' + port);
});
