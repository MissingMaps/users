import React from 'react';
import R from 'ramda';
import Badge from '../components/Badge';

function mapBadgeToImage (badge) {
  var map = {
    'Road Builder': 'assets/graphics/test.svg',
    'Road Maintainer': 'assets/graphics/test.svg',
    'Building Builder': 'assets/graphics/test.svg',
    'Consistentency': 'assets/graphics/test2.svg',
    'GPS Trace Creator': 'assets/graphics/test3.svg',
    'JOSM User': 'assets/graphics/test.svg',
    'Long & Winding Road': 'assets/graphics/test2.svg',
    'Long & Winding Road Maintainer': 'assets/graphics/test2.svg',
    'Mapathoner': 'assets/graphics/test3.svg',
    'Node Builder': 'assets/graphics/test.svg',
    'TaskMan Scrutinizer': 'assets/graphics/test3.svg',
    'TaskMan Square Champion': 'assets/graphics/test.svg',
    'Waterway Creator': 'assets/graphics/test2.svg',
    'World Renown': 'assets/graphics/test3.svg',
    'Year-long Mapper': 'assets/graphics/test3.svg',
    'Point Creator': 'assets/graphics/test3.svg'
  };
  return map[badge];
}

function mapBadgeToDescrip (badge) {
  var map = {
    'Road Builder': 'Map many roads across the land.',
    'Road Maintainer': 'Updated and corrected misplaced roads.',
    'Building Builder': 'Built all those buildings!',
    'Consistentency': 'Mapped every day for a week!',
    'GPS Trace Creator': 'Uploaded GPS traces through their OSM',
    'JOSM User': 'Used JSOM to map an area',
    'Long & Winding Road': 'Created lots of roads.',
    'Long & Winding Road Maintainer': 'Maintaining those long, long roads.',
    'Mapathoner': 'Unstoppable mapping machine.',
    'Node Builder': 'Added a truckful of nodes.',
    'TaskMan Scrutinizer': 'Scrutinize tasks with great vigilance',
    'TaskMan Square Champion': 'Mapped out 10 HOT task squares.',
    'Waterway Creator': 'A regular mapping Poseidon, mapping many waterways.',
    'World Renown': 'No land is outside your watchful gaze. Mapped in each continent.',
    'Year-long Mapper': 'You are so very dedicated. You have mapped for an entire year.',
    'Point Creator': 'You must really love points!'
  };
  return map[badge];
}

function mapBadgeToTask (badge, x) {
  var map = {
    'Road Builder': (x) => `Add ${x} roads.`,
    'Road Maintainer': (x) => `Modify ${x} roads.`,
    'Building Builder': (x) => `Build ${x} buildings.`,
    'Consistency': (x) => 'Map every day for a week.',
    'GPS Trace Creator': (x) => 'Upload more GPS traces through OSM',
    'JOSM User': (x) => 'Use JSOM to map an area',
    'Long & Winding Road': (x) => `Add ${x} km of roads.`,
    'Long & Winding Road Maintainer': (x) => `Modify ${x} km of roads.`,
    'Mapathoner': (x) => `Participate in ${x} in a row.`,
    'Node Builder': (x) => `Add ${x} nodes.`,
    'Waterway Creator': (x) => `Add ${x} km of waterways`,
    'World Renown': (x) => `Map in ${x} different countries`,
    'Year-long Mapper': (x) => `Map ${x} days.`,
    'Point Creator': (x) => `Add ${x} points of interests`
  };
  return map[badge](x);
}
module.exports.descriptions = mapBadgeToDescrip;

// Strips whitespace
function stripWS (text) {
  return text.replace(/ /g, '');
}

export default (props) => {
  var badges = R.compose(
    R.uniqBy(R.prop('name')),
    R.reverse,
    R.sortBy(R.prop('level'))
  )(props.badges);

  if (!props.progress.all) {
    return <div>Loading...</div>;
  }

  var list = badges.map((badge) => {
    return (
      <li key={stripWS(badge.name)}>
        <div className = "badge-home">

          <div className = "badge-Details">
            <div className = "sub-head">
              {badge.name}
            </div>
            <div className = "badge-Description">
              <div className = "line-break"></div>
              {mapBadgeToDescrip(badge.name)}
            </div>
          </div>
        </div>
      </li>
    );
  });
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // This step should not need to be in here. Ideally, numeric ID would
  // be served by the API for the badge progress sub-object.
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  var idLookup = {
    roads: 1, roadMods: 2, pois: 3, buildings: 4, gpsTraces: 5, roadKms: 6,
    roadKmMods: 7, waterways: 8, countries: 9, tasks: 10, taskEdits: 11,
    josm: 12, hashtags: 13, daysInRow: 14, daysTotal: 15, hotProjects: 16,
    rcProjects: 17, msfProjects: 18
  };

  var progressBadges = Object.keys(props.progress.all).map(function (val) {
    var badge = props.progress.all[val];

    return {
      description: mapBadgeToDescrip(badge.name),
      progress: Math.floor(badge.points.percentage) + '% of the way to level ' + badge.nextBadgeLevel + '. ' +
        mapBadgeToTask(badge.name, Math.floor(badge.points.nextPoints - badge.points.currentPoints)),
      name: badge.name,
      category: idLookup[val],
      level: badge.badgeLevel,
      points: badge.points

    };
  });

  var progressList = progressBadges.map((badge) => {
    return (
      <li key={stripWS(badge.name)}>
        <div className = "badge-home">
          <Badge badge={badge}/>
          <div className = "badge-Details">
            <div className = "sub-head">
              {badge.name}
            </div>
            <div className = "badge-Description">
              <div className = "line-break"></div>
              {badge.description}
            </div>
            <div className = "badge-Description">
              {badge.progress}
            </div>
          </div>
        </div>
      </li>
    );
  });
  return (
    <div>
      <div id = "Badge-Container">
        <div className = "Badge-Box-Content">
          <div className = "badgeroll-frame">
            <div className = "badgeroll-center">
              <div className = "Card-title">
                EARNED BADGES
              </div>
              <ul className = "Badge-Roll">
                {list}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div id = "Badge-Container">
        <div className = "Badge-Box-Content">
          <div className = "badgeroll-frame">
            <div className = "badgeroll-center">
              <div className = "Card-title">
                BADGE PROGRESS
              </div>
              <ul className = "Badge-Roll">
                {progressList}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
