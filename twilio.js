// var _ = require('lodash')
// *var Twilio = require('twilio')

var accountSid = 'AC864dd5308036d993fcab884af4db4a16' // Your Account SID from www.twilio.com/console
var authToken = 'd1281b36a3585d334a8282b50370c4e7' // Your Auth Token from www.twilio.com/console

// var twilio = require('twilio')
// *var client = new Twilio(accountSid, authToken)
const client = require('twilio')(accountSid, authToken)

client.messages.create({
  body: '¡Hey! Bitcoin se está volviendo loco y activó tu alerta!',
  to: '+525539228328', // Text this number
  from: '4693821248' // From a valid Twilio number
})
  .then((message) => console.log(message.sid)).catch((error) => console.log(error))
