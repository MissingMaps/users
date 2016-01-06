import React from 'react';
import fetch from 'isomorphic-fetch';

export default React.createClass({
  componentDidMount: function () {
    if (process.env.NODE_ENV === 'development') {
      fetch('/test/fixtures/db.json')
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error('Bad response');
        }
        return response.json();
      })
      .then(function (db) {
        console.log(db);
      });
    }
  },
  render: function () {
    return (
      <div>Hello, {this.props.params.id}!</div>
    );
  }
});
