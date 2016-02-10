import React from 'react';
import R from 'ramda';
import BadgeInProgress from '../components/BadgeInProgress.js';
import BadgeCompleted from '../components/BadgeCompleted.js';

function mapBadgeToDescrip (badge) {
  var map = {
    'Road Builder': 'Map many roads across the land.',
    'Road Maintainer': 'Updated and corrected misplaced roads.',
    'Building Builder': 'Built all those buildings!',
    'Consistency': 'Mapped every day for a week!',
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
         <BadgeCompleted badge={badge} badgeClass={'progress'}/>
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

  var progressBadges = Object.keys(props.progress.all).map(function (val) {
    var badge = props.progress.all[val];

    return {
      description: mapBadgeToDescrip(badge.name),
      progress: Math.floor(badge.points.percentage) + '% of the way to level ' + badge.nextBadgeLevel + '. ' +
        mapBadgeToTask(badge.name, Math.floor(badge.points.nextPoints - badge.points.currentPoints)),
      name: badge.name,
      category: badge.category,
      badgeLevel: badge.badgeLevel,
      points: badge.points

    };
  });

  var progressList = progressBadges.map((badge) => {
    return (
      <li key={stripWS(badge.name)}>
        <div className = "badge-home">
          <BadgeInProgress badge={badge} badgeClass={'progress'}/>
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
