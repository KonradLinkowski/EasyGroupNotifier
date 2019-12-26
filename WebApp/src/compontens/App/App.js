import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { LoginPage } from '../Pages/Login/Login';
import { HomePage } from '../Pages/Home/Home';

import * as ROUTES from '../../services/Routes';
import { withSession } from '../../services/withSession';
import { NotFound } from '../Pages/NotFound/NotFound';

const AppBase = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.LOGIN} component={LoginPage} />
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export const App = withSession(AppBase);
