import React from 'react';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import SearchBar from 'react-search-bar';

export default React.createClass({
  getInitialState: function () {
    return {
      users: [
        'leo',
        'bill',
        'barbara',
        'christine',
        'allie',
        'lucille',
        'glenn',
        'jeanette',
        'madge',
        'winifred']
    };
  },
  onChange: function (input, resolve) {
    resolve(this.state.users.filter((suggestion) => {
      return suggestion.toLowerCase().startsWith(input.toLowerCase());
    }));
  },
  onSubmit: function (input) {
    this.props.history.push('/' + input);
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

