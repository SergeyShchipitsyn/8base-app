import React from 'react';
import { omit } from 'ramda';
import { Route, Redirect } from 'react-router-dom';
import { withAuth } from '@8base/app-provider';


const renderComponent = (props: any) => {
  const { render, children, component, ...rest } = props;

  let rendered = null;

  if (component) {
    rendered = React.createElement(component, { ...rest }, children);
  }

  if (render) {
    rendered = render({ ...rest, children });
  }

  if (typeof children === 'function') {
    rendered = children(rest);
  } else if (children) {
    rendered = children;
  } else if (!rendered) {
    throw new Error('Error: must specify either a render prop, a render function as children, or a component prop.');
  }

  return rendered;
};

class ProtectedRoute extends React.Component<any> {
  renderRoute = () => {
    const {
      auth: { isAuthorized },
      ...rest
    } = this.props;

    if (isAuthorized) {
      return renderComponent(rest);
    }

    return <Redirect to={{ pathname: '/auth', state: { from: rest.location } }} />;
  };

  render() {
    const props = omit(['component', 'render'], this.props);

    return <Route {...props} render={this.renderRoute} />;
  }
};

const ProtectedRouteContainer = withAuth(ProtectedRoute);

export { ProtectedRouteContainer as ProtectedRoute };
