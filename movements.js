var movements = ['10 air squats', '10 jumping jacks', '10 pushups', '30 second plank', '30 second wall sit', '10 alternating lunges'];

module.exports = {
  getRandomMovement: function() {
    return movements[Math.floor(Math.random() * movements.length)];
  }
}
