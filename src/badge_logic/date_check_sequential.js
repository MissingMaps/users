module.exports = function (dates) {
  var badges = {
    daysInRow: {
      name: 'Consistency',
      id: 14,
      tiers: {1: 5, 2: 20, 3: 50}
    }
  };

  // function takes array of dates and returns an array of arrays
  // containing each sequential date
  // http://stackoverflow.com/questions/16690905/javascript-get-sequential-dates-in-array
  function sequentializeDates (dates) {
    dates = dates.map(function (date) {
      return new Date(date);
    });
    var k = 0;
    var sorted = [];
    sorted[k] = [];
    dates.sort(function (a, b) {
      return +a > +b ? 1 : +a === +b ? 0 : -1;
    })
    .forEach(function (v, i) {
      var a = v;
      var b = dates[i + 1] || 0;
      sorted[k].push(+a);
      if ((+b - +a) > 86400000) {
        sorted[++k] = [];
      }
      return 1;
    });
    sorted.sort(function (a, b) {
      return a.length > b.length ? -1 : 1;
    });
    return sorted;
  }

  function checkBadgeLevel (dayStreakLength, badge) {
    if (dayStreakLength >= badge.tiers[1] && dayStreakLength < badge.tiers[2]) {
      return 1;
    } else if (dayStreakLength >= badge.tiers[2] && dayStreakLength < badge.tiers[3]) {
      return 2;
    } else if (dayStreakLength >= badge.tiers[3]) {
      return 3;
    } else {
      return 0;
    }
  }

  // returns the length of the longest array in an array
  var findLongestStreak = function (array) {
    var elements = array.length;
    var count = 0;
    for (var i = 0; i < elements; i++) {
      if (array[i].length > count) {
        count = array[i].length;
      }
    }
    return count;
  };

  var sequentialDates = sequentializeDates(dates);
  var userTotal = findLongestStreak(sequentialDates);
  var key = 'daysInRow';
  var badge = badges[key];

  var userBadges = {};
  var badgeLevel = checkBadgeLevel(userTotal, badge);
  if (badgeLevel < 3) {
    var nextBadgeLevel = badgeLevel + 1;
    var currentPoints = userTotal;
    var lastPoints = 0;
    if (badgeLevel > 0) lastPoints = badge.tiers[badgeLevel];
    var nextPoints = badge.tiers[nextBadgeLevel];
    var percentage = (currentPoints - lastPoints) / (nextPoints - lastPoints) * 100;
    userBadges[key] = {
      name: badge.name,
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
