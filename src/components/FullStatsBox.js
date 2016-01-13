import ContributionBox from '../components/ContributionBox.js';
import React from 'react';

export default (props) => {
  console.log(props);
  return (
	<div>
		<div id = "MapContainer">
			<div className = "Block-header">
				Map of Contributions
			</div>
			<div className = "MapContent">
				{props.stats.building_count}
			</div>
		</div>
		<div id = "NumberContainer">
			<div className = "Block-header">
				Statistics
			</div>
			<div className = "NumberContent">
			</div>
		</div>
		<ContributionBox />
    </div>
  );
};
