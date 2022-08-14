// ./react-redux-client/src/routes.js
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Home from './containers/Home';
import Login from './containers/Login';
import Register from './containers/Register';
import Expenses from './containers/Expenses';
import Report_c from './containers/Report_c';
import Report_s from './containers/Report_s';
import Report_s_Detail from './containers/Report_s_Detail';

import { withBasename } from './utils/params';

export default (
  <Route path={ withBasename('/') } component={App}>
     <IndexRoute component={Home} />
     <Route path={ withBasename('/login') } component={Login} />
     <Route path={ withBasename('/register') } component={Register} />
     <Route path={ withBasename('/Expenses') } component={Expenses} />
     <Route path={ withBasename('/report_s') } component={Report_s} />
     <Route path={ withBasename('/report_s/:id') } component={Report_s_Detail} />
     <Route path={ withBasename('/report_c/:cat') } component={Report_c} />
  </Route>
)
