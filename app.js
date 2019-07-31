const { App } = require('@slack/bolt');
var schedule = require('node-schedule');

const app = new App({
  token: process.env.SLACK_BOT_TOKEN,
  signingSecret: process.env.SLACK_SIGNING_SECRET
});

var oncePerMinute = schedule.scheduleJob('45 * * * * *', function(){
  app.client.chat.postMessage({
    token: process.env.SLACK_BOT_TOKEN,
    channel: 'CLB865S81',
    text: 'Get up and do the following: ' + getRandomMovement()
  });
  console.log('Fitness message sent at ' + new Date());
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
    text: 'Get up and do the following: ' + getRandomMovement()
  });
  console.log('Fitness message sent at ' + new Date());
});

var movements = ['10 air squats', '10 jumping jacks', '10 pushups', '30 second plank']

function getRandomMovement() {
  return movements[Math.floor(Math.random() * movements.length)];
}

app.error((error) => {
  console.error(error);
});

(async () => {
  await app.start(process.env.PORT || 3000);

  console.log('⚡️ Bolt app is running!');
})();
