import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import ContributionBox from '../components/ContributionBox.js';
import React from 'react';

export default (data) => {
  const position = [51.505, -0.09];

	var str = "Hello World!";
	var res = str.toUpperCase();

  return (
    <div id = "Stats-Container">
      <div className = "Card">
		<div className = "Card-title">{data.data.name}''s Statistics</div>
		<div className = "Card-Content">
			<div className = "Split-3">
				<div className = "Card-Content Split-Content">
					<div className = "Card-Section-Title">
					PROJECTS CONTRIBUTED TO
					</div>
					<table className = "table-curve">
						<tr>
							<th>Project Hashtag</th>
							<th>Edits</th>
						</tr>
						<tr>
							<td>#MissingMaps</td>
							<td>94</td>
						</tr>
						<tr>
							<td>#JapanRoadBuilding</td>
							<td>110</td>
						</tr>
						<tr>
							<td>#HOTtask910</td>
							<td>10</td>
						</tr>
						<tr>
							<td>#OGPMapping</td>
							<td>30</td>
						</tr>
					</table>
				</div>
			</div>
			<div className = "Split-3">
				<div className = "Card-Content Split-Content">
					<div className = "Card-Section-Title">
					BY THE NUMBERS
					</div>
					<table className = "table-curve">
						<tr>
							<td>Buildings added</td>
							<td>50</td>
						</tr>
						<tr>
							<td>Roads Added</td>
							<td>94</td>
						</tr>
						<tr>
							<td>km of Roads Added</td>
							<td>110 km</td>
						</tr>
						<tr>
							<td>km of Waterways Added</td>
							<td>10 km</td>
						</tr>
						<tr>
							<td>Point of Interests Added</td>
							<td>30</td>
						</tr>
					</table>
				</div>
			</div>
			<div className = "Split-3">
				<div className = "Card-Content Split-Content">
					<div className = "Card-Section-Title">
					Edits by Type
					</div>
				</div>
			</div>
		</div>
    <ContributionBox timestamps={data.data.edit_times} />
			<div id = "MapContainer">
			</div>
		</div>
    </div>
  );
};
