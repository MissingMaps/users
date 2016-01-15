import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import ContributionBox from '../components/ContributionBox.js';
import React from 'react';

export default (data) => {
  const position = [51.505, -0.09];
  return (
    <div id = "Stats-Container">
      <div className = "Card">
		<div className = "Card-title">{data.data.name}''s Statistics</div>
            <ContributionBox timestamps={data.edit_times} />
			<div id = "MapContainer">
			</div>
		</div>
    </div>
  );
};
