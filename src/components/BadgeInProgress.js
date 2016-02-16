import React from 'react';

export default React.createClass({
  getInitialState: function () {
    var badge = this.props.badge;
    return {
      imgUrl: 'url(assets/graphics/badges/' +
               badge.category + '-' + (badge.badgeLevel + 1) + '-graphic.svg)',
      progressBreaks: this.getProgressGradientBreaks(badge.points.percentage),
      badgeClass: this.props.badgeClass,
      badgeDescription: badge.description,
      hidden: true
    };
  },
  mouseOver: function () {
    this.setState({hidden: false});
  },
  mouseOut: function () {
    this.setState({hidden: true});
  },
  getProgressGradientBreaks: function (percentage) {
    // Calculates the linear-gradient breakpoint angles necessary to
    // represent progress percentage
    var breakA = 90;
    var breakB = 90;
    if (percentage < 50) {
      breakB = 90 + percentage * 3.6;
      return {A: breakA, B: breakB, dependantGrad: '#dbdbda'};
    }
    breakA = -90 + (percentage - 50) * 3.6;
    breakB = 270;
    return {A: breakA, B: breakB, dependantGrad: '#fef387'};
  },
  render: function () {
    var progressStyle = 'linear-gradient(' + this.state.progressBreaks.A +
                        'deg, ' + this.state.progressBreaks.dependantGrad +
                        ' 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)),' +
                        'linear-gradient(' + this.state.progressBreaks.B +
                        'deg, #fef387 50%, #dbdbda 50%, #dbdbda)';
    var popup = '';
    if (this.state.badgeClass === 'progress') {
      popup = (
        <div className={'Badge-Popup' + (this.state.hidden ? ' hidden' : '')} >
          {this.state.badgeDescription}
        </div>
      );
    }
    return (
      <div
        className={'Badge ' + this.state.badgeClass}
        style={{backgroundImage: progressStyle}}
        onMouseOver={this.mouseOver}
        onMouseOut={this.mouseOut}>
        {popup}
        <div
          className={'Badge-Interior ' + this.state.badgeClass}
          style={{backgroundImage: this.state.imgUrl}}>
        </div>
      </div>
    );
  }
});
