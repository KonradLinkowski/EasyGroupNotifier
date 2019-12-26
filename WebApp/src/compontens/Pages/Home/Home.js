import React from 'react';
import { compose } from 'recompose';

import { withFirebase } from '../../../services/FirebaseContext';
import { withAuthorization } from '../../../services/withAuthorization';
import * as ROUTES from '../../../services/Routes';


class Home extends React.Component {
  logout = () => {
    this.props.firebase.doSignOut()
    .then(() => {
      this.props.history.push(ROUTES.LOGIN);
    });
  }

  render() {
    return (
      <div>
        <h1>Home Page</h1>
        <p>The Home Page is accessible by every signed in user.</p>
        <button onClick={this.logout}>Logout</button>
      </div>
    );
  }
}

export const HomePage = compose(
  withAuthorization,
  withFirebase
)(Home);
