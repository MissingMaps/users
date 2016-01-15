import React from 'react';
import {Link, IndexLink} from 'react-router';

export default (props) => {
  return (
    <div>
      <div id = "Subhead-Container">
        <div id = "Subhead-Content">
          <div className = "ProfilePicture">
            <img src="assets/graphics/dummy.png" width="120px"></img>
          </div>
          <div className = "Username titleheader">
            {props.username}
            <p>Mapping Maestro</p>
          </div>
          <div className = "Subhead-Nav">
            <IndexLink to={`/${props.username}`}>Overview</IndexLink>
            <Link to={`/${props.username}/badges`}>Badges</Link>
          </div>
        </div>
      </div>
    </div>
  );
};
