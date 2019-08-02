const { App } = require('@slack/bolt');
var schedule = require('node-schedule');
const movements = require('./movements')

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

var lastMovement = '';

var oncePerMinute = schedule.scheduleJob('45 * * * * *', function(){
  var currentMovement = getMovement();

  app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: 'CLB865S81',
    text: 'Get up and do the following: ' + currentMovement
  });
  console.log(currentMovement + ' fitness message sent at ' + new Date());
});

var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [new schedule.Range(1,5)];
rule.hour = [new schedule.Range(9,17)];
rule.minute = 50;
rule.second = 0;

var oncePerHour = schedule.scheduleJob(rule, function(){
  app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: 'CLB865S81',
    text: 'Get up and do the following: ' + movements.getRandomMovement()
  });
  console.log('Fitness message sent at ' + new Date());
});

function getMovement() {
  var movement = '';
  do {
    movement = movements.getRandomMovement();
    console.log('lastMovement = ' + lastMovement);
    console.log('currentMovement = ' + movement);
  } while (lastMovement == movement);

  lastMovement = movement;
  console.log('new lastMovement is = ' + lastMovement)
  return movement;
}

app.error((error) => {
  console.error(error);
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
