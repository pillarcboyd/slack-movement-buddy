var movements = [
  [10, 20, 'air squats','https://www.youtube.com/watch?v=C_VtOYc6j5c'],
  [10, 20, 'jumping jacks','https://www.youtube.com/watch?v=c4DAnQ6DtF8'],
  [5, 10, 'pushups','https://www.youtube.com/watch?v=_l3ySVKYVJ8'],
  [20, 40, 'bicycle kicks','https://www.youtube.com/watch?v=9FGilxCbdz8'],
  [10, 20, 'sit-ups/crunches','https://www.youtube.com/watch?v=1fbU_MkV7NE'],
  [10, 20, 'alternating mountain climbers','https://www.youtube.com/watch?v=nmwgirgXLYM'],
  [10, 20, 'alternating lunges (stationary or walking)','https://www.youtube.com/watch?v=L8fvypPrzzs'],
  [10, 20, 'jumping alternating lunges','https://www.youtube.com/watch?v=Kw4QpPfX-cU'],
  [20, 40, 'flutter kicks','https://www.youtube.com/watch?v=eEG9uXjx4vQ'],
  [2, 4, 'flights of stairs','Find the nearest staircase and get to stepping!'],
  [20, 40, 'butt kickers','https://www.youtube.com/watch?v=-dtvAxibgYQ'],
  [20, 40, 'high knees','https://www.youtube.com/watch?v=QPfOZ0e30xg'],
  [10, 20, 'samson stretches','https://www.youtube.com/watch?v=NzVAFacHu9g'],
  [10, 20, 'knee-to-chest stretches','https://www.youtube.com/watch?v=9hVZ4rc2_3Y'],
  [10, 20, 'jump squats','https://www.youtube.com/watch?v=CVaEhXotL7M'],
  [10, 20, 'lateral alternating lunges','https://www.youtube.com/watch?v=J1JwEN32nCQ'],
  [5, 10, 'burpees','https://www.youtube.com/watch?v=TU8QYVW0gDU'],
  [30, 60, 'second wall sit','https://www.youtube.com/watch?v=-cdph8hv0O0'],
  [30, 60, 'second pigeon pose (each leg)','https://www.youtube.com/watch?v=FVlX5HNKamw'],
  [30, 60, 'second piriformis stretch (each side)','https://www.youtube.com/watch?v=JR1rtQ-PF38'],
  [30, 60, 'second lunge stretch (each leg)','https://www.youtube.com/watch?v=rHHzHSmjLng'],
  [30, 60, 'second plank','https://www.youtube.com/watch?v=B296mZDhrP4'],
  [30, 60, 'second side plank (each side)','https://www.youtube.com/watch?v=N_s9em1xTqU'],
  [30, 60, 'second superman plank','https://www.youtube.com/watch?v=srkvVU5XTEM']
];

module.exports = {
  getRandomMovement: function() {
    return movements[Math.floor(Math.random() * movements.length)];
  }
}
