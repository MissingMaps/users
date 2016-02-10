import React from 'react';
import BadgeCompleted from '../components/BadgeCompleted';

export default function (badge) {
  return (
    <div className = "Split">
      <div className = "descriptor centerme">Latest Badge</div>
      <div className = "Overview-Badge-Container">
        <BadgeCompleted badge={badge.badge} badgeClass='overview'/>
      </div>
    </div>
  );
}
