import React from 'react';
import AuthForm from '../components/auth-form';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
export default class AuthPage extends React.Component {
  render() {
    const { user, route, handleSignIn } = this.context;

    if (user) return <Redirect to="" />;

    const welcomeMessage = route.path === 'sign-in'
      ? 'Sign in'
      : 'Sign Up';
    return (
      <div className="row">
        <div className="auth-form text-center">
          <header className="text-center">
            <h2>
              {welcomeMessage}
            </h2>
          </header>
          <div>
            <AuthForm
              key={route.path}
              action={route.path}
              onSignIn={handleSignIn} />
          </div>
        </div>
      </div>
    );
  }
}

AuthPage.contextType = AppContext;
