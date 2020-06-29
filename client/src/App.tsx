import React from 'react';
import { AppProvider } from '@8base/react-sdk';
import { Auth, AUTH_STRATEGIES } from '@8base/auth';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import { ProtectedRoute } from './components/protectedRoute';
import { Auth as AuthCallback } from './routes/auth';
import { Container } from './components/container';
import { Products } from './routes/products';

import { AppRoutes } from './constants/appRoutes';

const { REACT_APP_8BASE_API_ENDPOINT } = process.env;

const AUTH0_CLIENT_ID = 'qGHZVu5CxY5klivm28OPLjopvsYp0baD';
const AUTH0_CLIENT_DOMAIN = 'auth.8base.com';


const authClient = Auth.createClient({
  strategy: AUTH_STRATEGIES.WEB_AUTH0,
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
      uri={REACT_APP_8BASE_API_ENDPOINT || 'https://api.8base.com/ckbwbopka000207lc1df40fl9'}
      authClient={authClient}
      onRequestSuccess={() => {}}
      onRequestError={() => {}}
    >
      {({ loading }) => {
        if (loading) {
          return <p>Please wait...</p>
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
