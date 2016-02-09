import React from 'react';

export default React.createClass({
  getInitialState: function () {
    var badge = this.props.badge;
    return {
      imgUrl: this.getImgUrl(badge.category, badge.level),
      progressBreaks: this.getProgressGradientBreaks(badge.points.percentage)
    };
  },

  getImgUrl: function (category, level) {
    return 'assets/graphics/badges' + category + '-' + level + '-graphic.svg';
  },
  getProgressGradientBreaks: function (percentage) {
    var breakA = 90;
    var breakB = 90;
    if (percentage < 50) {
      breakB = 90 + percentage * 3.6;
      return {A: breakA, B: breakB};
    }
    breakA = -90 + (percentage - 50) * 3.6;
    breakB = 270;
    return {A: breakA, B: breakB};
  },
  render: function () {
    var progStyle = 'linear-gradient(' + this.state.progressBreaks.A +
                  'deg, #dbdbda 50%, rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 0)),' +
                  'linear-gradient(' + this.state.progressBreaks.B +
                  'deg, #1E9FCC 50%, #dbdbda 50%, #dbdbda)';

    return (
      <div className="Badge" style={{backgroundImage: progStyle}}>
        <div className="Badge Interior"></div>
      </div>
    );
  }
});
