import React from 'react';
import {Link, IndexLink} from 'react-router';

export default (props) => {
  return (
    <div id = "Subhead-Container">
      <div id = "Subhead-Content">
        <div className = "ProfilePicture">
          <img src="assets/graphics/circle.svg" width="120px"></img>
        </div>
        <div className = "Username titleheader">
          {props.username} <img src="assets/graphics/twitter.svg"></img>
        </div>
        <div className = "Subhead-Nav">
          <IndexLink to={`/${props.username}`}>Overview</IndexLink>
          <Link to={`/${props.username}/badges`}>Badges</Link>
          <Link to={`/${props.username}/stats`}>Stats</Link>
        </div>
      </div>
    </div>
  );
};
