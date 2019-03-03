var express = require('express'),
  app = express(),
  port = 3002;

var path = require('path');
const dialogflow = require('./prueba');

app.listen(port);

app.use( function(req, res, next){
  res.header( "Access-Control-Allow-Origin", "*" );
  res.header( "Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept" );
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  next();
});
var requestjson = require( "request-json" );

let ticker = "https://api.bitso.com/v3/ticker/?book=btc_mxn";
let requestTicker = requestjson.createClient( ticker );

app.get('/v1/ticker', (req, res, next) => {
  console.log("\n" + new Date() + " -- obteniendo tickers ");
  requestTicker.get('', (err, resM, body) => {
    if(err){
      console.error(err);
      res.status(500).send("Hubo algun problema con la conexión");
    }else {
      var hour = body.payload.created_at.substring(11, 16);
      var arrayDataResonse = [hour, parseInt(body.payload.low), parseInt(body.payload.bid), parseInt(body.payload.ask),parseInt( body.payload.high)];
      console.log(arrayDataResonse);
      res.send(arrayDataResonse);
    }
  });
});

 // -********************* dialogflow  *******************-

 app.get('/v1/dialog', (req, res, next) => {
   console.log("Vemos valor post ", req.query.question);
   const promise = dialogflow.runSample("bitbot-polython", req.query.question);
   promise.then( data => {
     console.log(data);
     res.send(data);
   }).catch(error => {
     console.log("error ", error)
   });
 });

app.listen(3000, function () {
  console.log('polython 2019 app listening on port ' + port);
});
