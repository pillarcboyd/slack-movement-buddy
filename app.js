const { App } = require('@slack/bolt');
var schedule = require('node-schedule');
var express = require('express');
var request = require('request')
var bodyParser = require('body-parser')
const movements = require('./movements')
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const boltApp = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

var app = express();

var lastMovement = [];

// var oncePerMinute = schedule.scheduleJob('45 * * * * *', function(){
//   var currentMovement = getMovement();
//
//   boltApp.client.chat.postMessage({
//     token: process.env.SLACK_BOT_TOKEN,
//     channel: process.env.SLACK_BOT_CHANNEL,
//     text: 'Get up and do the following: ' + currentMovement[getReps()] + ' ' + currentMovement[2] + '. ' + currentMovement[3]
//   });
//   console.log(currentMovement + ' fitness message sent at ' + new Date());
// });

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
        var currentMovement = movements.getRandomMovement();
        var formattedMessage = 'Get up and do the following: ' + currentMovement[getReps()] + ' ' + currentMovement[2] + '. ' + currentMovement[3];
        var message = generateMessage(formattedMessage, true)
        sendMessageToSlackResponseURL(responseURL, message)
      }
    }
  }
});

app.post('/exercise', urlencodedParser, (req, res) => {
  res.status(200).end()

  var reqBody = req.body
  console.log(reqBody)
  var responseURL = reqBody.response_url

  if (reqBody.token != process.env.SLACK_VERIFICATION_TOKEN) {
    console.log('Access was forbidden')
    res.status(403).end("Access forbidden")
  } else {
    var currentMovement = movements.getRandomMovement();
    var formattedMessage = 'Get up and do the following: ' + currentMovement[getReps()] + ' ' + currentMovement[2] + '. ' + currentMovement[3];
    var message = generateMessage(formattedMessage, false)
    sendMessageToSlackResponseURL(responseURL, message)
  }
})

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
rule.hour = [new schedule.Range(9,17)];
rule.minute = 50;
rule.second = 0;

var oncePerHour = schedule.scheduleJob(rule, function(){
  var currentMovement = getMovement();

  boltApp.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: process.env.SLACK_BOT_CHANNEL,
    text: 'Get up and do the following: ' + currentMovement[getReps()] + ' ' + currentMovement[2] + '. ' + currentMovement[3]
  });
  console.log('Fitness message sent at ' + new Date());
});

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

const PORT = 3000;
app.listen(PORT, function() {
    console.log("App listening on port " + PORT);
});

app.get('/', function(req, res) {
    res.send('Ngrok is working! Path Hit: ' + req.url);
});
