var sumCheck = require('./sum_check');
import R from 'ramda';

// Note- waterway KMs, GPS trace KMs, and building mods are
// captured but are not in the official spec.
// Countries, tasks, task edits, and JOSM are in the spec
// but are not implemented herse.
module.exports.getBadgeProgress = function getBadgeProgress (user) {
  var badgeProgress = sumCheck({
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
    // countries: user.,
    // tasks: user.,
    // taskEdits: user.,
    // josm: user.,
    hashtags: R.sum(R.values(user.hashtags))
  });

  var sortedBadges = Object.keys(badgeProgress).sort(function (a, b) {
    return badgeProgress[a].points.percentage - badgeProgress[b].points.percentage;
  });
  var mostAttainableBadge = badgeProgress[sortedBadges.slice(-1)[0]];
  mostAttainableBadge.name = badgeProgress[R.last(sortedBadges)].name;
  return {all: badgeProgress, mostAttainable: mostAttainableBadge};
};

module.exports.sortBadgeHashtags = function sortBadgeHashtags (user) {
  return user.badges.sort(function (a, b) {
    return new Date(a.created_at) - new Date(b.created_at);
  });
};
