import React from 'react';
import R from 'ramda';
import { getBadgeProgress } from '../badge_logic/badge_cruncher.js';
import { descriptions } from '../components/FullBadgeBox.js';

export default (props) => {
  var progress = getBadgeProgress(props.data);
  var mostAttainableBadge = progress.mostAttainable;
  return (
    <div id = "Recent-Container">
      <div className = "Card">
    <div className = "Card-title">What's Next</div>
    <div className = "Card-Content">
      <div className = "Card-Left">
        <div className = "Card-Textbox">
          <div className = "Card-Section-Title">
          UPCOMING
          </div>
          <p>You''re really close to earning the {mostAttainableBadge.name} badge!</p>
          <p>Here are some projects you can help out with to get it!</p>
        </div>
        <div className = "Card-Textbox">
          <div className = "Card-Section-Title">
          TRENDING PROJECTS
          </div>
          {
            // This should be changed to grabbing from hashtags endpoint
            // and not the users hashtags
            R.take(2, Object.keys(props.data.hashtags)).map(function (hashtag) {
              return <p key={hashtag}>#{hashtag}</p>;
            })
          }
        </div>
      </div>
      <div className = "Card-Right">
        <div className = "Card-Textbox">
          <div className = "Card-Section-Title">
          NEXT BADGE...
          </div>
          <div className = "Card-Badge>">
            <div className="next-badge-overlay">
              <div className = "nextBadgeHome">
              <img src="assets/graphics/test.svg" width = "100px"></img>
              <p>{mostAttainableBadge.points.percentage}%</p>
              </div>
            </div>
          </div>
          <div className = "Card-Badge-Name">
            {descriptions(mostAttainableBadge.name)}
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};
