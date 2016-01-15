import React from 'react';
import R from 'ramda';

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
    'Mapathoner': '/assets/graphics/test3.svg',
    'Node Builder': '/assets/graphics/test.svg',
    'TaskMan Scrutinizer': '/assets/graphics/test3.svg',
    'TaskMan Square Champion': '/assets/graphics/test.svg',
    'Waterway Creator': '/assets/graphics/test2.svg',
    'World Renown': '/assets/graphics/test3.svg',
    'Year-long Mapper': '/assets/graphics/test3.svg',
    'Point Creator': '/assets/graphics/test3.svg'
  };
  return map[badge];
}

function mapBadgeToDescrip (badge) {
  var map = {
    'Road Builder': 'Wowie zomie bam sham!',
    'Road Maintainer': 'Maintained all the roads!',
    'Building Builder': 'Built 15 buildings',
    'Consistentency': 'Mapped every day, wow!',
    'GPS Trace Creator': 'Traced some real good GPS imagery',
    'JOSM User': 'Used JSOM to map an area',
    'Long & Winding Road': 'Mapping many, many roads.',
    'Long & Winding Road Maintainer': 'Maintaining long, long roads.',
    'Mapathoner': 'Just cant stop mapping- mapped 10 days in a row.',
    'Node Builder': 'Wrote a truckful of nodes.',
    'TaskMan Scrutinizer': 'Scrutinize tasks with the vigilance of a nun with a ruler',
    'TaskMan Square Champion': 'Mapped squares like it was in fashion- 10 to be percise.',
    'Waterway Creator': 'A regular mapping Poseidian, lord of these open waters.',
    'World Renown': 'No land is outside your watchful gaze. Mapped in each continent.',
    'Year-long Mapper': 'You are so very dedicated. You have mapped for an entire year.',
    'Point Creator': "You must really love points!"
  };
  return map[badge];
}

module.exports.descriptions = mapBadgeToDescrip;

// Strips whitespace
function stripWS (text) {
  return text.replace(/ /g, '');
}

export default (props) => {
  var badges = R.map(R.prop('name'), props.badges);
  if (!props.progress.all) {
    return <div>Loading...</div>;
  }

  var list = badges.map((badge) => {
    return (
      <li key={stripWS(badge)}>
        <div className = "badge-home">
          <img src={mapBadgeToImage(badge)} width="150px"></img>
          <div className = "badge-Details">
            <div className = "badge-Name">
              {badge}
            </div>
            <div className = "badge-Description">
              <div className = "line-break"></div>
              {mapBadgeToDescrip(badge)}
            </div>
          </div>
        </div>
      </li>
    );
  });

  var progressBadges = Object.keys(props.progress.all).map(function (val) {
    var badge = props.progress.all[val];
    return {
      'description': mapBadgeToDescrip(badge.name),
      'progress': "You're " + Math.floor(badge.points.percentage) + "% of the way to level " + badge.nextBadgeLevel,
      'name': badge.name
    }
  });

  var progressList = progressBadges.map((badge) => {
    return (
      <li key={stripWS(badge.name)}>
        <div className = "badge-home">
          <img src={mapBadgeToImage(badge.name)} width="150px"></img>
          <div className = "badge-Details">
            <div className = "badge-Name">
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
      )

  })
  return (
    <div>
      <div id = "Badge-Container">
        <div className = "Badge-Box-Content">
          <div className = "badgeroll-frame">
            <div className = "badgeroll-center card">
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
            <div className = "badgeroll-center card">
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
