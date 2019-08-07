var movements = [
  [10, 20, 'air squats','description'],
  [10, 20, 'jumping jacks','description'],
  [5, 10, 'pushups','description'],
  [20, 40, 'bicycle kicks','description'],
  [10, 20, 'sit-ups/crunches','description'],
  [10, 20, 'alternating mountain climbers','description'],
  [10, 20, 'alternating lunges','description'],
  [10, 20, 'jumping alternating lunges','description'],
  [20, 40, 'flutter kicks','description'],
  [2, 4, 'flights of stairs','description'],
  [20, 40, 'butt kickers','description'],
  [20, 40, 'high knees','description'],
  [10, 20, 'samson stretches','description'],
  [10, 20, 'knee-to-chest stretches','description'],
  [10, 20, 'jump squats','description'],
  [10, 20, 'lateral alternating lunges','description'],
  [5, 10, 'burpees','description'],
  [30, 60, 'second wall sit','description'],
  [30, 60, 'second pigeon pose (each leg)','description'],
  [30, 60, 'second piriformis stretch (each side)','description'],
  [30, 60, 'second lunge stretch (each leg)','description'],
  [30, 60, 'second plank','description'],
  [30, 60, 'second side plank (each side)','description'],
  [30, 60, 'second superman plank','description'],
];

module.exports = {
  getRandomMovement: function() {
    return movements[Math.floor(Math.random() * movements.length)];
  }
}
