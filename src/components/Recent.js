import React from 'react';
import moment from 'moment';
import {Link, IndexLink} from 'react-router';

export default (props) => {
  if (!props.data) { return <div>Loading...<div></div></div>; }

  var data = props.data;
  var total = Number(data.total_road_count_add) +
    Number(data.total_road_count_mod) +
    Number(data.total_building_count_add) +
    Number(data.total_building_count_mod) +
    Number(data.total_waterway_count_add) +
    Number(data.total_poi_count_add);

  var latest = data.latest;
  var latestTime = moment(new Date(latest.created_at))
    .format('MMM Do YY[,] h:mm:ss a');

  var last_edit_total = Number(latest.road_count_add) +
    Number(latest.road_count_mod) +
    Number(latest.building_count_add) +
    Number(latest.building_count_mod) +
    Number(latest.waterway_count_add) +
    Number(latest.poi_count_add);
  var last_edit_time = latest.created_at;
  var last_edit_day = moment(last_edit_time).format('dddd');
  var last_edit_minutes = moment(last_edit_time).format('h:mm');
  var is_plural = '';

  test_plural(last_edit_total);

  function test_plural (num) {
    if (num === 1) {
      is_plural = '';
    } else {
      is_plural = 's';
    }
  }

  var country = data.latest.countries[0].name;
  var hashtag = data.latest.hashtags[0].hashtag;

  return (
        <div className = "Split">
          <div className = "descriptor">Latest Edit</div>
          <div className = "Recent-Edit-Box">
            <div className = "EmphasizedNumber">{last_edit_total}</div>
            <div className = "Recent-Edit-Sidebar">
              <p>edit{is_plural} made</p>
              <p>{ last_edit_day } at { last_edit_minutes }</p>
              <p>#{hashtag}</p>
            </div>
          </div>
          <div className = "descriptor">Average Comparison</div>
          <div className = "Average-Comparison">
            <div className = "emphasizedText">12%</div> compared to average changeset size.
          </div>
        </div>
  );
};
