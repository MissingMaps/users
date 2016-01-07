import React from 'react';
import UserSubHead from '../components/UserSubHead';
import BadgeBox from '../components/BadgeBox';
import QuickStatsBox from '../components/QuickStatsBox';
import ContributionBox from '../components/ContributionBox';
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
      		<div id = "Main-User-Container">
      				<UserSubHead username={this.props.params.id}/>
      				<BadgeBox badges={this.state.badges} />
      				<QuickStatsBox />
      				<ContributionBox />
      		</div>
	    </div>
      </div>
    );
  }
});