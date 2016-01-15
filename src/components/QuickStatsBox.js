import React from 'react';

export default function QuickStatsBox (props) {
  return (
    <div className = "Quick-User-Stats-Container">
      <div className = "Block-header">
        Quick Stats
      </div>
      <div className = "Quick-User-Stats-Content">
		<div className = "Quick-User-Stats-Block">
			<h1>1,002,140</h1>
			<h2>Total Edits</h2>
		</div>
		<div className = "Quick-User-Stats-Block">
			<p>{props.badges.road_count} <b>of roads</b></p>
			<p>{props.badges.road_km} <b>km of roads</b></p>
			<p>{props.badges.countries} <b>Last Country mapped</b></p>
		</div>
		<div className = "Quick-User-Stats-Block">
			<p>Most recent project contributed to:</p>
			<p>#JapanRoadImprovement</p>
		</div>
      </div>
    </div>
  );
}
