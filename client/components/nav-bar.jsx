import React from 'react';

export default class NavBar extends React.Component {
  render() {
    return (
      <div className='row navbar'>
        <div className='col-half padding text-left'>
          <h1 className='inline '>HealthyHacks</h1>
          <a href="" className='home inline padding'>Home</a>
        </div>
        <div className='col-half text-right'>
          <a href="" className='padding '>Login </a>
          <a href="" className=''>Sign Up</a>
        </div>
      </div>
    );
  }
}
