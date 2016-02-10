import React from 'react';

export default React.createClass({
  getInitialState: function () {
    var badge = this.props.badge;
    var badgeClass = this.props.badgeClass;
    return {
      badgeUrl: 'url(assets/graphics/badges/' +
                 badge.category + '-' + (badge.level) + '-graphic.svg)',
      borderUrl: 'url(assets/graphics/badges/border' + badge.level + '.svg)',
      badgeClass: (typeof badgeClass === 'undefined') ? '' : badgeClass
    };
  },
  render: function () {
    return (
      <div>
        <div
          className={'Badge-Completed ' + this.state.badgeClass}
          style={{backgroundImage: this.state.badgeUrl}}>
        </div>
        <div
          className={'Badge-Border ' + this.state.badgeClass}
          style={{backgroundImage: this.state.borderUrl}}>
        </div>
      </div>
    );
  }
});
