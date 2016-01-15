var sumCheck = require('./sum_check');

// Note- waterway KMs, GPS trace KMs, and building mods are
// captured but are not in the official spec.
// Countries, tasks, task edits, and JOSM are in the spec
// but are not implemented herse.
module.exports = function getBadgeProgress (user) {
  var badgeProgress = sumCheck({
    roads: user.total_road_count_add,
    roadMods: user.total_road_count_mod,
    buildings: user.total_building_count_add,
    // buildingMods: user.total_building_count_mod,
    waterways: user.total_waterway_count_add,
    pois: user.total_poi_count_add,
    gpsTraces: user.total_gpstrace_count_add,
    roadKms: user.total_road_km_add,
    roadKmMods: user.total_road_km_mod,
    // waterwayKms: user.total_waterway_km_add,
    // gpsTraceKmAdd: user.total_gpstrace_km_add,
    // countries: user.,
    // tasks: user.,
    // taskEdits: user.,
    // josm: user.,
    hashtags: user.hashtags.length
  });

  var sortedBadges = Object.keys(badgeProgress).sort(function (a, b) {
    return badgeProgress[a].points.percentage - badgeProgress[b].points.percentage;
  });
  var mostAttainableBadge = badgeProgress[sortedBadges.slice(-1)[0]];
  return {all: badgeProgress, mostAttainable: mostAttainableBadge};
};

module.exports = function sortBadgeHashtags (user) {
  return user.badges.sort(function (a, b) {
    return new Date(a.created_at) - new Date(b.created_at);
  });
};
