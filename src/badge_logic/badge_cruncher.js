var sumCheck = require('./sum_check');
var dateSequentialCheck = require('./date_check_sequential');
var dateTotalCheck = require('./date_check_total');
// import R from 'ramda';
var R = require('ramda')

// // Note- waterway KMs, GPS trace KMs, and building mods are
// // captured but are not in the official spec.
// // Countries, tasks, task edits, and JOSM are in the spec
// // but are not implemented herse.
// module.exports.getBadgeProgress = function getBadgeProgress (user) {
//   var badgeProgress = sumCheck({
//     roads: Number(user.total_road_count_add),
//     roadMods: Number(user.total_road_count_mod),
//     buildings: Number(user.total_building_count_add),
//     // buildingMods: user.total_building_count_mod,
//     waterways: Number(user.total_waterway_count_add),
//     pois: Number(user.total_poi_count_add),
//     gpsTraces: Number(user.total_gpstrace_count_add),
//     roadKms: Number(user.total_road_km_add),
//     roadKmMods: Number(user.total_road_km_mod),
//     // waterwayKms: user.total_waterway_km_add,
//     // gpsTraceKmAdd: user.total_gpstrace_km_add,
//     // countries: user.,
//     // tasks: user.,
//     // taskEdits: user.,
//     // josm: user.,
//     hashtags: R.sum(R.values(user.hashtags))
//   });

//   var sortedBadges = Object.keys(badgeProgress).sort(function (a, b) {
//     return badgeProgress[a].points.percentage - badgeProgress[b].points.percentage;
//   });
//   var mostAttainableBadge = badgeProgress[sortedBadges.slice(-1)[0]];
//   mostAttainableBadge.name = badgeProgress[R.last(sortedBadges)].name;
//   return {all: badgeProgress, mostAttainable: mostAttainableBadge};
// };

// module.exports.sortBadgeHashtags = function sortBadgeHashtags (user) {
//   return user.badges.sort(function (a, b) {
//     return new Date(a.created_at) - new Date(b.created_at);
//   });
// };

function getBadgeProgress (user) {
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
    // countries: user.,
    // tasks: user.,
    // taskEdits: user.,
    // josm: user.,
    hashtags: R.sum(R.values(user.hashtags))
  });

  var historyBadge = dateTotalCheck(user.edit_times);
  var earnedBadges = R.mergeAll([sumBadges, historyBadge]);

  var sortedBadges = Object.keys(earnedBadges).sort(function (a, b) {
    return earnedBadges[a].points.percentage - earnedBadges[b].points.percentage;
  });

  var mostAttainableBadge = earnedBadges[sortedBadges.slice(-1)[0]];
  mostAttainableBadge.name = earnedBadges[R.last(sortedBadges)].name;

  return {all: earnedBadges, mostAttainable: mostAttainableBadge};
}

module.exports.sortBadgeHashtags = function sortBadgeHashtags (user) {
  return user.badges.sort(function (a, b) {
    return new Date(a.created_at) - new Date(b.created_at);
  });
};


