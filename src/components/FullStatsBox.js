import ContributionBox from '../components/ContributionBox.js';
import React from 'react';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';

export default (props) => {
  console.log(props);

	const position = [51.505, -0.09];

  return (
	<div>
		<div id = "MapContainer">
			<div className = "Block-header">
				Map of Contributions
			</div>
			<div className = "MapContent">
				<Map center={position} zoom={2}>
					<TileLayer
					url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
				</Map>
			</div>
		</div>
		<div id = "NumberContainer">
			<div className = "Block-header">
				Statistics
			</div>
			<div className = "NumberContent">
				{props.stats.building_count}
			</div>
		</div>
	 <ContributionBox timestamps={props.times} />
   </div>
  );
};
