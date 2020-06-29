import React from 'react';
import { Route } from 'react-router';

import { AuthContainer } from './routes/root';
import { CallbackContainer } from './routes/callback';

import { AppRoutes } from '../../constants/appRoutes';

export const Auth = () => (
  <React.Fragment>
    <Route exact path={AppRoutes.Auth} component={ AuthContainer } />
    <Route path={AppRoutes.AuthCallback} component={ CallbackContainer } />
  </React.Fragment>
);

