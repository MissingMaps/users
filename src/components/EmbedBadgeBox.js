
import React from 'react';
import R from 'ramda';
import {Link} from 'react-router';
import BadgeCompleted from '../components/BadgeCompleted.js';

function mapBadgeToDescrip (badge) {
  var map = {
    'On The Road Again': 'Transportation matters. Put communities on the map by creating new roads. Each new level achieved by creating new roads.',
    'Long and Winding Road': 'Roads need maintainence. Existing roads are replaced by new roads and they need to be updated. Each new level achieved by editing existing roads.',
    'The Wright Stuff': 'Frank Lloyd Wright knew buildings, and so do you. Each new level is achieved by mapping and editing buildings.',
    'Consistency': 'Great mappers map everyday. Edit for a consecutive numbers of days in a month to achieve new levels.',
    'Awesome JOSM': 'JOSM is a tool used to edit OpenStreetMap. It is particularly useful for mapping larger areas more quickly and contains many additional, advanced tools. Map using JOSM to achieve this badge.',
    'Mapathoner': 'Mapathons are entry points to mapping. They also provide structure to train and become a better mapper. Each new level is achieved by attending and participating in mapathons.',
    'On Point': 'Places of interest guide where you can go. Every community needs hospitals, schools, businesses mapped to enable access. Each new level is achieved by creating new places on the map.',
    'White Water Rafting': 'Waterways, rivers, streams and more. Adding water features to the map adds regional context and valuable information in the event of flooding. Add these features to reach new levels of this badge.',
    'World Renown': 'You are famous around the globe. The more you edit in new countries, the more you can become world renown. Each new level is achieved by mapping in new countries around the world.',
    'Year-long Mapper': 'Map early, map often. Map as many days as you can to achieve new levels.',
    'Task Champion': 'Champions finish their work. Every task in the Tasking Manager needs to be finshed. Each new level is achieved by completing additional Tasking Manager squares.',
    'Scrutinizer': 'QA creates great products. Every square in the Tasking Manager needs to be validated. Each new level is achieved by validating new squares in the Tasking Manager.',
    'High Standards': 'Some maps need a bit more work to shine. Good QA demands an eye for detail and an uncompromising expectation of quality. Each new level is achieved by invalidating squares in the Tasking Manager.'
  };
  return map[badge];
}

function mapBadgeToTask (badge, x) {
  var map = {
    'On The Road Again': (x) => `Add ${x} more km of roads.`,
    'Long and Winding Road': (x) => `Modify ${x} more km of roads.`,
    'The Wright Stuff': (x) => `Build ${x} more buildings.`,
    'Consistency': (x) => `Map ${x} more consecutive days.`,
    'Awesome JOSM': (x) => `Use JOSM to map an area ${x} more times.`,
    'Mapathoner': (x) => `Participate in ${x} more mapathons.`,
    'On Point': (x) => `Add ${x} more nodes.`,
    'White Water Rafting': (x) => `Add ${x} more km of waterways.`,
    'World Renown': (x) => `Map in ${x} more different countries.`,
    'Year-long Mapper': (x) => `Map ${x} more days in total.`,
    'Task Champion': (x) => `Complete ${x} more HOTOSM tasks.`,
    'Scrutinizer': (x) => `Validate ${x} more HOTOSM tasks.`,
    'High Standards': (x) => `Invalidate ${x} more HOTOSM tasks.`
  };
  return map[badge](x);
}
module.exports.descriptions = mapBadgeToDescrip;

// Strips whitespace
function stripWS (text) {
  return text.replace(/ /g, '');
}

export default (props) => {
  // Display loading message while props not ready
  if (!props.progress.all) return <div>Loading...</div>;

  // Front-end fix for Mapathoner badge
  // Push Mapathoner badge to earned category when applicable
  const mapathonerBadge = props.progress.all.hashtags;
  if (mapathonerBadge && mapathonerBadge.badgeLevel > 0) {
    props.badges.push({
      category: mapathonerBadge.category,
      id: 36 + mapathonerBadge.badgeLevel,
      level: mapathonerBadge.badgeLevel,
      name: mapathonerBadge.name
    });
  }

  // Remove duplicate badges, keep only the highest level earned
  var badges = R.compose(
    R.uniqBy(R.prop('name')),
    R.reverse,
    R.sortBy(R.prop('level'))
  )(props.badges);

  var list = badges.map((badge) => {
    return (
      <li key={stripWS(badge.name)}>
        <div className = "badge-home">
        <Link to={`/${props.userName}/badges`} >
          <div className = "badge-contain">
           <BadgeCompleted badge={badge}/>
          </div>
        </Link>
          <div className = "badge-Details">
            <div className = "sub-head">
              {badge.name}
            </div>
            <div className = "badge-Description">
              <div className = "line-break"></div>
            </div>
          </div>
        </div>
      </li>
    );
  });

  var badgeCheck = '';
  if (list.length) badgeCheck = BadgeContainer();
  function BadgeContainer () {
    return (
      <div id = "Badge-Container">
        <div className = "Badge-Box-Content BadgeChecker">
          <div className = "badgeroll-frame">
            <div className = "badgeroll-center-push">
                <ul className = "Badge-Roll">
                  {list}
                </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {badgeCheck}
    </div>
  );
};
