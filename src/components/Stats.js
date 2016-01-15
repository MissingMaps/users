import React from 'react';

export default (data) => {
	console.log(data.data.name);
  return (
    <div id = "Stats-Container">
      <div className = "Card">
		<div className = "Card-title">{data.data.name}'s Statistics</div>
      </div>
    </div>
  );
};
