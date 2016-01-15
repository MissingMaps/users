import React from 'react';

export default (data) => {
  return (
    <div id = "Recent-Container">
      <div className = "Card">
    <div className = "Card-title">What's Next</div>
    <div className = "Card-Content">
      <div className = "Card-Left">
        <div className = "Card-Textbox">
          <div className = "Card-Section-Title">
          UPCOMING
          </div>
          <p>You're close to earning our _______ badge!</p>
          <p>Here are some projects you can help to earn it.</p>
        </div>
        <div className = "Card-Textbox">
          <div className = "Card-Section-Title">
          TRENDING PROJECTS
          </div>
          <p>#JapanRoadImrovement</p>
          <p>#ChineseWaterwayFix</p>
          <p>#KoreanBuildingBuild</p>
        </div>
      </div>
      <div className = "Card-Right">
        <div className = "Card-Textbox">
          <div className = "Card-Section-Title">
          NEXT BADGE...
          </div>
          <div className = "Card-Badge>">
          <img src="assets/graphics/test2.svg" width = "100px"></img>
          </div>
          <div className = "Card-Badge-Name">
          Get HOT mapping all volcanoes in the world
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
};
