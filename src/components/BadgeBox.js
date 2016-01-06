import React from 'react';

export default (props) => {
  console.log(props);
  var list = Object.keys(props.badges).map((badge) => {
    return (
      <li key={badge}>{badge}: {props.badges[badge]}</li>
    );
  });
  return (
    <ul>
      {list}
    </ul>
  );
};
