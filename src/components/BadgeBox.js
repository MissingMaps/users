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
      <li key={stripWS(badge)}><img src={mapBadgeToImage(badge)} width="100px"></img></li>
    );
  });
  return (
    <div className = "Recent-Badges-Container">
      <div className = "Block-header">
        Recently Earned Badges
      </div>
      <div className = "Badge-Box-Content front">
        <ul className = "Badge-Roll">
          {list}
        </ul>
      </div>
    </div>
  );
};
