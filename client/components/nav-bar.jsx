import React from 'react';
import AppContext from '../lib/app-context';
export default class NavBar extends React.Component {

  render() {
    const { user, handleSignOut } = this.context;
    return (
      <div className='navbar'>
        <div className='navbar-col text-left'>
          <h1 className='inline title'>HealthyHacks</h1>
          <a href="" className='home padding'>Home</a>
          {
            user !== null &&
            <a href='#profile'>Profile</a>
          }
        </div>
        <div className='navbar-col text-right'>
          { user !== null &&
            <a href=""onClick={handleSignOut} className='sign-text padding'> Sign Out</a>
          }
          { user === null &&
          <>
            <a href="#sign-in" className='padding sign-text'>Sign In </a>
            <a href="#sign-up" className='sign-text'>Sign Up</a>
          </>
          }
        </div>
      </div>
    );
  }
}

NavBar.contextType = AppContext;
