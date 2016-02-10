import sumCheck from './sum_check';
import dateSequentialCheck from './date_check_sequential';
import dateTotalCheck from './date_check_total';
import R from 'ramda';

// // Note- waterway KMs, GPS trace KMs, and building mods are
// // captured but are not in the official spec.
// // Countries, tasks, task edits, and JOSM are in the spec
// // but are not implemented here.
module.exports.getBadgeProgress = function getBadgeProgress (user) {
  var sumBadges = sumCheck({
    roads: Number(user.total_road_count_add),
    roadMods: Number(user.total_road_count_mod),
    buildings: Number(user.total_building_count_add),
    // buildingMods: user.total_building_count_mod,
    waterways: Number(user.total_waterway_count_add),
    pois: Number(user.total_poi_count_add),
    gpsTraces: Number(user.total_gpstrace_count_add),
    roadKms: Number(user.total_road_km_add),
    roadKmMods: Number(user.total_road_km_mod),
    // waterwayKms: user.total_waterway_km_add,
    // gpsTraceKmAdd: user.total_gpstrace_km_add,
    countries: user.country_count,
    // tasks: user.,
    // taskEdits: user.,
    josm: user.total_josm_edit_count,
    hashtags: Object.keys(user.hashtags).length
  });

  var consistencyBadge = dateSequentialCheck(user.edit_times);
  var historyBadge = dateTotalCheck(user.edit_times);

  var sortedSumBadges = Object.keys(sumBadges).sort(function (a, b) {
    return sumBadges[a].points.percentage - sumBadges[b].points.percentage;
  });

  var mostObtainableNames = sortedSumBadges.slice(-3);
  var mostObtainable = sumBadges[mostObtainableNames[2]];
  var secondMostObtainable = sumBadges[mostObtainableNames[1]];
  var thirdMostObtainable = sumBadges[mostObtainableNames[0]];

  return {
    all: R.mergeAll([sumBadges, consistencyBadge, historyBadge]),
    mostAttainable: [mostObtainable, secondMostObtainable, thirdMostObtainable]
  };
};

module.exports.sortBadgeHashtags = function sortBadgeHashtags (user) {
  return user.badges.sort(function (a, b) {
    return new Date(a.created_at) - new Date(b.created_at);
  });
};
