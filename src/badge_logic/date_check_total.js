var R = require('ramda');

module.exports = function (dates) {
  var badges = {
    daysTotal: {
      name: 'Year-long Mapper',
      id: 15,
      tiers: {1: 25, 2: 50, 3: 100}
    }
  };

  function checkBadgeLevel (uniqueDatesLength, badge) {
    if (uniqueDatesLength >= badge.tiers[1] && uniqueDatesLength < badge.tiers[2]) {
      return 1;
    } else if (uniqueDatesLength >= badge.tiers[2] && uniqueDatesLength < badge.tiers[3]) {
      return 2;
    } else if (uniqueDatesLength >= badge.tiers[3]) {
      return 3;
    } else {
      return 0;
    }
  }

  // Truncate hours/minutes/seconds from timestamp
  dates = dates.map(function (date) {
    date = new Date(date);
    return date.setHours(0, 0, 0, 0);
  });

  // Get unique dates and check badge level
  var uniqueDates = R.uniq(dates);
  var key = 'daysTotal';
  var userTotal = uniqueDates.length;
  var badge = badges[key];

  var userBadges = {};
  var badgeLevel = checkBadgeLevel(userTotal, badge);
  if (badgeLevel < 3) {
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

  return userBadges;
};
