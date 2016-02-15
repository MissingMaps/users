import React from 'react';
import {getBadgeProgress} from '../badge_logic/badge_cruncher.js';
import BadgeInProgress from '../components/BadgeInProgress.js';
import {Link} from 'react-router';

export default (props) => {
  var progress = getBadgeProgress(props.data);
  var mostObtainableBadges = progress.mostAttainable;
  if (!props.hasOwnProperty('data')) {
    return <div></div>;
  }
  return (
      <div className = "Split split-smbadges">
        <div className = "descriptor">Upcoming Badges</div>
        <div className = "Upcoming-Badges-Box">
          <BadgeInProgress badge={mostObtainableBadges[0]} badgeClass={'upcoming'}/>
          <BadgeInProgress badge={mostObtainableBadges[1]} badgeClass={'upcoming'}/>
          <Link className = "See-More-Badges" to={`/${props.data.id}/badges`}>+</Link>
        </div>
        <div className="block-contribute">
          <p className="side-text">Up your badge game by continuing to contribute.</p>
          <a href="http://tasks.hotosm.org" target="_blank">
            <div className="button invert-btn-grn">
              Contribute Now
            </div>
          </a>
        </div>
      </div>
  );
};
