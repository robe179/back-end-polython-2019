const dialogflow = require('dialogflow')
const uuid = require('uuid')

/**
 * Send a query to the dialogflow agent, and return the query result.
 * @param {string} projectId The project to be used
 */
async function runSample (projectId = 'bitbot-polython', pregunta) {
  // A unique identifier for the given session
  const sessionId = uuid.v4()

  // Create a new session
  const sessionClient = new dialogflow.SessionsClient({
    keyFilename: 'BitBot-5a5a5dc1f884.json'
  })

  const sessionPath = sessionClient.sessionPath(projectId, sessionId)

  // The text query request.
  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        // The query to send to the dialogflow agent
        // text: '¿Cuánto vale un bitcoin?',
        text: pregunta,
        // The language used by the client (en-US)
        languageCode: 'es-MX'
      }
    }
  }
  // Send request and log result
     // Do async job
   const responses = await sessionClient.detectIntent(request);

  // console.log('Detected intent')
  const result = responses[0].queryResult
  // console.log(`  Query: ${result.queryText}`)
  // console.log(`  Response: ${result.fulfillmentText}`)
  if (result.intent) {
    // console.log(`  Intent: ${result.intent.valorBitcoin}`)
    return responses;
  } else {
    var objError = {
      error: "No intent matched. "
    }
    return objError;
    // console.log(`  No intent matched.`)
  }

}

// try {
//   runSample("bitbot-polython", "¿Cuánto vale un bitcoin?")
// } catch (error) {
//   console.log('ERRO')
// }

exports.runSample=runSample;
