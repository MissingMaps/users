import React from 'react';

function mapBadgeToImage (badge) {
  var map = {
    "Road Builder": "assets/graphics/test.svg",
    "Consistentency": "assets/graphics/test2.svg",
    "GPS trace Creator": "assets/graphics/test3.svg",
    "JOSM User": "assets/graphics/test.svg",
    "Long & Winding Road": "assets/graphics/test2.svg",
    "Mapathoner": "/assets/graphics/test3.svg",
    "Node Builder": "/assets/graphics/test.svg",
    "Road Builder": "/assets/graphics/test2.svg",
    "TaskMan Scrutinizer": "/assets/graphics/test3.svg",
    "TaskMan Square Champion": "/assets/graphics/test.svg",
    "Waterway Creator": "/assets/graphics/test2.svg",
    "World Renown": "/assets/graphics/test3.svg",
  }
  // if (typeof map[badge] === 'undefined') {
  //   throw new Error("Badge doesn't exist!");
  // }
  return map[badge];
}

export default (props) => {
  var list = Object.keys(props.badges).map((badge) => {
    return (
        // <li key={badge}>{badge}: {props.badges[badge]}</li>
        <li><img src={mapBadgeToImage(badge)} width="100px"></img></li>
    );
  });
  return (
      <div className = "Recent-Badges-Container">
        <div className = "badgeheader">
          Recently Earned Badges
        </div>
        <div className = "Badge-Box-Content">
          <div className = "Badge-Roll">
            {list}
          </div>
        </div>
      </div>
  );
};