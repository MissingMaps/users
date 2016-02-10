import React from 'react';

export default React.createClass({
  getInitialState: function () {
    var badgeUrl = '';
    var borderUrl = '';
    var badge = this.props.badge;
    if (!badge) {
      badgeUrl = 'url(assets/graphics/badges/blank-graphic.svg)';
      borderUrl = 'url(assets/graphics/badges/blank-border.svg)';
    } else {
      badgeUrl = 'url(assets/graphics/badges/' +
                  badge.category + '-' + (badge.level) + '-graphic.svg)';
      borderUrl = 'url(assets/graphics/badges/border' + badge.level + '.svg)';
    }
    var badgeClass = this.props.badgeClass;
    return {
      badgeUrl: badgeUrl,
      borderUrl: borderUrl,
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
