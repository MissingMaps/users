import React from 'react';
import R from 'ramda';

export default (props) => {
  return (
    <div id = "Recent-Container">
      <div className = "Card">
    <div className = "Card-title">What's Next'</div>
    <div className = "Card-Content">
      <div className = "Card-Left">
        <div className = "Card-Textbox">
          <div className = "Card-Section-Title">
          Next Badge
          </div>
          <p>You''re really close to earning the ____ badge!</p>
          <p>Here are some projects you can help out with to get it!</p>
        </div>
        <div className = "Card-Textbox">
          <div className = "Card-Section-Title">
          Trending Projects
          </div>
          {
            // This should be changed to grabbing from hashtags endpoint
            // and not the users hashtags
            R.take(3, props.data.hashtags).map(function (hashtag) {
              return <p>#{hashtag}</p>;
            })
          }
        </div>
      </div>
      <div className = "Card-Right">
        <div className = "Card-Textbox">
          <div className = "Card-Section-Title">
          Next Badge...
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
