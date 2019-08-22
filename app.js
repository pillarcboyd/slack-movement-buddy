require('dotenv').config()
const { WebClient } = require('@slack/web-api')
var schedule = require('node-schedule')
var express = require('express')
var request = require('request')
var bodyParser = require('body-parser')
const movements = require('./movements')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var app = express()
const web = new WebClient(process.env.SLACK_BOT_TOKEN)

var lastMovement = []

app.listen(process.env.PORT, function() {
  console.log("App listening on port " + process.env.PORT);
})

app.get('/', function(req, res) {
  res.send('Ngrok is working! Path Hit: ' + req.url);
})

app.get('/auth', function(req, res) {
  console.log('auth')
  console.log(req)
  if (req.body == 'No service') {
    // user uninstalled, stop messaging them
  }

  res.sendFile(__dirname + '/add_to_slack.html')
})

app.get('/auth/redirect', function(req, res) {
  console.log('redirect')
  console.log(req)
    var options = {
        uri: 'https://slack.com/api/oauth.access?code='
            +req.query.code+
            '&client_id='+process.env.CLIENT_ID+
            '&client_secret='+process.env.CLIENT_SECRET+
            '&redirect_uri='+process.env.REDIRECT_URI,
        method: 'GET'
    }
    request(options, (error, response, body) => {
        var JSONresponse = JSON.parse(body)
        if (!JSONresponse.ok){
            console.log(JSONresponse)
            res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
        }else{
            console.log(JSONresponse)
            res.send("Success!")
        }
    })
})

app.post('/feedback', urlencodedParser, function(req, res) {
  res.status(200).end()

  var payload = JSON.parse(req.body.payload)
  console.log(payload)
  var responseURL = payload.response_url
  if (payload.token != process.env.SLACK_VERIFICATION_TOKEN) {
    console.log('Access was forbidden')
    res.status(403).end("Access forbidden")
  } else {
    if (payload.callback_id == "movement_message") {
      console.log('movement message callback!')
      console.log(payload.actions[0])
      console.log(payload.actions[0].value)
      if (payload.actions[0].value == 'complete') {
        var message = {
          "text": 'Well done! 10 points for you!',
          "replace_original": true
        }
        sendMessageToSlackResponseURL(responseURL, message)
      } else if (payload.actions[0].value == 'different') {
        var currentMovement = movements.getRandomMovement()
        var formattedMessage = createFormattedMessage(currentMovement)
        var message = generateMessage(formattedMessage, true)
        sendMessageToSlackResponseURL(responseURL, message)
      }
    }
  }
})

app.post('/exercise', urlencodedParser, (req, res) => {
  res.status(200).end()

  var reqBody = req.body
  console.log(reqBody)
  var responseURL = reqBody.response_url

  if (reqBody.token != process.env.SLACK_VERIFICATION_TOKEN) {
    console.log('Access was forbidden')
    res.status(403).end("Access forbidden")
  } else {
    var currentMovement = movements.getRandomMovement()
    var formattedMessage = createFormattedMessage(currentMovement)
    var message = generateMessage(formattedMessage, false)
    sendMessageToSlackResponseURL(responseURL, message)
  }
})

function createFormattedMessage(currentMovement) {
  return 'Get up and do the following: ' + currentMovement[getReps()] + ' ' + currentMovement[2] + '. ' + currentMovement[3]
}

function generateMessage(text, isReplace) {
  var message = {
      "text": text,
      "replace_original": isReplace,
      "attachments": [
          {
              "text": "How did that go?",
              "fallback": "Shame... feedback buttons aren't supported in this land",
              "callback_id": "movement_message",
              "color": "#3AA3E3",
              "attachment_type": "default",
              "actions": [
                  {
                      "name": "done",
                      "text": "Did it!",
                      "type": "button",
                      "value": "complete"
                  },
                  {
                      "name": "different",
                      "text": "Different move, please!",
                      "type": "button",
                      "value": "different"
                  }
              ]
          }
      ]
  }
  return message
}

function sendMessageToSlackResponseURL(responseURL, JSONmessage) {
    var postOptions = {
        uri: responseURL,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: JSONmessage
    }
    request(postOptions, (error, response, body) => {
        if (error) {
            console.log(error)
        }
    })
}

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(1,5)];
rule.hour = [new schedule.Range(8,17)];
rule.minute = 50;
rule.second = 0;

schedule.scheduleJob(rule, function() {
  var currentMovement = getMovement();
  var formattedMessage = createFormattedMessage(currentMovement);

  sendScheduledMessage(formattedMessage);
})

function sendScheduledMessage(formattedMessage) {
  (async () => {
  const res = await web.chat.postMessage({ channel: process.env.SLACK_BOT_CHANNEL, text: formattedMessage });

  console.log('Fitness message sent at ' + new Date());
  })();
}

function getMovement() {
  var movement = [];
  do {
    movement = movements.getRandomMovement();
    console.log('lastMovement = ' + lastMovement);
    console.log('currentMovement = ' + movement);
  } while (lastMovement == movement);

  lastMovement = movement;
  console.log('new lastMovement is = ' + lastMovement)
  return movement;
}

function getReps() {
  return Math.floor(Math.random() * 10) % 2
}
