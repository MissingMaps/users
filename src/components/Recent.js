import React from 'react';

export default (data) => {
  return (
    <div id = "Recent-Container">
      <div className = "Card">
		<div className = "Card-title">RECENT CONTRIBUTIONS</div>
		<div className = "Card-Content">
			<div className = "Card-Left">
				<div className = "Card-Textbox">
					<div className = "Card-Section-Title">
					Total Edits
					</div>
					<h3>515</h3>
				</div>
				<div className = "Card-Textbox">
					<div className = "Card-Section-Title">
					Last Edit
					</div>
					<p>122 contributions</p>
					<p>To #JapanRoadImprovement</p>
					<p>In United States</p>
					<p>on 10/22/1990</p>
				</div>
			</div>
			<div className = "Card-Right">
				<div className = "Card-Textbox">
					<div className = "Card-Section-Title">
					Last Badge Earned
					</div>
					<div className = "Card-Badge>">
					<img src="assets/graphics/test2.svg" width = "100px"></img>
					</div>
					<div className = "Card-Badge-Name">
					Eskimo Hunter Badge
					</div>
				</div>
			</div>
		</div>
      </div>
    </div>
  );
};
