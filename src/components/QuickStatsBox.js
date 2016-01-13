import React from 'react';

export default function QuickStatsBox (props) {
  return (
    <div className = "Quick-User-Stats-Container">
      <div className = "badgeheader">
        Quick Stats
      </div>
      <div className = "Quick-User-Stats-Content">
		<div className = "centerme">
			<div className = "Quick-User-Stats-Block">
				<p><h1>Buildings </h1>{props.badges.building_count}</p>
				<p><h1></h1></p>
			</div>
			<div className = "Quick-User-Stats-Block">
				<p><h1>Road Count </h1>{props.badges.road_count}</p>
				<p><h1>km of Roads </h1>{props.badges.road_km}</p>
			</div>
			<div className = "Quick-User-Stats-Block">
				<p><h1>Waterway </h1>{props.badges.waterway_km}</p>
				<p><h1>km of Waterways </h1>{props.badges.waterway_count}</p>
			</div>
			<div className = "Quick-User-Stats-Block">
				<p><h1>Country Last Mapped </h1>{props.badges.countries}</p>
				<p><h1>Recent Hashtags</h1></p>
			</div>
		</div>
      </div>
    </div>
  );
}
