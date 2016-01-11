import React from 'react';
import fetch from 'isomorphic-fetch';
import BadgeBox from '../components/BadgeBox.js';

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
    return <BadgeBox badges={this.state.badges} />;
  }
});
