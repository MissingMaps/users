import React from 'react';
import R from 'ramda';
import { getBadgeProgress } from '../badge_logic/badge_cruncher.js';
import BadgeInProgress from '../components/BadgeInProgress.js';

export default (props) => {
  var progress = getBadgeProgress(props.data);
  var mostObtainableBadges = progress.mostAttainable;
  return (
      <div className = "Split">
        <div className = "descriptor">Upcoming Badges</div>
        <div className = "Upcoming-Badges-Box">
          <BadgeInProgress badge={mostObtainableBadges[0]} badgeClass={'upcoming'}/>
          <BadgeInProgress badge={mostObtainableBadges[1]} badgeClass={'upcoming'}/>
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
