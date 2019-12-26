import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { AuthContext } from './AuthContext';
import { withFirebase } from './FirebaseContext';
import * as ROUTES from './Routes';

export const withAuthorization = Component => {
  class WithAuthorization extends React.Component {
    componentDidMount() {
      this.listener = this.props.firebase.onAuthUserListener(
        authUser => {
          const isLoggedIn = Boolean(authUser);
          if (!isLoggedIn) {
            this.props.history.push(ROUTES.LOGIN);
          }
        },
        () => this.props.history.push(ROUTES.LOGIN),
      );
    }

    componentWillUnmount() {
      this.listener();
      delete this.listener;
    }

    render() {
      return (
        <AuthContext.Consumer>
          { authUser => Boolean(authUser) ? <Component {...this.props} /> : null }
        </AuthContext.Consumer>
      );
    }
  }

  return compose(
    withRouter,
    withFirebase,
  )(WithAuthorization);
};
