import React from 'react';

export default (props) => {
  if (!props.data) { return <div>Loading...</div>; }

  var data = props.data;
  var total = Number(data.total_road_count_add) +
    Number(data.total_road_count_mod) +
    Number(data.total_building_count_add) +
    Number(data.total_building_count_mod) +
    Number(data.total_waterway_count_add) +
    Number(data.total_poi_count_add);
  var latest = data.latest;
  var last_edit_total = Number(latest.road_count_add) +
    Number(latest.road_count_mod) +
    Number(latest.building_count_add) +
    Number(latest.building_count_mod) +
    Number(latest.waterway_count_add) +
    Number(latest.poi_count_add);

  var country = data.latest.countries[0].name;
  var hashtag = data.latest.hashtags[0].hashtag;
  return (
    <div id = "Recent-Container">
      <div className = "Card">
        <div className = "Card-title">Recent Contributions</div>
        <div className = "Card-Content">
          <div className = "Card-Left">
            <div className = "Card-Textbox">
              <div className = "Card-Section-Title">
                Total Edits
              </div>
              <h3>{total}</h3>
            </div>
            <div className = "Card-Textbox">
              <div className = "Card-Section-Title">
                Last Edit
              </div>
              <p>{last_edit_total} contributions</p>
              <p>To #{hashtag}</p>
              <p>In {country}</p>
            </div>
          </div>
          <div className = "Card-Right">
            <div className = "Card-Textbox">
              <div className = "Card-Section-Title">
                Last Badge Earned
              </div>
              <div className = "Card-Badge>">
                <img src="assets/graphics/test2.svg" width = "100px"></img>
              </div>
              <div className = "Card-Badge-Name">
                {
                  (data.badges.length > 0)
                    ? data.badges[0].name
                    : <div>No badges! Go map!</div>
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  );
};
