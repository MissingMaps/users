import React from 'react';

export default React.createClass({
  getInitialState: function () {
    var badge = this.props.badge;
    return {
      badgeUrl: 'url(assets/graphics/badges/' +
                 badge.category + '-' + (badge.level) + '-graphic.svg)',
      borderUrl: 'url(assets/graphics/badges/border' + badge.level + '.svg)'
    };
  },

  getImgUrl: function (category, level) {
    return 'url(assets/graphics/badges/' + category + '-' + (level + 1) + '-graphic.svg)';
  },
  render: function () {
    return (
      <div>
        <div
          className="Badge-Completed"
          style={{backgroundImage: this.state.badgeUrl}}>
        </div>
        <div
          className="Badge-Border"
          style={{backgroundImage: this.state.borderUrl}}>
        </div>
      </div>
    );
  }
});
