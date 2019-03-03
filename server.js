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

app.get('/v1/ticker', (req, res, next) => {

  console.log("\n" + new Date() + " -- Obteniendo tickers ");

  let ticker = "https://api.bitso.com/v3/ticker/?book=" + req.query.book;
  console.log( "  ticker = " + ticker );

  if( req.query.book == 'undefined' )
    res.status(400).send("Book no encontrado.");

  let requestTicker = requestjson.createClient( ticker );

  requestTicker.get('', (err, resM, body) => {
    if(err){
      console.error(err);
      res.status(500).send("Hubo algun problema con la conexión");
    }else {
      var hour = body.payload.created_at.substring(11, 16);
      var arrayDataResonse = [ hour
                             , parseFloat( body.payload.low  )
                             , parseFloat( body.payload.bid  )
                             , parseFloat( body.payload.ask  )
                             , parseFloat( body.payload.high ) ];
      console.log(arrayDataResonse);
      res.send(arrayDataResonse);
    }
  });
});

 // -********************* dialogflow  *******************-

 app.get('/v1/dialog', (req, res, next) => {

   const promise = dialogflow.runSample("bitbot-polython", req.query.question);
   var allData = "";
   promise.then( (data) => {
     this.allData = data;
     // console.log(this.allData);
     next();
     // res.send(data);
   }).catch(error => {
     console.log("error ", error)
   });
 }, (req, res, next) => {
   var data2 = this.allData[0];
   console.log(data2.queryResult);

   switch (data2.queryResult.intent.displayName) {
     case "btc_mxn":
        var ticker = "https://api.bitso.com/v3/ticker/?book=btc_mxn";
        var requestTicker = requestjson.createClient( ticker );
        requestTicker.get('', (err, resM, body) => {
          if(err){
            console.error(err);
            res.status(500).send("Hubo algun problema con la conexión");
          }else {
            var ultimaPuja = body.payload.last;
            var msj = data2.queryResult.fulfillmentText.replace("@valor",ultimaPuja);

            res.send(msj);
          }
        });
       break;

       default:
        res.send(data2.queryResult.fulfillmentText);
   }

   // var requestTicker = requestjson.createClient( ticker );
   // res.send(data2);
 });

app.listen(3000, function () {
  console.log('polython 2019 app listening on port ' + port);
});
