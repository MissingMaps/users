import React from 'react';
import R from 'ramda';
import {getBadgeProgress} from '../badge_logic/badge_cruncher.js';
import BadgeInProgress from '../components/BadgeInProgress.js';

export default (props) => {
  var progress = getBadgeProgress(props.data);
  var mostObtainableBadges = progress.mostAttainable;
  return (
      <div className = "Split split-smbadges">
        <div className = "descriptor">Upcoming Badges</div>
        <div className = "Upcoming-Badges-Box">
          <BadgeInProgress badge={mostObtainableBadges[0]} badgeClass={'upcoming'}/>
          <BadgeInProgress badge={mostObtainableBadges[1]} badgeClass={'upcoming'}/>
          <div className = "See-More-Badges">+</div>
        </div>
        <div className="block-contribute">
          <p className="side-text">Up your badge game by continuing to contribute.</p>
          <div className = "button invert-btn-grn">Contribute Now</div>
        </div>
      </div>
  );
};
