import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
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
      fetch('http://missingmaps-api.devseed.com/users')
      .then(function (response) {
        if (response.status >= 400) {
          throw new Error('Bad response');
        }
        return response.json();
      })
      .then(function (users) {
        users = users.map(function (obj) {
          return {name: obj.name.toLowerCase(), id: obj.id};
        });
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
      console.log(suggestion.startsWith(input.toLowerCase()))
      return suggestion.startsWith(input.toLowerCase());
    }));
  },
  onSubmit: function (input) {
    var user = R.find(R.propEq('name', input.toLowerCase()))(this.state.users);
    this.props.history.push('/' + user.id);
  },

  render: function () {
    return (
      <div>
      <Header />
        <div className = "Search-Container">
          <div className = "Search-Box">
            <img src="assets/graphics/test.svg" width = "150px"></img>
            <div className = "Search-Content">
              <SearchBar
                placeholder="Search for OSM user"
                onChange={this.onChange}
                onSubmit={this.onSubmit} />
              </div>
            </div>
        </div>
        <Footer />
      </div>
    );
  }
});

