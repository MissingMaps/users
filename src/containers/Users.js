import React from 'react';
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
      <SearchBar
        placeholder="Search for a user"
        onChange={this.onChange}
        onSubmit={this.onSubmit} />
    );
  }
});

