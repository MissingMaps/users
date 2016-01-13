import React from 'react';

export default (props) => {
  console.log(props);
  return (
    <div id = "Badge-Container">
      {props.stats.building_count}
    </div>
  );
};
