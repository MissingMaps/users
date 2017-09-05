import React from 'react';
import moment from 'moment';

export default (props) => {
  if (!props.data) { return <div>Loading...<div></div></div>; }

  var data = props.data;
  var latest = data.latest;
  var latestTotal = Number(latest.road_count_add) +
    Number(latest.road_count_mod) +
    Number(latest.building_count_add) +
    Number(latest.building_count_mod) +
    Number(latest.waterway_count_add) +
    Number(latest.poi_count_add);

  var last_edit_time = latest.created_at;
  var last_edit_day = moment(last_edit_time).format('dddd');
  var last_edit_minutes = moment(last_edit_time).format('h:mm');
  var is_plural = '';

  test_plural(latestTotal);

  function test_plural (num) {
    if (num === 1) {
      is_plural = '';
    } else {
      is_plural = 's';
    }
  }

  return (
    <div className = "Split split-stats">
      <div className = "sub-section">
        <h3 className = "descriptor">Latest Edit</h3>
        <div className = "Recent-Edit-Box">
          <span className = "EmphasizedNumber">{latestTotal.toLocaleString()}</span>
          <div className = "Recent-Edit-Sidebar">
            <p>edit{is_plural} made</p>
            <p>{last_edit_day} at {last_edit_minutes}</p>
            <p>#{data.latest.hashtags[0].hashtag}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
