import React from 'react';
import R from 'ramda';
import SearchBar from 'react-search-bar';

export default React.createClass({
  getInitialState: function () {
    return {
      users: [],
      names: []
    };
  },
  componentDidMount: function () {
    let component = this;
    if (process.env.NODE_ENV === 'development') {
      fetch('http://104.236.25.175:3000/users')
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error('Bad response');
        }
        return response.json();
      })
      .then(function (users) {
        var names = R.map(R.prop('name'), users);
        if (component.isMounted()) {
          component.setState({
            users: users,
            names: names
          });
        }
      });
    }
  },
  onChange: function (input, resolve) {
    resolve(this.state.names.filter((suggestion) => {
      return suggestion.toLowerCase().startsWith(input.toLowerCase());
    }));
  },
  onSubmit: function (input) {
    var user = R.find(R.propEq('name', input))(this.state.users);
    this.props.history.push('/' + user.id);
  },

  render: function () {
    return (
      <SearchBar
        placeholder="Search for a user"
        onChange={this.onChange}
        onSubmit={this.onSubmit} />
    );
  }
});

