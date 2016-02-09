import React from 'react';
import R from 'ramda';
import { getBadgeProgress } from '../badge_logic/badge_cruncher.js';
import { descriptions } from '../components/FullBadgeBox.js';

export default (props) => {
  var progress = getBadgeProgress(props.data);
  var mostAttainableBadge = progress.mostAttainable;
  return (
      <div className = "Split">
        <div className = "descriptor">Upcoming Badges</div>
        <div className = "Upcoming-Badges-Box">
          <img src= 'assets/graphics/test2.svg' width= "75px"></img>
          <img src= 'assets/graphics/test2.svg' width= "75px"></img>
          <div className = "See-More-Badges">+</div>
        </div>
        <div className = "descriptor">Possible Projects</div>
        <div className = "button invert-btn-grn">Trending Hashtags</div>
          {
            // This should be changed to grabbing from hashtags endpoint
            // and not the users hashtags
            R.take(2, Object.keys(props.data.hashtags)).map(function (hashtag) {
              return <p key={hashtag}>#{hashtag}</p>;
            })
          }
      </div>
  );
};
