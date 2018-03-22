module.exports = function (data) {
  var badges = {
    // note: road counts and road mod counts were removed

    pois: {
      name: 'On Point',
      id: 3,
      tiers: {1: 10, 2: 50, 3: 100, 4: 250, 5: 500, 6: 1000, 7: 1500, 8: 2000, 9: 2500, 10: 4000}
    },
    buildings: {
      name: 'The Wright Stuff',
      id: 4,
      tiers: {1: 100, 2: 500, 3: 1000, 4: 2500, 5: 5000, 6: 10000, 7: 25000, 8: 50000, 9: 75000, 10: 100000}
    },
    gpsTraces: {
      name: 'Field Mapper',
      id: 5,
      tiers: {1: 10, 2: 50, 3: 100, 4: 250, 5: 500, 6: 750, 7: 1000, 8: 1500, 9: 2000, 10: 5000}
    },
    roadKms: {
      name: 'On The Road Again',
      id: 6,
      tiers: {1: 50, 2: 100, 3: 500, 4: 1000, 5: 1500, 6: 2000, 7: 2500, 8: 5000, 9: 7500, 10: 10000}
    },
    roadKmMods: {
      name: 'Long and Winding Road',
      id: 7,
      tiers: {1: 50, 2: 100, 3: 500, 4: 1000, 5: 1500, 6: 2000, 7: 2500, 8: 5000, 9: 7500, 10: 10000}
    },
    waterways: {
      name: 'White Water Rafting',
      id: 8,
      tiers: {1: 50, 2: 100, 3: 500, 4: 1000, 5: 1500, 6: 2000, 7: 2500, 8: 5000, 9: 7500, 10: 10000}
    },
    countries: {
      name: 'World Renown',
      id: 9,
      tiers: {1: 5, 2: 10, 3: 20, 4: 25, 5: 30, 6: 35, 7: 40, 8: 50, 9: 75, 10: 100}
    },
    tasks: {
      name: 'Task Champion',
      id: 10,
      tiers: {1: 10, 2: 25, 3: 100, 4: 200, 5: 400, 6: 800, 7: 1250, 8: 2500, 9: 5000, 10: 10000}
    },
    taskValidations: {
      name: 'Scrutinizer',
      id: 11,
      tiers: {1: 10, 2: 25, 3: 50, 4: 100, 5: 250, 6: 500, 7: 1000, 8: 2000, 9: 5000, 10: 10000}
    },
    josm: {
      name: 'Awesome JOSM',
      id: 12,
      tiers: {1: 1, 2: 10, 3: 100, 4: 250, 5: 500, 6: 750, 7: 1000, 8: 1500, 9: 2500, 10: 5000}
    },
    hashtags: {
      name: 'Mapathoner',
      id: 13,
      tiers: {1: 1, 2: 10, 3: 25, 4: 25, 5: 50, 6: 75, 7: 100, 8: 150, 9: 250, 10: 500}
    },

    // ID #14 and 16 used by date check logic
    taskInvalidations: {
      name: 'High Standards',
      id: 16,
      tiers: {1: 5, 2: 15, 3: 25, 4: 50, 5: 100, 6: 200, 7: 300, 8: 500, 9: 750, 10: 1000}
    }
  };

  function checkBadgeLevel (userTotal, badge) {
    if (userTotal >= badge.tiers[1] && userTotal < badge.tiers[2]) {
      return 1;
    } else if (userTotal >= badge.tiers[2] && userTotal < badge.tiers[3]) {
      return 2;
    } else if (userTotal >= badge.tiers[3] && userTotal < badge.tiers[4]) {
      return 3;
      } else if (userTotal >= badge.tiers[4] && userTotal < badge.tiers[5]) {
      return 4;    
      } else if (userTotal >= badge.tiers[5] && userTotal < badge.tiers[6]) {
      return 5;
      } else if (userTotal >= badge.tiers[6] && userTotal < badge.tiers[7]) {
      return 6;
      } else if (userTotal >= badge.tiers[7] && userTotal < badge.tiers[8]) {
      return 7; 
      } else if (userTotal >= badge.tiers[8] && userTotal < badge.tiers[9]) {
      return 8; 
      } else if (userTotal >= badge.tiers[9] && userTotal < badge.tiers[10]) {
      return 9; 
    } else if (userTotal >= badge.tiers[10]) {
      return 10;        
    } else {
      return 0;
    }
  }

  var userBadges = {};
  Object.keys(data).forEach(function (key) {
    var userTotal = data[key];
    var badge = badges[key];

    var badgeLevel = checkBadgeLevel(userTotal, badge);

    if (badgeLevel < 10) {
      var nextBadgeLevel = badgeLevel + 1;
      var currentPoints = Number(userTotal);
      var lastPoints = 0;
      if (badgeLevel > 0) lastPoints = badge.tiers[badgeLevel];
      var nextPoints = badge.tiers[nextBadgeLevel];
      var percentage = (currentPoints - lastPoints) / (nextPoints - lastPoints) * 100;
      userBadges[key] = {
        name: badge.name,
        category: badge.id,
        badgeLevel: badgeLevel,
        nextBadgeLevel: nextBadgeLevel,
        points: {
          currentPoints: currentPoints,
          nextPoints: nextPoints,
          percentage: percentage
        }
      };
    }
  });

  return userBadges;
};