var user = {
"id": 40719375,
"name": "ChaseBlack",
"avatar": "?",
"geo_extent": null,
"total_road_count_add": "58.00000000000000000000",
"total_road_count_mod": "74.00000000000000000000",
"total_building_count_add": "73.00000000000000000000",
"total_building_count_mod": "86.00000000000000000000",
"total_waterway_count_add": "143.00000000000000000000",
"total_poi_count_add": "157.00000000000000000000",
"total_gpstrace_count_add": "0.00000000000000000000",
"total_road_km_add": "25.98962517108493000000",
"total_road_km_mod": "47.76391544721521000000",
"total_waterway_km_add": "115.71312085940691000000",
"total_gpstrace_km_add": "0.00000000000000000000",
"created_at": "2016-01-15T03:27:11.744Z",
"badges": [
{
"id": 22,
"category": 8,
"name": "Waterway Creator",
"level": 1,
"created_at": "2016-01-13T19:10:11.453Z",
"_pivot_user_id": 40719375,
"_pivot_badge_id": 22
},
{
"id": 23,
"category": 8,
"name": "Waterway Creator",
"level": 2,
"created_at": "2016-01-13T19:10:11.453Z",
"_pivot_user_id": 40719375,
"_pivot_badge_id": 23
},
{
"id": 43,
"category": 15,
"name": "Year-long Mapper",
"level": 1,
"created_at": "2016-01-13T19:10:11.453Z",
"_pivot_user_id": 40719375,
"_pivot_badge_id": 43
}
],
"latest": {
"id": 897857639,
"road_count_add": "1.00000000000000000000",
"road_count_mod": "0.00000000000000000000",
"building_count_add": "0.00000000000000000000",
"building_count_mod": "0.00000000000000000000",
"waterway_count_add": "4.00000000000000000000",
"poi_count_add": "0.00000000000000000000",
"gpstrace_count_add": "0.00000000000000000000",
"road_km_add": "5.88807696103403000000",
"road_km_mod": "0.00000000000000000000",
"waterway_km_add": "3.62192589109174930000",
"gpstrace_km_add": "0.00000000000000000000",
"editor": null,
"user_id": 40719375,
"created_at": "2016-05-26T21:55:15.754Z",
"hashtags": [
{
"id": 23,
"hashtag": "PeaceCorps",
"created_at": "2016-01-15T03:27:11.341Z"
}
],
"countries": [
{
"id": 84,
"name": "China",
"code": "CHN",
"created_at": "2016-01-13T19:10:11.490Z"
}
]
},
"edit_times": [
"2016-02-14T15:24:15.754Z",
"2016-01-22T03:15:40.754Z",
"2016-02-17T03:23:14.754Z",
"2016-03-06T09:32:42.754Z",
"2016-01-27T01:12:20.754Z",
"2016-02-15T20:23:23.754Z",
"2016-05-05T07:01:41.754Z",
"2016-05-15T19:25:02.754Z",
"2016-05-19T02:58:16.754Z",
"2016-05-05T06:19:04.754Z",
"2016-03-10T06:42:24.754Z",
"2016-03-13T23:15:52.754Z",
"2016-05-11T06:48:57.754Z",
"2016-05-16T14:19:28.754Z",
"2016-03-30T16:01:30.754Z",
"2016-05-26T16:17:52.754Z",
"2016-05-26T21:55:15.754Z",
"2016-05-07T12:12:52.754Z",
"2016-05-17T05:41:04.754Z",
"2016-05-10T15:08:54.754Z",
"2016-05-03T12:25:20.754Z",
"2016-05-12T13:26:33.754Z",
"2016-05-21T10:21:55.754Z",
"2016-01-17T18:03:57.754Z",
"2016-05-08T13:39:10.754Z",
"2016-04-25T06:06:58.754Z",
"2016-04-07T10:41:59.754Z",
"2016-05-15T03:19:15.754Z",
"2016-03-03T13:19:26.754Z",
"2016-05-10T04:16:31.754Z",
"2016-04-04T03:02:32.754Z",
"2016-05-22T17:56:38.754Z",
"2016-02-04T17:30:03.754Z",
"2016-01-17T10:57:53.754Z",
"2016-03-20T06:27:26.754Z",
"2016-03-25T16:58:56.754Z",
"2016-04-05T09:12:59.754Z",
"2016-04-15T14:16:45.754Z",
"2016-03-18T09:11:50.754Z",
"2016-04-02T06:46:11.754Z",
"2016-05-24T08:08:52.754Z",
"2016-03-10T00:32:19.754Z",
"2016-03-21T10:14:00.754Z",
"2016-04-14T11:32:06.754Z",
"2016-01-15T23:35:16.754Z",
"2016-03-22T19:30:06.754Z",
"2016-04-03T21:06:28.754Z",
"2016-02-29T13:49:27.754Z",
"2016-04-05T03:16:11.754Z",
"2016-02-24T00:23:23.754Z"
],
"hashtags": {
"missingmaps": 20,
"osmgeoweek": 15,
"PeaceCorps": 7,
"Mali": 8
}
}

console.log(getBadgeProgress(user))
