import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute} from 'react-router';
import createHashHistory from 'history/lib/createHashHistory';
import Users from './containers/Users';
import User from './containers/User';
import Overview from './containers/Overview.js';
import BadgeView from './containers/BadgeView.js';
import EmbedUser from './containers/EmbedUser.js';
import EmbedBadgeView from './containers/EmbedBadgeView.js';

var history = createHashHistory({
  queryKey: false
});

ReactDOM.render((
  <Router history={history}>
    <Route path="/">
      <IndexRoute component={Users} />
      <Route path=":name" component={User}>
        <IndexRoute component={Overview} />
        <Route path="/:name/badges" component={BadgeView} />
      </Route>
      <Route path="/:name/embed-badges" component={EmbedUser} >
        <IndexRoute component={EmbedBadgeView} />
      </Route>
    </Route>
  </Router>),
  document.getElementById('app')
);
