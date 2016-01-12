import React from 'react';

function stripWS (text) {
  return text.replace(/ /g, '');
}

export default function QuickStatsBox (props) {
	console.log(props);
  var list = Object.keys(props.badges).map((badge) => {
    console.log(props);
    return (
      <li key={stripWS(badge)}>
      </li>
    );
  });
  return (
    <div className = "Quick-User-Stats-Container">
      <div className = "badgeheader">
        Quick Stats
      </div>
      <div className = "Quick-User-Stats-Content">
      </div>
    </div>
  );
}
