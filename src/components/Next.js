import React from 'react';
import R from 'ramda';
import { getBadgeProgress } from '../badge_logic/badge_cruncher.js';

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
          <p>You're close to earning our _______ badge!</p>
          <p>Here are some projects you can help to earn it.</p>
        </div>
        <div className = "Card-Textbox">
          <div className = "Card-Section-Title">
          TRENDING PROJECTS
          </div>
          {
            // This should be changed to grabbing from hashtags endpoint
            // and not the users hashtags
            R.take(3, Object.keys(props.data.hashtags)).map(function (hashtag) {
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
          <img src="assets/graphics/test2.svg" width = "100px"></img>
          </div>
          <div className = "Card-Badge-Name">
          Get HOT mapping all volcanoes in the world
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};
