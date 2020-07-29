import React from 'react';
import { AppProvider } from '@8base/react-sdk';
import { Auth, AUTH_STRATEGIES } from '@8base/auth';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { ProtectedRoute } from './components/protectedRoute';
import { Auth as AuthCallback } from './routes/auth';
import { Container } from './components/container';
import { Products } from './routes/products';
import { Clients } from './routes/clients';

import { AppRoutes } from './constants/appRoutes';

const { REACT_APP_8BASE_API_ENDPOINT } = process.env;

const AUTH0_CLIENT_ID = 'jec81cExAdebbr6GOAsPf8W7cEpuCjV4';
const AUTH0_CLIENT_DOMAIN = 'secure.8base.com';


const authClient = Auth.createClient({
  strategy: AUTH_STRATEGIES.WEB_8BASE,
  subscribable: true,
}, {
  clientId: AUTH0_CLIENT_ID,
  domain: AUTH0_CLIENT_DOMAIN,
  redirectUri: `${window.location.origin}${AppRoutes.AuthCallback}`,
  logoutRedirectUri: `${window.location.origin}${AppRoutes.Auth}`,
}) as any

function App() {
  return (
    <AppProvider
      uri={REACT_APP_8BASE_API_ENDPOINT || 'https://api.8base.com/ckd5q90z6009508mh7omrg7xy'}
      authClient={authClient}
      onRequestSuccess={() => {}}
      onRequestError={() => {}}
    >
      {({ loading }) => {
        if (loading) {
          return null
        }

        return (
          <Router>
            <Switch>
              <Route path={AppRoutes.Auth} component={AuthCallback} />
              <Route>
                <Container>
                  <ProtectedRoute
                    exact
                    path={AppRoutes.Products}
                    component={Products}
                  />
                  <ProtectedRoute
                    exact
                    path={AppRoutes.Clients}
                    component={Clients}
                  />
                  <Redirect to={AppRoutes.Products} />
                </Container>
              </Route>
            </Switch>
          </Router>
        )
      }}
    </AppProvider>
  );
}

export default App;
