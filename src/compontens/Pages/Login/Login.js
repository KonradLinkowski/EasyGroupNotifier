import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../../services/FirebaseContext';
import * as ROUTES from '../../../services/Routes';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.firebase.onAuthRedirectListener()
    .then(res => {
      if (res.user) {
        this.props.history.push(ROUTES.HOME);
      }
    })
    .catch(console.error);
  }

  signInWithGoogle = () => {
    this.props.firebase.doSignInWithGoogle();
  }

  render() {
    return (
      <button onClick={this.signInWithGoogle} className="googleBtn" type="button">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
          alt="logo"
        />
        Login With Google
      </button>
    );
  }
}

export const LoginPage = compose(
  withRouter,
  withFirebase,
)(Login);
