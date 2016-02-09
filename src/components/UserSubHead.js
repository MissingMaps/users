import React from 'react';
import {Link, IndexLink} from 'react-router';

export default (props) => {
  return (
    <div>
      <div id = "Subhead-Container">
        <div id = "Subhead-Content">
          <div className = "ProfilePicture">
            <img src="assets/graphics/dummy.svg" width="120px"></img>
          </div>
          <div className = "Username title">
            {props.user.name}
            <p>Mapping Maestro</p>
          </div>
          <div className = "Subhead-Nav">
            <IndexLink to={`/${props.user.id}`} activeClassName="activeLink">Overview</IndexLink>
            <Link to={`/${props.user.id}/badges`} activeClassName="activeLink">Badges</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
