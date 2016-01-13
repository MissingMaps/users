import React from 'react';

function mapBadgeToImage (badge) {
  var map = {
    'Road Builder': 'assets/graphics/test.svg',
    'Building Builder': 'assets/graphics/test.svg',
    'Consistentency': 'assets/graphics/test2.svg',
    'GPS trace Creator': 'assets/graphics/test3.svg',
    'JOSM User': 'assets/graphics/test.svg',
    'Long & Winding Road': 'assets/graphics/test2.svg',
    'Mapathoner': '/assets/graphics/test3.svg',
    'Node Builder': '/assets/graphics/test.svg',
    'TaskMan Scrutinizer': '/assets/graphics/test3.svg',
    'TaskMan Square Champion': '/assets/graphics/test.svg',
    'Waterway Creator': '/assets/graphics/test2.svg',
    'World Renown': '/assets/graphics/test3.svg',
    'Year long Mapper': '/assets/graphics/test3.svg'
  };
  return map[badge];
}

function mapBadgeToDescrip (badge) {
  var map = {
    'Road Builder': 'Wowie zomie bam sham!',
    'Building Builder': 'Built 15 buildings',
    'Consistentency': 'Mapped every day, wow!',
    'GPS trace Creator': 'Traced some real good GPS imagery',
    'JOSM User': 'Used JSOM to map an area',
    'Long & Winding Road': 'Mapping many, many roads.',
    'Mapathoner': 'Just cant stop mapping- mapped 10 days in a row.',
    'Node Builder': 'Wrote a truckful of nodes.',
    'TaskMan Scrutinizer': 'Scrutinize tasks with the vigilance of a nun with a ruler',
    'TaskMan Square Champion': 'Mapped squares like it was in fashion- 10 to be percise.',
    'Waterway Creator': 'A regular mapping Poseidian, lord of these open waters.',
    'World Renown': 'No land is outside your watchful gaze. Mapped in each continent.',
    'Year long Mapper': 'Wow maps so much'
  };
  return map[badge];
}

// Strips whitespace
function stripWS (text) {
  return text.replace(/ /g, '');
}

export default (props) => {
  var list = Object.keys(props.badges).map((badge) => {
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
  return (
    <div id = "Badge-Container">
      <div className = "badgeheader">
        Earned Badges
      </div>
      <div className = "Badge-Box-Content">
        <ul className = "Badge-Roll">
          {list}
        </ul>
      </div>
    </div>
  );
};
