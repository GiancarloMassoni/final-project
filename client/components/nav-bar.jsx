import React from 'react';
import AppContext from '../lib/app-context';
export default class NavBar extends React.Component {

  render() {
    const { user, handleSignOut } = this.context;
    return (
      <div className='row navbar'>
        <div className='col-half padding text-left'>
          <h1 className='inline '>HealthyHacks</h1>
          <a href="" className='home inline padding'>Home</a>
        </div>
        <div className='col-half text-right'>
          { user !== null &&
            <a href=""onClick={handleSignOut}> Sign Out</a>

          }
          { user === null &&
          <>
            <a href="#sign-in" className='padding '>Sign In </a>
            <a href="#sign-up" className=''>Sign Up</a>
          </>
          }
        </div>
      </div>
    );
  }
}

NavBar.contextType = AppContext;
