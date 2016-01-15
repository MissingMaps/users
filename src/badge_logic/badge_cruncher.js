dateCheckSequential = require('./date_check_sequential');
dateCheckTotal = require('./date_check_total');
sumCheck = require('./sum_check');



badgeCruncher function (input) {
  var stats = input
  console.log(stats)
  var sumBadges = sumCheck({
    roads: stats.road_count,
    roadMods: stats.building_count,
    pois: stats.poi_count,
    buildings: stats.building_count,
    // gpsTraces: stats.gps_traces,
    roadKms: stats.road_km,
    roadKmMods: stats.road_km_mod,
    waterways: stats.waterway_count,
    // countries: stats.countries,
    // tasks: stats.tasks,
    // taskEdits: stats.task_edits,
    // josm: stats.josm,
    // hashtags: stats.hashtags
  });
  console.log(sumBadges)
}

var data = {
  "id": 1,
  "name": "Tom",
  "stats":{
    "road_count": 558,
    "road_count_mod": 102,
    "building_count": 145,
    "building_count_mod": 257,
    "waterway_count": 187,
    "poi_count": 10,
    "road_km": 102,
    "road_km_mod": 1010,
    "waterway_km": 523,
    "hashtags":["#hotosm-project-1075",
                "#Bamako",
                "#Mali",
                "#Map4mali",
                "@osm-Mali"],
    "countries":["Mali"],
    "software":["JOSM/1.5 (8969 fr)"],
    "footprint": ""
  },
  "badges": {
    "Road Builder":{"level":2,"created_at":"2015-11-18T11:46:14+00:00"},
    "Road Maintainer":{"level":1,"created_at":"2015-09-10T11:26:14+00:00"},
    "Point Creator":{"level":0,"created_at":"2016-01-19T11:46:14+00:00"},
    "Building Builder":{"level":1,"created_at":"2016-01-22T11:46:19+00:00"},
    "Building Maintainer":{"level":2,"created_at":"2016-01-19T15:46:14+00:00"},
    "GPS Trace Creator":{"level":2,"created_at":"2016-01-18T11:46:14+00:00"},
    "Long & Winding Road":{"level":1,"created_at":"2016-01-18T11:46:14+00:00"},
    "Long & Winding Road Maintainer":{"level":3,"created_at":"2016-02-18T11:38:14+00:00"},
    "Waterway Creator":{"level":2,"created_at":"2016-01-18T11:46:14+00:00"},
    "World Renown":{"level":1,"created_at":"2016-03-18T11:46:14+00:00"},
    "TaskMan Square Champion":{"level":2,"created_at":"2016-02-18T11:46:14+00:00"},
    "TaskMan Scrutinizer":{"level":1,"created_at":"2016-01-11T11:46:14+00:00"},
    "JOSM User":{"level":3,"created_at":"2016-02-10T11:01:14+00:00"},
    "Mapathoner":{"level":1,"created_at":"2016-04-09T11:01:14+00:00"},
    "Consistentency":{"level":2,"created_at":"2016-12-06T11:01:14+00:00"},
    "Year-Long Mapper":{"level":1,"created_at":"2016-12-18T11:01:14+00:00"}
  },

  "edit_times":[
    "2015-12-18T11:46:14+00:00",
    "2015-12-18T23:49:57+00:00",
    "2015-12-19T06:50:16+00:00",
    "2015-12-19T10:31:29+00:00",
    "2015-12-19T12:14:43+00:00",
    "2015-12-19T18:43:54+00:00",
    "2015-12-21T09:14:16+00:00",
    "2015-12-21T11:34:29+00:00",
    "2015-12-21T16:11:43+00:00",
    "2015-12-11T22:56:54+00:00"
  ]
}

badgeCruncher()
