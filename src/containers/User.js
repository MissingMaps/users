import React from 'react';
import BadgeBox from '../components/BadgeBox';
import fetch from 'isomorphic-fetch';

export default React.createClass({
  getInitialState: function () {
    return {
      badges: []
    };
  },
  componentDidMount: function () {
    let component = this;
    if (process.env.NODE_ENV === 'development') {
      fetch('/test/fixtures/db.json')
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error('Bad response');
        }
        return response.json();
      })
      .then(function (db) {
        if (component.isMounted()) {
          component.setState(db);
        }
      });
    }
  },
  render: function () {
    return (
      <div>
      	<div id = "User-Container">
      		<div id = "Subhead-Container">
      			<div id = "Subhead-Content">
	      			<div className = "ProfilePicture">
	      				<img src="assets/graphics/circle.svg" width="150px"></img>
	      			</div>
	      			<div className = "Username">
	      				{this.props.params.id} twitr
	      			</div>
	      			<div className = "Subhead-Nav">
	      				<a href="">Badges</a>
	      				<a href="">Stats</a>
	      			</div>
	      		</div>
      		</div>
      		<div id = "Main-User-Container">
      			<div className = "Recent-Badges-Container">
      			</div>
      			<div className = "Quick-User-Stats-Container">
      			</div>
      			<div className = "Contribute-Timeline-Container">
      			</div>
      		</div>
	        <BadgeBox badges={this.state.badges} />
	    </div>
      </div>
    );
  }
});
