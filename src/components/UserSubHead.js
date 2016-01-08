import React from 'react';

export default (username) => {
  return(
	<div id = "Subhead-Container">
		<div id = "Subhead-Content">
			<div className = "ProfilePicture">
				<img src="assets/graphics/circle.svg" width="120px"></img>
			</div>
			<div className = "Username titleheader">
				{username.username} <img src="assets/graphics/twitter.svg"></img>
			</div>
			<div className = "Subhead-Nav">
				<a href="">Overview</a>
				<a href="">Badges</a>
				<a href="">Stats</a>
			</div>
		</div>
	</div>
  );
};