var movements = [
  ['10 air squats','description'],
  ['10 jumping jacks','description'],
  ['10 pushups','description'],
  ['30 second plank','description'],
  ['30 second side plank (each side)','description'],
  ['30 second superman plank','description'],
  ['20 bicycle kicks','description'],
  ['10 sit-ups/crunches','description'],
  ['10 alternating mountain climbers','description'],
  ['30 second wall sit','description'],
  ['10 alternating lunges','description'],
  ['10 jumping alternating lunges','description'],
  ['20 flutter kicks','description'],
  ['2-4 flights of stairs','description'],
  ['20 butt kickers','description'],
  ['20 high knees','description'],
  ['10 samson stretches','description'],
  ['10 knee-to-chest stretches','description'],
  ['30 second pigeon pose (each leg)','description'],
  ['30 second piriformis stretch (each side)','description'],
  ['30 second lunge stretch (each leg)','description'],
  ['10 jump squats','description'],
  ['10 lateral alternating lunges','description'],
  ['5 burpees','description']
];

module.exports = {
  getRandomMovement: function() {
    return movements[Math.floor(Math.random() * movements.length)];
  }
}
